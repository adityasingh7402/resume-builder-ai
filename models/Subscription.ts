import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISubscription extends Document {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
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
