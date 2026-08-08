import { create } from 'zustand'
import { brewBottles } from './lib/words'

export type Phase = 'shore' | 'drift' | 'vortex' | 'bottles'

const NEED = 5

interface RiverStore {
  phase: Phase
  caught: string[]
  bottles: string[]
  kept: string[]
  toast: string | null
  need: number

  enterRiver: () => void
  catchWord: (word: string) => void
  finishVortex: () => void
  keepBottle: (text: string) => void
  setToast: (msg: string | null) => void
  reset: () => void
}

export const useRiver = create<RiverStore>((set, get) => ({
  phase: 'shore',
  caught: [],
  bottles: [],
  kept: [],
  toast: null,
  need: NEED,

  enterRiver: () => set({ phase: 'drift', caught: [], bottles: [], kept: [], toast: null }),

  catchWord: (word) => {
    const { caught, need } = get()
    if (caught.includes(word) || caught.length >= need) return
    const next = [...caught, word]
    if (next.length >= need) {
      set({ caught: next, phase: 'vortex' })
    } else {
      set({ caught: next })
    }
  },

  finishVortex: () => {
    const bottles = brewBottles(get().caught)
    set({ bottles, phase: 'bottles' })
  },

  keepBottle: (text) => {
    if (get().kept.includes(text)) return
    set({ kept: [...get().kept, text] })
  },

  setToast: (msg) => set({ toast: msg }),

  reset: () =>
    set({ phase: 'shore', caught: [], bottles: [], kept: [], toast: null }),
}))
