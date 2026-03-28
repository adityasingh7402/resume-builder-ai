'use client'

import Link from 'next/link'
import { signIn, useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: '🔗',
    title: 'Connect GitHub',
    desc: 'Sign in with your GitHub account — we pull your repos automatically.',
  },
  {
    icon: '🎯',
    title: 'Pick a Role',
    desc: 'Tell us what kind of job you are targeting and paste the JD.',
  },
  {
    icon: '🤖',
    title: 'AI Writes It',
    desc: 'Our AI reads your actual code and writes resume bullets that matter.',
  },
  {
    icon: '📄',
    title: 'Export & Apply',
    desc: 'Download a clean print-ready resume to send to any recruiter.',
  },
]

const stats = [
  { value: '2 min', label: 'Average generation time' },
  { value: 'ATS', label: 'Friendly output' },
  { value: '5+', label: 'Resume templates' },
  { value: '100%', label: 'Free to use' },
]

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  function handleCTA() {
    if (session) {
      router.push('/dashboard')
    } else {
      signIn('github')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-black to-black pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI-powered · GitHub-native · ATS-ready
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Turn your GitHub into{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              a resume
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop writing resume bullets from scratch. Connect GitHub, pick your target role,
            and let AI craft a tailored resume from your actual projects in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCTA}
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20"
            >
              {session ? 'Go to Dashboard' : 'Start free — sign in with GitHub'}
            </button>
            <Link
              href="/#how-it-works"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              See how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for developers, by a developer
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Regular resume builders don&apos;t understand code. This one does.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-white/50 mb-16">From GitHub to PDF in under 5 minutes.</p>

          <div className="space-y-8 text-left">
            {[
              {
                step: '01',
                title: 'Sign in with GitHub',
                desc: "We read your public repos — no code stored, just project metadata.",
              },
              {
                step: '02',
                title: 'Select repos + paste job description',
                desc: "Choose 3–6 projects and tell us what role you're targeting.",
              },
              {
                step: '03',
                title: 'AI generates your resume',
                desc: "We build real bullets from your actual work. Not templates, not placeholders.",
              },
              {
                step: '04',
                title: 'Edit and download',
                desc: 'Review the output and export as a clean print-ready PDF.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <span className="text-4xl font-bold text-violet-500/30 shrink-0 w-12">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to build your resume?</h2>
          <p className="text-white/50 mb-8">Free. No credit card. No limits.</p>
          <button
            onClick={handleCTA}
            className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all hover:scale-105 active:scale-95"
          >
            {session ? 'Go to Dashboard' : 'Get started for free'}
          </button>
        </div>
      </section>
    </main>
  )
}
