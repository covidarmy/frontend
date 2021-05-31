import * as React from 'react'
import Navbar from '~/components/Navbar'
import { useAuth } from '~/context/auth'
import { useRouter } from 'next/router'
import LoadingPage from '~/components/LoadingPage'
import { useStore } from '~/lib/StepsStore'

import StatesStep from '~/components/Steps/States'
import CitiesStep from '~/components/Steps/Cities'
import ResourceStep from '~/components/Steps/Resources'
import SubmitForm from '~/components/Steps/SubmitForm'

export default function AddResourcePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { step } = useStore((state) => ({
    step: state.step,
  }))

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated])

  if (loading) return <LoadingPage />
  return (
    <div className="min-h-screen">
      <Navbar />
      {step === 1 && <StatesStep />}
      {step === 2 && <CitiesStep />}
      {step === 3 && <ResourceStep />}
      {step === 4 && <SubmitForm user={user} />}
    </div>
  )
}
