import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { action, work_experience } = await req.json()
  await dbConnect()

  let user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (action === 'add') {
    user.work_experience.push(work_experience)
  } else if (action === 'update') {
    const { index, ...data } = work_experience
    if (index !== undefined && user.work_experience[index]) {
      user.work_experience[index] = { ...user.work_experience[index], ...data }
    }
  } else if (action === 'delete') {
    const { index } = work_experience
    if (index !== undefined) {
      user.work_experience.splice(index, 1)
    }
  }

  await user.save()

  return NextResponse.json({ 
    message: 'Work experience updated successfully',
    data: user.work_experience
  })
}
