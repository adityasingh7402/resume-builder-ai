import mongoose, { Schema, Document, Model } from 'mongoose'
import {
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_STATUS,
  FREE_GENERATION_LIMIT,
  FREE_SAVED_LIMIT,
  PRO_GENERATION_LIMIT,
  PRO_SAVED_LIMIT,
  SubscriptionTier,
  SubscriptionStatus,
} from '@/constants/limits'

export interface ISubscription extends Document {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  tier: SubscriptionTier
  status: SubscriptionStatus
  generation_attempts_used: number
  generation_attempts_limit: number
  saved_resumes_count: number
  saved_resumes_limit: number
  current_period_start: Date | null
  current_period_end: Date | null
  dodo_customer_id: string | null
  dodo_subscription_id: string | null
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    tier: {
      type: String,
      enum: Object.values(SUBSCRIPTION_TIERS),
      default: SUBSCRIPTION_TIERS.FREE,
    },
    status: {
      type: String,
      enum: Object.values(SUBSCRIPTION_STATUS),
      default: SUBSCRIPTION_STATUS.ACTIVE,
    },
    generation_attempts_used: { type: Number, default: 0 },
    generation_attempts_limit: { type: Number, default: FREE_GENERATION_LIMIT },
    saved_resumes_count: { type: Number, default: 0 },
    saved_resumes_limit: { type: Number, default: FREE_SAVED_LIMIT },
    current_period_start: { type: Date, default: null },
    current_period_end: { type: Date, default: null },
    dodo_customer_id: { type: String, default: null },
    dodo_subscription_id: { type: String, default: null },
  },
  { timestamps: true }
)

const SubscriptionModel: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema)

export default SubscriptionModel
