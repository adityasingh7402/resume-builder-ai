import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getUserRepos } from '@/lib/github'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const user = await UserModel.findOne({ email: session.user.email })
    if (!user?.github_username) {
      return NextResponse.json({ error: 'GitHub username not found' }, { status: 400 })
    }

    const repos = await getUserRepos(user.github_username)
    return NextResponse.json({ repos })
  } catch (err) {
    console.error('Failed to fetch repos:', err)
    return NextResponse.json({ error: 'Failed to fetch GitHub repos' }, { status: 500 })
  }
}
