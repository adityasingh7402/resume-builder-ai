// Tier Limits and Configuration Constants
// Everything is now unlimited for the free version

export const FREE_GENERATION_ATTEMPTS_LIMIT = -1;
export const FREE_SAVED_RESUMES_LIMIT = -1;
export const FREE_PDF_EXPIRY_DAYS = -1;
export const FREE_DRAFTS_LIMIT = -1;
export const FREE_DRAFTS_PER_DAY_LIMIT = -1;

// AI Configuration
export const AI_MAX_COST_PER_RESUME = 0.15;
export const AI_TOKENS_LIMIT = 10000;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
} as const;

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
} as const;

// Resume Status
export const RESUME_STATUS = {
  DRAFT: 'draft',
  SAVED: 'saved',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

// Resume Roles
export const RESUME_ROLES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack',
  MOBILE: 'mobile',
  DEVOPS: 'devops'
} as const;

// Template Types
export const TEMPLATE_TYPES = {
  DEFAULT: 'default',
  MODERN: 'modern',
  MINIMAL: 'minimal',
  CREATIVE: 'creative',
  ACADEMIC: 'academic',
  EXECUTIVE: 'executive',
  HARVARD: 'harvard'
} as const;

// Pricing (All 0 for Free model)
export const PRICING = {
  PREMIUM_MONTHLY: 0, 
  PREMIUM_ANNUAL: 0, 
  LIFETIME: 0 
} as const;

// Types
export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];
export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];
export type ResumeStatus = typeof RESUME_STATUS[keyof typeof RESUME_STATUS];
export type ResumeRole = typeof RESUME_ROLES[keyof typeof RESUME_ROLES];
export type TemplateType = typeof TEMPLATE_TYPES[keyof typeof TEMPLATE_TYPES];
