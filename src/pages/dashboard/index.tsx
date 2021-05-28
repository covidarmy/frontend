import * as React from "react"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"
import { useRouter } from "next/router"
import LoadingPage from "~/components/LoadingPage"
import { useStore } from "~/lib/StepsStore"

import StatesStep from "~/components/Steps/States"
import CitiesStep from "~/components/Steps/Cities"
import ResourceStep from "~/components/Steps/Resources"
import SubmitForm from "~/components/Steps/SubmitForm"

export default function AddResourcePage() {
  const { nextStep, previousStep, step } = useStore((state) => ({
    step: state.step,
    previousStep: state.actions.previousStep,
    nextStep: state.actions.nextStep,
  }))

  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated])

  if (loading) return <LoadingPage />
  return (
    <div className="min-h-screen">
      <Navbar />
      {step === 1 && <StatesStep nextStep={nextStep} />}
      {step === 2 && (
        <CitiesStep nextStep={nextStep} previousStep={previousStep} />
      )}
      {step === 3 && (
        <ResourceStep nextStep={nextStep} previousStep={previousStep} />
      )}
      {step === 4 && <SubmitForm previousStep={previousStep} user={user} />}
    </div>
  )
}
