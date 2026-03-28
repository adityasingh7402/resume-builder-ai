'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Plus, FileText, ChevronRight, Loader2 } from 'lucide-react'
import { GithubRepo } from '@/lib/github'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [resumes, setResumes] = useState<{ _id: string; title: string; role: string; createdAt: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return

    async function loadData() {
      try {
        const [repoRes, resumeRes] = await Promise.all([
          fetch('/api/github/repos'),
          fetch('/api/resume'),
        ])
        if (repoRes.ok) {
          const d = await repoRes.json()
          setRepos(d.repos || [])
        }
        if (resumeRes.ok) {
          const d = await resumeRes.json()
          setResumes(d.resumes || [])
        }
      } catch (err) {
        console.error('failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">
              Welcome back, {session?.user?.name?.split(' ')[0]}
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>

        {/* Resumes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Your Resumes</h2>

          {resumes.length === 0 ? (
            <div className="p-10 rounded-2xl border border-dashed border-white/10 text-center">
              <FileText className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No resumes yet. Create your first one!</p>
              <Link
                href="/dashboard/new"
                className="inline-flex items-center gap-1.5 mt-4 text-violet-400 hover:text-violet-300 text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Create resume
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((r) => (
                <Link
                  key={r._id}
                  href={`/dashboard/resume/${r._id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 hover:bg-white/[0.05] transition-all group"
                >
                  <div>
                    <p className="font-medium text-sm">{r.title}</p>
                    <p className="text-white/40 text-xs mt-0.5 capitalize">{r.role} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Repos */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Your GitHub Repos</h2>
          {repos.length === 0 ? (
            <p className="text-white/40 text-sm">No repos found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all"
                >
                  <p className="font-medium text-sm truncate">{repo.name}</p>
                  <p className="text-white/40 text-xs mt-1 line-clamp-2">{repo.description || 'No description'}</p>
                  {repo.language && (
                    <span className="mt-2 inline-block text-xs text-violet-400">{repo.language}</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
