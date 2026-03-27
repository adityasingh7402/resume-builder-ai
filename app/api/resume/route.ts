import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import ResumeModel from '@/models/Resume'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const resumes = await ResumeModel.find({ user_id: user._id })
    .sort({ createdAt: -1 })
    .select('title role status createdAt')

  return NextResponse.json({ resumes })
}
