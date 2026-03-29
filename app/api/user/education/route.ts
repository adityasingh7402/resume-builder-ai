import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { action, education } = await req.json()
  await dbConnect()

  let user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (action === 'add') {
    user.education.push(education)
  } else if (action === 'update') {
    const { index, ...data } = education
    if (index !== undefined && user.education[index]) {
      user.education[index] = { ...user.education[index], ...data }
    }
  } else if (action === 'delete') {
    const { index } = education
    if (index !== undefined) {
      user.education.splice(index, 1)
    }
  }

  await user.save()

  return NextResponse.json({ 
    message: 'Education updated successfully',
    data: user.education
  })
}
