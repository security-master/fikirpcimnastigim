import { create } from 'zustand'
import type { WorkoutId } from '../data/workouts'

export type Phase = 'landing' | 'warmup' | 'collide' | 'shape' | 'finale'
export type IdeaSource = 'warmup' | 'collide' | 'shape'

export interface Idea {
  id: string
  text: string
  source: IdeaSource
  starred: boolean
}

interface SessionStore {
  phase: Phase
  workoutId: WorkoutId | null
  ideas: Idea[]
  warmupPicks: string[]
  collideResult: string | null
  toast: string | null

  chooseWorkout: (id: WorkoutId) => void
  setPhase: (phase: Phase) => void
  addWarmupPick: (text: string) => void
  addIdea: (text: string, source: IdeaSource) => void
  setCollideResult: (text: string | null) => void
  toggleStar: (id: string) => void
  removeIdea: (id: string) => void
  setToast: (msg: string | null) => void
  reset: () => void
}

let seq = 0
function nextId() {
  seq += 1
  return `idea-${Date.now()}-${seq}`
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  phase: 'landing',
  workoutId: null,
  ideas: [],
  warmupPicks: [],
  collideResult: null,
  toast: null,

  chooseWorkout: (id) =>
    set({
      workoutId: id,
      phase: 'warmup',
      ideas: [],
      warmupPicks: [],
      collideResult: null,
    }),

  setPhase: (phase) => set({ phase }),

  addWarmupPick: (text) =>
    set({ warmupPicks: [...get().warmupPicks, text] }),

  addIdea: (text, source) => {
    const idea: Idea = {
      id: nextId(),
      text: text.trim(),
      source,
      starred: source !== 'warmup',
    }
    set({ ideas: [...get().ideas, idea] })
  },

  setCollideResult: (text) => set({ collideResult: text }),

  toggleStar: (id) =>
    set({
      ideas: get().ideas.map((i) =>
        i.id === id ? { ...i, starred: !i.starred } : i,
      ),
    }),

  removeIdea: (id) =>
    set({ ideas: get().ideas.filter((i) => i.id !== id) }),

  setToast: (msg) => set({ toast: msg }),

  reset: () =>
    set({
      phase: 'landing',
      workoutId: null,
      ideas: [],
      warmupPicks: [],
      collideResult: null,
      toast: null,
    }),
}))
