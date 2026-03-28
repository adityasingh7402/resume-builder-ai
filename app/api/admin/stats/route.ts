import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/admin'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import ResumeModel from '@/models/Resume'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminCheck = await isAdmin(session.user.email)
  if (!adminCheck) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await dbConnect()

  const [totalUsers, totalResumes, recentUsers] = await Promise.all([
    UserModel.countDocuments(),
    ResumeModel.countDocuments(),
    UserModel.find().sort({ createdAt: -1 }).limit(10).select('name email github_username createdAt'),
  ])

  return NextResponse.json({ totalUsers, totalResumes, recentUsers })
}
