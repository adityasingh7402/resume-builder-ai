'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Users, FileText, Loader2 } from 'lucide-react'

interface Stats {
  totalUsers: number
  totalResumes: number
  recentUsers: { _id: string; name: string; email: string; github_username: string; createdAt: string }[]
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/admin/stats')
      .then(async (res) => {
        if (res.status === 403) { setError('Not an admin'); return }
        const data = await res.json()
        setStats(data)
      })
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [status])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <Users className="w-5 h-5 text-violet-400 mb-3" />
            <p className="text-3xl font-bold">{stats?.totalUsers ?? 0}</p>
            <p className="text-white/50 text-sm mt-1">Total users</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <FileText className="w-5 h-5 text-violet-400 mb-3" />
            <p className="text-3xl font-bold">{stats?.totalResumes ?? 0}</p>
            <p className="text-white/50 text-sm mt-1">Resumes generated</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Signups</h2>
          <div className="space-y-2">
            {stats?.recentUsers.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{u.email} · @{u.github_username}</p>
                </div>
                <span className="text-xs text-white/30">
                  {new Date(u.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
