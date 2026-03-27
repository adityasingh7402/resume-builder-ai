'use client'

import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
          R
        </div>
        <h1 className="text-2xl font-bold mb-2">Sign in to ResumeAI</h1>
        <p className="text-white/50 text-sm mb-8">
          We use your GitHub profile to build your resume.
        </p>
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
        <p className="text-white/30 text-xs mt-6">
          We only read your public repos. Nothing is stored without permission.
        </p>
      </div>
    </main>
  )
}
