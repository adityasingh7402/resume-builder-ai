'use client'

import { useState, useEffect } from 'react'
import { Plus, FileText, Clock, ChevronRight, Loader2, Trash2, Edit2, Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { SubHeading } from '@/components/SubHeading'
import ResumeGeneratorWizard from './ResumeGeneratorWizard'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Resume {
  _id: string
  title: string
  role: string
  status: string
  createdAt: string
}

export default function DashboardView() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showWizard, setShowWizard] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resume')
      const data = await response.json()
      if (response.ok) {
        setResumes(data.resumes)
      }
    } catch (error) {
      console.error('Error fetching resumes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      const response = await fetch(`/api/resume/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setResumes(resumes.filter(r => r._id !== id))
        toast.success('Resume deleted')
      } else {
        toast.error('Failed to delete resume')
      }
    } catch (error) {
      toast.error('Error deleting resume')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-neutral-400" />
      </div>
    )
  }

  if (showWizard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <SubHeading>Create New Resume</SubHeading>
          <Button variant="ghost" onClick={() => setShowWizard(false)}>
            Cancel
          </Button>
        </div>
        <ResumeGeneratorWizard />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <SubHeading>My Resumes</SubHeading>
          <p className="text-sm text-neutral-600">
            Manage your generated resumes and create new ones.
          </p>
        </div>
        <Button onClick={() => setShowWizard(true)} className="gap-2">
          <Plus className="size-4" />
          Generate New
        </Button>
      </div>

      {/* Resume Grid */}
      {resumes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
          <div className="size-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="size-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900">No resumes yet</h3>
          <p className="text-neutral-600 mb-6">Create your first AI-powered resume from your GitHub projects.</p>
          <Button onClick={() => setShowWizard(true)}>
            Start Generating
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div 
              key={resume._id}
              className="group bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-900 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <FileText className="size-6" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/dashboard/resume/${resume._id}/edit`}>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Edit2 className="size-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="size-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDelete(resume._id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-semibold text-neutral-900 truncate" title={resume.title}>
                  {resume.title}
                </h3>
                <p className="text-sm text-neutral-600">{resume.role}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="size-3" />
                  {new Date(resume.createdAt).toLocaleDateString()}
                </div>
                <Link href={`/dashboard/resume/${resume._id}/edit`}>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    Open Editor
                    <ChevronRight className="size-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <button
            onClick={() => setShowWizard(true)}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-200 rounded-xl p-5 hover:border-neutral-900 hover:bg-neutral-50 transition-all group"
          >
            <div className="size-12 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <Plus className="size-6" />
            </div>
            <span className="font-medium text-neutral-600 group-hover:text-neutral-900">New Resume</span>
          </button>
        </div>
      )}
    </div>
  )
}
