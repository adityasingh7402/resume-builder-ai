'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { Loader2, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Resume {
  _id: string
  title: string
  role: string
  status: string
  createdAt: string
  content: {
    summary?: string
    projects: {
      repo_name: string
      repo_url: string
      description: string
      bullets: string[]
      technologies: string[]
    }[]
    skills: {
      frontend?: string[]
      backend?: string[]
      databases?: string[]
      tools?: string[]
    }
  }
}

export default function ResumePage() {
  const { id } = useParams()
  const { status } = useSession()
  const router = useRouter()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    if (!id || status !== 'authenticated') return
    fetch(`/api/resume/${id}`)
      .then((r) => r.json())
      .then((d) => setResume(d.resume))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id, status])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/40">Resume not found.</p>
      </div>
    )
  }

  const { content } = resume
  const allSkills = [
    ...(content.skills.frontend || []),
    ...(content.skills.backend || []),
    ...(content.skills.databases || []),
    ...(content.skills.tools || []),
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <a
            href={`/api/resume/${resume._id}/export`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </a>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold">{resume.title}</h1>
            <p className="text-white/40 text-sm mt-1 capitalize">{resume.role} · {new Date(resume.createdAt).toLocaleDateString()}</p>
          </div>

          {content.summary && (
            <div>
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Summary</h2>
              <p className="text-white/80 text-sm leading-relaxed">{content.summary}</p>
            </div>
          )}

          {content.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Projects</h2>
              <div className="space-y-6">
                {content.projects.map((project) => (
                  <div key={project.repo_name}>
                    <div className="flex items-center gap-3 mb-2">
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {project.repo_name}
                      </a>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{project.description}</p>
                    <ul className="space-y-1.5">
                      {project.bullets.map((b, i) => (
                        <li key={i} className="text-sm text-white/80 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-violet-500/60">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/50 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {allSkills.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-violet-500/10 text-violet-300 text-xs border border-violet-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
