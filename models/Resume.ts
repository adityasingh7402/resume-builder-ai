import mongoose, { Schema, Document, Model } from 'mongoose'
import { RESUME_STATUS, RESUME_ROLES, ResumeStatus, ResumeRole } from '@/constants/limits'

export interface IProject {
  repo_name: string
  repo_url: string
  description: string
  bullets: string[]
  technologies: string[]
  live_url?: string
}

export interface IResumeContent {
  projects: IProject[]
  skills: {
    frontend?: string[]
    backend?: string[]
    databases?: string[]
    tools?: string[]
    other?: string[]
  }
  summary?: string
}

export interface IResume extends Document {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  job_description_id?: mongoose.Types.ObjectId
  title: string
  role: ResumeRole
  selected_repos: string[]
  content: IResumeContent
  status: ResumeStatus
  ai_model: string
  pdf_url: string | null
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    repo_name: { type: String, required: true },
    repo_url: { type: String, required: true },
    description: { type: String, required: true },
    bullets: { type: [String], required: true },
    technologies: { type: [String], default: [] },
    live_url: { type: String, default: '' },
  },
  { _id: false }
)

const ResumeSchema = new Schema<IResume>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    job_description_id: {
      type: Schema.Types.ObjectId,
      ref: 'JobDescription',
      default: null,
    },
    title: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: Object.values(RESUME_ROLES),
      required: true,
    },
    selected_repos: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length >= 3,
        message: 'Select at least 3 repos',
      },
    },
    content: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: Object.values(RESUME_STATUS),
      default: RESUME_STATUS.DRAFT,
    },
    ai_model: { type: String, default: 'llama-4-scout' },
    pdf_url: { type: String, default: null },
  },
  { timestamps: true }
)

ResumeSchema.index({ user_id: 1, createdAt: -1 })

const ResumeModel: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema)

export default ResumeModel
