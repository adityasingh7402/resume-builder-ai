'use client'

import { signIn } from '@/lib/auth-client'

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
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
        <p className="text-white/30 text-xs mt-6">
          We only read your public repos. Nothing is stored without permission.
        </p>
      </div>
    </main>
  )
}
