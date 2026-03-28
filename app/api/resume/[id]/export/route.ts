import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import ResumeModel from '@/models/Resume'

// this route returns html that the browser can print-to-pdf
// we keep it simple - no puppeteer needed, just a clean print stylesheet
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await dbConnect()

  const user = await UserModel.findOne({ email: session.user.email })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const resume = await ResumeModel.findOne({ _id: id, user_id: user._id })
  if (!resume) return NextResponse.json({ error: 'Resume not found' }, { status: 404 })

  const { content } = resume
  const allSkills = [
    ...(content.skills?.frontend || []),
    ...(content.skills?.backend || []),
    ...(content.skills?.databases || []),
    ...(content.skills?.tools || []),
  ]

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${resume.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 22px; font-weight: 700; }
    h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #555; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; }
    .meta { color: #666; font-size: 11px; margin-top: 2px; }
    .summary { margin-top: 8px; line-height: 1.6; color: #333; }
    .project { margin-bottom: 14px; }
    .project-title { font-weight: 600; font-size: 13px; }
    .project-desc { color: #555; margin: 3px 0; }
    ul { padding-left: 16px; }
    li { margin-bottom: 3px; line-height: 1.5; }
    .techs { margin-top: 5px; color: #777; font-size: 11px; }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .skill { background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${user.name}</h1>
  <p class="meta">${user.headline || resume.role + ' Developer'} ${user.location ? '· ' + user.location : ''}</p>
  ${user.linkedin_url ? `<p class="meta"><a href="${user.linkedin_url}">${user.linkedin_url}</a></p>` : ''}

  ${content.summary ? `<h2>Summary</h2><p class="summary">${content.summary}</p>` : ''}

  ${content.projects?.length ? `
  <h2>Projects</h2>
  ${content.projects.map((p: { repo_name: string; repo_url: string; description: string; bullets: string[]; technologies: string[] }) => `
  <div class="project">
    <div class="project-title"><a href="${p.repo_url}">${p.repo_name}</a></div>
    <div class="project-desc">${p.description}</div>
    <ul>${p.bullets.map((b: string) => `<li>${b}</li>`).join('')}</ul>
    ${p.technologies?.length ? `<div class="techs">${p.technologies.join(' · ')}</div>` : ''}
  </div>`).join('')}` : ''}

  ${allSkills.length ? `
  <h2>Skills</h2>
  <div class="skills">${allSkills.map((s: string) => `<span class="skill">${s}</span>`).join('')}</div>` : ''}
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
