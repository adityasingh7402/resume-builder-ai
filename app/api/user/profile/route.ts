import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const allowed = [
    'full_name', 'phone', 'location', 'portfolio_url', 'linkedin_url',
    'professional_headline'
  ]

  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) update[key] = body[key]
  }

  await dbConnect()
  const user = await UserModel.findOneAndUpdate(
    { email: session.user.email },
    { $set: update },
    { new: true }
  )

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({ 
    message: 'Profile updated successfully',
    data: user
  })
}
