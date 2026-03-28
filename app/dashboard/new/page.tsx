'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Loader2, Check } from 'lucide-react'
import { GithubRepo } from '@/lib/github'
import { RESUME_ROLES } from '@/constants/limits'

const steps = ['Select Repos', 'Role & JD', 'Generate']

export default function NewResumePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [role, setRole] = useState('fullstack')
  const [title, setTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/github/repos')
      .then((r) => r.json())
      .then((d) => setRepos(d.repos || []))
      .catch(console.error)
  }, [status])

  function toggleRepo(fullName: string) {
    setSelected((prev) =>
      prev.includes(fullName) ? prev.filter((r) => r !== fullName) : [...prev, fullName]
    )
  }

  async function handleGenerate() {
    if (selected.length < 3) {
      setError('Pick at least 3 repos')
      return
    }
    setError('')
    setGenerating(true)
    try {
      let jdId: string | undefined

      if (jobDesc.trim()) {
        const jdRes = await fetch('/api/job-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: jobDesc }),
        })
        const jdData = await jdRes.json()
        jdId = jdData.jobDescription?._id
      }

      const res = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedRepos: selected,
          role,
          title: title || `${role} Resume`,
          jobDescriptionId: jdId,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')

      router.push(`/dashboard/resume/${data.resume._id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create Resume</h1>
        <p className="text-white/50 text-sm mb-8">
          Select repos, pick a role, and let AI do the work.
        </p>

        {/* step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step
                    ? 'bg-violet-600 text-white'
                    : i === step
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-sm ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Step 0 — repo picker */}
        {step === 0 && (
          <div>
            <p className="text-sm text-white/50 mb-4">
              Pick 3–6 repos that best show your skills ({selected.length} selected)
            </p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {repos.map((repo) => {
                const isSelected = selected.includes(repo.full_name)
                return (
                  <button
                    key={repo.id}
                    onClick={() => toggleRepo(repo.full_name)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-violet-500/50 bg-violet-500/10'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{repo.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-violet-400" />}
                    </div>
                    {repo.description && (
                      <p className="text-white/40 text-xs mt-1 line-clamp-1">{repo.description}</p>
                    )}
                    {repo.language && (
                      <span className="text-violet-400/70 text-xs mt-1 block">{repo.language}</span>
                    )}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => {
                if (selected.length < 3) { setError('Pick at least 3 repos'); return }
                setError('')
                setStep(1)
              }}
              disabled={selected.length < 3}
              className="mt-6 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              Continue
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
        )}

        {/* Step 1 — role + JD */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-white/70 block mb-2">Resume title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Frontend Developer Resume"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-white/70 block mb-2">Target role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50 transition-colors appearance-none"
              >
                {Object.values(RESUME_ROLES).map((r) => (
                  <option key={r} value={r} className="bg-zinc-900 capitalize">
                    {r.charAt(0).toUpperCase() + r.slice(1)} Developer
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/70 block mb-2">
                Job description <span className="text-white/30">(optional but recommended)</span>
              </label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                rows={6}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — confirm + generate */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Repos selected</span>
                <span className="font-medium">{selected.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Role</span>
                <span className="font-medium capitalize">{role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Job description</span>
                <span className="font-medium">{jobDesc ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                disabled={generating}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-all disabled:opacity-40"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : (
                  'Generate Resume'
                )}
              </button>
            </div>

            <p className="text-white/30 text-xs text-center">
              Takes about 30–60 seconds
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
