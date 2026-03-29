'use client'

import { signIn } from '@/lib/auth-client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { IconBrandGithub as Github, IconSparkles as Sparkles, IconCircleCheck as CheckCircle2 } from '@tabler/icons-react'
import { CalSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Part: Hero Image / Brand info */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-neutral-900 relative overflow-hidden flex-col justify-end p-12">
        <Image
          src="/login-bg.png"
          alt="ResumeAI Hero"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="relative z-10 space-y-6 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm backdrop-blur-md"
          >
            <Sparkles className="size-4 text-blue-400" />
            <span>AI-Powered Resume Builder</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn("text-5xl lg:text-7xl font-bold text-white leading-tight", CalSans.className)}
          >
            Craft Your <span className="text-blue-400">Future</span> with Precision.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              "Automated project imports from GitHub",
              "AI-optimized action verbs and metrics",
              "Modern, ATS-friendly templates",
              "Real-time professional editing suite"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 className="size-5 text-green-400 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Part: Login UI */}
      <div className="flex-1 flex items-center justify-center p-8 bg-neutral-50 md:bg-white">
        <div className="w-full max-w-md space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-block relative mb-6">
              <Image 
                src="/logo.png" 
                alt="ResumeAI Logo" 
                width={80} 
                height={80} 
                className="rounded-2xl shadow-xl border border-neutral-100"
              />
              <div className="absolute -bottom-2 -right-2 size-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                AI
              </div>
            </div>
            
            <h2 className={cn("text-3xl font-bold text-neutral-900 tracking-tight", CalSans.className)}>
              Welcome to <span className="text-blue-600">ResumeAI</span>
            </h2>
            <p className="mt-2 text-neutral-600">
              Transform your GitHub repositories into a professional career story.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl md:border-0 border border-neutral-200 shadow-xl md:shadow-none"
          >
            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              <Github className="size-5 group-hover:rotate-12 transition-transform" />
              Continue with GitHub
            </button>
            
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-400 font-medium">Safe & Secure</span>
              </div>
            </div>
            
            <p className="mt-8 text-center text-xs text-neutral-500 leading-relaxed">
              We only request read-access to your public repositories.<br />
              Your data is encrypted and handled with privacy by design.
            </p>
          </motion.div>

          {/* Footer for login page */}
          <div className="text-center">
            <p className="text-xs text-neutral-400">
              Developed by <span className="text-neutral-900 font-semibold underline">Aditya</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
