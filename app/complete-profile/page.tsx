'use client'

import { useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2 } from 'lucide-react'

interface Education {
  degree: string
  school: string
  start_year: number
  end_year: number | null
  gpa: number | null
}

const emptyEdu = (): Education => ({
  degree: '',
  school: '',
  start_year: new Date().getFullYear() - 4,
  end_year: null,
  gpa: null,
})

export default function CompleteProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: '',
    headline: '',
    custom_skills: '',
  })
  const [education, setEducation] = useState<Education[]>([emptyEdu()])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (status === 'unauthenticated') {
    router.push('/')
    return null
  }

  function handleField(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function updateEdu(index: number, field: keyof Education, value: string | number | null) {
    setEducation((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          custom_skills: form.custom_skills.split(',').map((s) => s.trim()).filter(Boolean),
          education,
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      router.push('/dashboard')
    } catch {
      setError('Something went wrong, try again')
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Complete your profile</h1>
        <p className="text-white/50 text-sm mb-8">
          This info will appear on your generated resumes.
        </p>

        <div className="space-y-4">
          {[
            { name: 'headline', placeholder: 'e.g. Full Stack Developer' },
            { name: 'location', placeholder: 'e.g. Bangalore, India' },
            { name: 'phone', placeholder: '+91 XXXXXXXXXX' },
            { name: 'linkedin_url', placeholder: 'https://linkedin.com/in/you' },
            { name: 'portfolio_url', placeholder: 'https://yoursite.com' },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-sm text-white/60 block mb-1.5 capitalize">
                {f.name.replace('_', ' ')}
              </label>
              <input
                name={f.name}
                value={form[f.name as keyof typeof form]}
                onChange={handleField}
                placeholder={f.placeholder}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="text-sm text-white/60 block mb-1.5">
              Extra skills <span className="text-white/30">(comma separated)</span>
            </label>
            <input
              name="custom_skills"
              value={form.custom_skills}
              onChange={handleField}
              placeholder="Docker, AWS, Figma..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-white/60">Education</label>
              <button
                onClick={() => setEducation((prev) => [...prev, emptyEdu()])}
                className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40">Entry {i + 1}</span>
                    {education.length > 1 && (
                      <button
                        onClick={() => setEducation((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    value={edu.degree}
                    onChange={(e) => updateEdu(i, 'degree', e.target.value)}
                    placeholder="Degree (e.g. B.Tech in CSE)"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50"
                  />
                  <input
                    value={edu.school}
                    onChange={(e) => updateEdu(i, 'school', e.target.value)}
                    placeholder="School / University"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={edu.start_year}
                      onChange={(e) => updateEdu(i, 'start_year', parseInt(e.target.value))}
                      placeholder="Start year"
                      className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50"
                    />
                    <input
                      type="number"
                      value={edu.end_year || ''}
                      onChange={(e) => updateEdu(i, 'end_year', e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="End year"
                      className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save & continue'}
        </button>
      </div>
    </main>
  )
}
