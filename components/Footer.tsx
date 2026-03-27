import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <span className="text-white/80 font-medium">ResumeAI</span>
          </div>

          <p className="text-white/40 text-sm">
            Built by{' '}
            <a
              href="https://github.com/adityasingh7402"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Aditya Singh
            </a>
            {' · '}
            <a
              href="https://linkedin.com/in/adityasingh7402"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              LinkedIn
            </a>
          </p>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
