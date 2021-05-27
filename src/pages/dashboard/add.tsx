import Navbar from "~/components/Navbar"
import createStore from "zustand"
import CitiesStep from "~/components/Steps/Cities"
import ResourceStep from "~/components/Steps/Resources"
import SubmitForm from "~/components/Steps/SubmitForm"

type Steps = 1 | 2 | 3

interface AddResourceStore {
  step: Steps
  location: string | undefined
  resource: string | undefined
  actions: {
    nextStep: () => void
    previousStep: () => void
    selectCity: (city: string) => void
    selectResource: (resource: string) => void
  }
}

export const useStore = createStore<AddResourceStore>((set, get) => ({
  step: 1,
  location: undefined,
  resource: undefined,
  actions: {
    nextStep: () => {
      const step = get().step
      if (step >= 1 && step < 3) {
        set((state) => ({ step: (state.step + 1) as Steps }))
      }
    },
    previousStep: () => {
      const step = get().step
      if (step > 1 && step <= 3) {
        set(() => ({ step: (step - 1) as Steps }))
      }
    },
    selectCity: (location: string) => {
      set(() => ({ location }))
    },
    selectResource: (resource: string) => {
      set(() => ({ resource }))
    },
  },
}))

export default function AddResourcePage() {
  const { nextStep, previousStep, step } = useStore((state) => ({
    step: state.step,
    previousStep: state.actions.previousStep,
    nextStep: state.actions.nextStep,
  }))
  return (
    <div className="min-h-screen">
      <Navbar />
      {step === 1 && <CitiesStep nextStep={nextStep} />}
      {step === 2 && <ResourceStep nextStep={nextStep} previousStep={previousStep} />}
      {step === 3 && <SubmitForm previousStep={previousStep} />}
    </div>
  )
}
