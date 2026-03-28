import dbConnect from '@/lib/dbConnect'
import AdminModel from '@/models/Admin'

export async function isAdmin(email: string): Promise<boolean> {
  if (!email) return false
  // also check env for a quick bypass during dev
  if (process.env.ADMIN_EMAIL === email) return true
  await dbConnect()
  const admin = await AdminModel.findOne({ email: email.toLowerCase() })
  return !!admin
}
