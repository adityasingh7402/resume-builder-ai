import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import ProfileLayout from '@/app/profile/components/ProfileLayout'

export default async function ProfileData() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/api/auth/signin')
  }

  await dbConnect()

  const user = await UserModel.findById(session.user.id).lean()

  if (!user) {
    redirect('/api/auth/signin') // changed from /complete-profile handling since nextauth does it inside callback
  }

  // Convert MongoDB ObjectId to string for client component
  const userData = {
    ...user,
    _id: user._id.toString(),
    full_name: user.full_name || user.name || '',
    professional_headline: user.professional_headline || user.headline || '',
    phone: user.phone || null,
    location: user.location || null,
    portfolio_url: user.portfolio_url || null,
    linkedin_url: user.linkedin_url || null,
    education: (user.education || []).map((edu: any) => ({
      ...edu,
      start_year: edu.start_year || 2020,
      end_year: edu.end_year || null,
      gpa: edu.gpa || null
    })),
    work_experience: (user.work_experience || []).map((exp: any) => ({
      ...exp,
      job_title: exp.job_title || exp.title || '',
      start_date: exp.start_date ? exp.start_date.toISOString() : '',
      end_date: exp.end_date ? exp.end_date.toISOString() : null,
      description: exp.description || ''
    }))
  }

  return <ProfileLayout user={userData} />
}