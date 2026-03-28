// resume roles and status - used across the app
export const RESUME_STATUS = {
  DRAFT: 'draft',
  SAVED: 'saved',
} as const

export const RESUME_ROLES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack',
  DEVOPS: 'devops',
  DATA: 'data',
  MOBILE: 'mobile',
  GENERAL: 'general',
} as const

export type ResumeStatus = typeof RESUME_STATUS[keyof typeof RESUME_STATUS]
export type ResumeRole = typeof RESUME_ROLES[keyof typeof RESUME_ROLES]
