import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export interface Idea {
  id: string
  text: string
  color: string
  position: [number, number, number]
  createdAt: number
  tags?: string[]
}

export type Panel = 'nebula' | 'storm' | 'flex' | 'perspective' | 'scamper'

interface IdeaStore {
  ideas: Idea[]
  selectedId: string | null
  phase: 'landing' | 'experience'
  activePanel: Panel
  stormResult: string | null
  flexScore: number
  flexActive: boolean

  setPhase: (phase: 'landing' | 'experience') => void
  setActivePanel: (panel: Panel) => void
  addIdea: (text: string, tags?: string[]) => void
  removeIdea: (id: string) => void
  selectIdea: (id: string | null) => void
  setStormResult: (result: string | null) => void
  setFlexActive: (active: boolean) => void
  incrementFlexScore: () => void
  resetFlexScore: () => void
  clearAll: () => void
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
  stormResult: null,
  flexScore: 0,
  flexActive: false,

  setPhase: (phase) => set({ phase }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  
  addIdea: (text, tags) => {
    const idea: Idea = {
      id: uuid(),
      text: text.trim(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      position: randomPosition(),
      createdAt: Date.now(),
      tags,
    }
    set({ ideas: [...get().ideas, idea], selectedId: idea.id })
  },

  removeIdea: (id) => set({
    ideas: get().ideas.filter((i) => i.id !== id),
    selectedId: get().selectedId === id ? null : get().selectedId,
  }),

  selectIdea: (id) => set({ selectedId: id }),
  setStormResult: (result) => set({ stormResult: result }),
  setFlexActive: (active) => set({ flexActive: active }),
  incrementFlexScore: () => set({ flexScore: get().flexScore + 1 }),
  resetFlexScore: () => set({ flexScore: 0 }),
  clearAll: () => set({ ideas: [], selectedId: null, stormResult: null }),
}))
