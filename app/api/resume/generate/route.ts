import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import ResumeModel from '@/models/Resume'
import JobDescriptionModel from '@/models/JobDescription'
import { getRepoLanguages, getRepoReadme, getUserRepos } from '@/lib/github'
import { generateResume } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { selectedRepos, role, title, jobDescriptionId } = body

  if (!selectedRepos || selectedRepos.length < 3) {
    return NextResponse.json({ error: 'Select at least 3 repos' }, { status: 400 })
  }

  await dbConnect()
  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  let jobDescription = ''
  if (jobDescriptionId) {
    const jd = await JobDescriptionModel.findById(jobDescriptionId)
    if (jd) {
      jobDescription = jd.description
      await JobDescriptionModel.findByIdAndUpdate(jobDescriptionId, {
        last_used_at: new Date(),
        $inc: { usage_count: 1 },
      })
    }
  }

  const allRepos = await getUserRepos(user.github_username)
  const picked = allRepos.filter((r) => selectedRepos.includes(r.full_name))

  const repoData = await Promise.all(
    picked.map(async (repo) => {
      const [languages, readme] = await Promise.all([
        getRepoLanguages(repo.full_name),
        getRepoReadme(repo.full_name),
      ])
      return { repo, languages, readme }
    })
  )

  const content = await generateResume({
    repoData,
    role,
    jobDescription,
    user: {
      name: user.name,
      headline: user.headline,
      custom_skills: user.custom_skills,
    },
  })

  const resume = await ResumeModel.create({
    user_id: user._id,
    job_description_id: jobDescriptionId || undefined,
    title: title || `${role} Resume`,
    role,
    selected_repos: selectedRepos,
    content,
    ai_model: 'llama-4-scout',
  })

  return NextResponse.json({ resume }, { status: 201 })
}
