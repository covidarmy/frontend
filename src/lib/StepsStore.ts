import createStore from "zustand"

type Steps = 1 | 2 | 3 | 4

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
      if (step >= 1 && step < 4) {
        set((state) => ({ step: (state.step + 1) as Steps }))
      }
    },
    previousStep: () => {
      const step = get().step
      if (step > 1 && step <= 4) {
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