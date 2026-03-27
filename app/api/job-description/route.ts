import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import JobDescriptionModel from '@/models/JobDescription'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const jds = await JobDescriptionModel.find({ user_id: user._id })
    .sort({ last_used_at: -1 })
    .limit(10)

  return NextResponse.json({ jobDescriptions: jds })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { description, label } = body

  if (!description?.trim()) {
    return NextResponse.json({ error: 'description is required' }, { status: 400 })
  }

  await dbConnect()
  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const jd = await JobDescriptionModel.create({
    user_id: user._id,
    description: description.trim(),
    label: label?.trim() || undefined,
  })

  return NextResponse.json({ jobDescription: jd }, { status: 201 })
}
