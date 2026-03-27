// limits per tier — update these if you change pricing
export const FREE_GENERATION_LIMIT = 3
export const FREE_SAVED_LIMIT = 2
export const PRO_GENERATION_LIMIT = 30
export const PRO_SAVED_LIMIT = 20

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
} as const

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  PAST_DUE: 'past_due',
} as const

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

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]
export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS]
export type ResumeStatus = typeof RESUME_STATUS[keyof typeof RESUME_STATUS]
export type ResumeRole = typeof RESUME_ROLES[keyof typeof RESUME_ROLES]
