import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import SubscriptionModel from '@/models/Subscription'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const sub = await SubscriptionModel.findOne({ user_id: user._id })

  return NextResponse.json({ user, subscription: sub })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const allowed = [
    'phone', 'location', 'portfolio_url', 'linkedin_url',
    'headline', 'education', 'work_experience',
    'certifications', 'languages', 'custom_skills',
  ]

  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) update[key] = body[key]
  }

  await dbConnect()
  const user = await UserModel.findOneAndUpdate(
    { email: session.user.email },
    update,
    { new: true }
  )

  return NextResponse.json({ user })
}
