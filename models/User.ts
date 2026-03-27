import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  image?: string
  github_username: string
  phone?: string | null
  location?: string | null
  portfolio_url?: string | null
  linkedin_url?: string | null
  headline?: string | null
  education: {
    degree: string
    school: string
    start_year: number
    end_year: number | null
    gpa?: number | null
  }[]
  work_experience: {
    title: string
    company: string
    start_date: Date
    end_date: Date | null
    description: string
  }[]
  certifications: string[]
  languages: string[]
  custom_skills: string[]
  createdAt: Date
  updatedAt: Date
}

const EduSchema = new Schema(
  {
    degree: { type: String, required: true },
    school: { type: String, required: true },
    start_year: { type: Number, required: true },
    end_year: { type: Number, default: null },
    gpa: { type: Number, default: null },
  },
  { _id: false }
)

const WorkSchema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, default: null },
    description: { type: String, required: true },
  },
  { _id: false }
)

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    github_username: { type: String, required: true, unique: true, index: true },
    phone: { type: String, default: null },
    location: { type: String, default: null },
    portfolio_url: { type: String, default: null },
    linkedin_url: { type: String, default: null },
    headline: { type: String, default: null },
    education: { type: [EduSchema], default: [] },
    work_experience: { type: [WorkSchema], default: [] },
    certifications: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    custom_skills: { type: [String], default: [] },
  },
  { timestamps: true }
)

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default UserModel
