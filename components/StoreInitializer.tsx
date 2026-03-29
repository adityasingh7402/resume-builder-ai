'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/lib/store'

export default function StoreInitializer() {
  const { data: session, status } = useSession()
  const { userProfile, setUserProfile, setAuthUser, setSubscription, setProfileLoading, clearUserData } = useUserStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      clearUserData()
      return
    }

    if (status === 'authenticated' && session?.user) {
      setAuthUser(session.user)
      
      // Fetch full profile if not in store
      if (!userProfile) {
        setProfileLoading(true)
        fetch('/api/user')
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              setUserProfile(data.user)
              // Mock subscription for free users as requested (100% free model)
              setSubscription({
                tier: 'FREE',
                status: 'active',
                dodo_customer_id: null,
                dodo_subscription_id: null,
                generation_attempts_used: 0,
                generation_attempts_limit: -1, // Unlimited
                saved_resumes_count: 0,
                saved_resumes_limit: -1, // Unlimited
                monthly_resumes_created: 0,
                monthly_resumes_limit: -1, // Unlimited
              })
            }
          })
          .catch(err => console.error('Error fetching user data:', err))
          .finally(() => setProfileLoading(false))
      }
    }
  }, [status, session, userProfile, setUserProfile, setAuthUser, setSubscription, setProfileLoading, clearUserData])

  return null
}
