import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { certifications, languages, custom_skills } = await req.json()
  await dbConnect()

  const update: Record<string, any> = {}
  if (certifications) update.certifications = certifications
  if (languages) update.languages = languages
  if (custom_skills) update.custom_skills = custom_skills

  const user = await UserModel.findOneAndUpdate(
    { email: session.user.email },
    { $set: update },
    { new: true }
  )

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({ 
    message: 'Additional info updated successfully',
    data: user
  })
}
