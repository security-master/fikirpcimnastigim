import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { getGoal } from '../data/goals'

export interface Idea {
  id: string
  text: string
  color: string
  position: [number, number, number]
  createdAt: number
  tags?: string[]
  starred?: boolean
}

export type Panel = 'nebula' | 'storm' | 'flex' | 'perspective' | 'scamper' | 'notebook'

interface IdeaStore {
  ideas: Idea[]
  selectedId: string | null
  phase: 'landing' | 'experience'
  activePanel: Panel
  goalId: string | null
  showGuide: boolean
  stormResult: string | null
  flexScore: number
  flexActive: boolean
  copiedToast: string | null

  setPhase: (phase: 'landing' | 'experience') => void
  setActivePanel: (panel: Panel) => void
  setGoal: (goalId: string) => void
  dismissGuide: () => void
  addIdea: (text: string, tags?: string[]) => void
  removeIdea: (id: string) => void
  selectIdea: (id: string | null) => void
  toggleStar: (id: string) => void
  setStormResult: (result: string | null) => void
  setFlexActive: (active: boolean) => void
  incrementFlexScore: () => void
  resetFlexScore: () => void
  clearAll: () => void
  setCopiedToast: (msg: string | null) => void
}

const COLORS = [
  '#00f5ff', '#ff00aa', '#ffd700', '#bf00ff', '#00ff88',
  '#ff6b35', '#4ecdc4', '#e056fd', '#45b7d1', '#f9ca24',
]

function randomPosition(): [number, number, number] {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  const r = 3 + Math.random() * 5
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

export const useIdeaStore = create<IdeaStore>((set, get) => ({
  ideas: [],
  selectedId: null,
  phase: 'landing',
  activePanel: 'nebula',
  goalId: null,
  showGuide: true,
  stormResult: null,
  flexScore: 0,
  flexActive: false,
  copiedToast: null,

  setPhase: (phase) => set({ phase }),
  setActivePanel: (panel) => set({ activePanel: panel }),

  setGoal: (goalId) => {
    const goal = getGoal(goalId)
    set({
      goalId,
      activePanel: goal?.recommendedPanel ?? 'nebula',
      showGuide: true,
    })
  },

  dismissGuide: () => set({ showGuide: false }),

  addIdea: (text, tags) => {
    const idea: Idea = {
      id: uuid(),
      text: text.trim(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      position: randomPosition(),
      createdAt: Date.now(),
      tags,
      starred: false,
    }
    set({ ideas: [...get().ideas, idea], selectedId: idea.id })
  },

  removeIdea: (id) => set({
    ideas: get().ideas.filter((i) => i.id !== id),
    selectedId: get().selectedId === id ? null : get().selectedId,
  }),

  selectIdea: (id) => set({ selectedId: id }),

  toggleStar: (id) => set({
    ideas: get().ideas.map((i) =>
      i.id === id ? { ...i, starred: !i.starred } : i,
    ),
  }),

  setStormResult: (result) => set({ stormResult: result }),
  setFlexActive: (active) => set({ flexActive: active }),
  incrementFlexScore: () => set({ flexScore: get().flexScore + 1 }),
  resetFlexScore: () => set({ flexScore: 0 }),
  clearAll: () => set({ ideas: [], selectedId: null, stormResult: null }),
  setCopiedToast: (msg) => set({ copiedToast: msg }),
}))
