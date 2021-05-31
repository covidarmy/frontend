import createStore from 'zustand'

type Steps = 1 | 2 | 3 | 4

interface AddResourceStore {
  step: Steps
  cstate: string | undefined
  city: string | undefined
  resource: string | undefined
  actions: {
    nextStep: () => void
    previousStep: () => void
    selectState: (cstate: string) => void
    selectCity: (city: string) => void
    selectResource: (resource: string) => void
    reset: (step: string) => void
  }
}

export const useStore = createStore<AddResourceStore>((set, get) => ({
  step: 1,
  cstate: undefined,
  city: undefined,
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
    selectState: (cstate: string) => {
      set(() => ({ cstate }))
    },
    selectCity: (city: string) => {
      set(() => ({ city }))
    },
    selectResource: (resource: string) => {
      set(() => ({ resource }))
    },
    reset: () => {
      set((state) => ({ step: (state.step = 1) as Steps }))
    },
  },
}))
