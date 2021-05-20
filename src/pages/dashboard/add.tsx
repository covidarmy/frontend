import Navbar from "~/components/Navbar"
import createStore from "zustand"
import { HiArrowLeft } from "react-icons/hi"

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
      <main className="flex flex-col w-full h-full">
        <div className="shadow-md bg-white py-6 px-6 sm:px-10 w-full max-w-[32rem]">
          <div className="flex items-center">
            <button onClick={previousStep} aria-label="Back Button">
              <HiArrowLeft />
            </button>
            <div className="w-full">
              <p className="text-sm text-center">Step {step} of 3</p>
            </div>
          </div>
          <hr className="my-6" />
        </div>
      </main>
    </div>
  )
}
