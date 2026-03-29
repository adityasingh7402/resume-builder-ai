import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ResumeGeneratorWizard from '@/components/ResumeGeneratorWizard'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="min-h-dvh bg-neutral-50">
      <Container className="py-8">
        <ResumeGeneratorWizard />
      </Container>
    </div>
  )
}