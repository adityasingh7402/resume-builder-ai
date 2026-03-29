import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/lib/auth-client'
import { NavBar } from '@/components/Navbar'
import StoreInitializer from '@/components/StoreInitializer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ResumeAI — GitHub-powered Resume Builder',
    template: '%s | ResumeAI',
  },
  description:
    'Build ATS-friendly developer resumes from your GitHub projects using AI. Free to start.',
  openGraph: {
    siteName: 'ResumeAI',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-black text-white antialiased`}>
        <SessionProvider>
          <StoreInitializer />
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
