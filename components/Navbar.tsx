'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            R
          </div>
          <span className="text-white font-semibold text-lg">ResumeAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-white/70 hover:text-white text-sm transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-white/70 hover:text-white text-sm transition-colors">
            How it works
          </Link>
          <Link href="/pricing" className="text-white/70 hover:text-white text-sm transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
