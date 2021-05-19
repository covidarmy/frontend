import Navbar from "~/components/Navbar"
import createStore from "zustand"
import { auth } from "~/lib/firebase"
import { API_BASE_URL } from "~/constants"

type Steps = 1 | 2 | 3

interface AddResourceStore {
  step: Steps
  location: string | undefined
  resource: string | undefined
}

export const useStore = createStore<AddResourceStore>((set, get) => ({
  step: 1,
  location: undefined,
  resource: undefined,
  actions: {
    nextStep() {
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
    selectCity: async (city: string) => {},
  },
}))

export default function AddResourcePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col w-full h-full"></main>
    </div>
  )
}
