import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
)

const AdminModel: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)

export default AdminModel
