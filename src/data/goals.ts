import type { Panel } from '../store/ideaStore'

export interface Goal {
  id: string
  label: string
  short: string
  icon: string
  description: string
  hint: string
  recommendedPanel: Panel
  resultLabel: string
}

export const GOALS: Goal[] = [
  {
    id: 'project',
    label: 'Proje / ürün fikri',
    short: 'Proje',
    icon: '💡',
    description: 'Yeni bir uygulama, ürün veya girişim için tohum fikir üret.',
    hint: '4 adımda bir fikir üret, sonra bakış açılarıyla test et.',
    recommendedPanel: 'nebula',
    resultLabel: 'Proje fikrin',
  },
  {
    id: 'content',
    label: 'İçerik / yazı',
    short: 'İçerik',
    icon: '✍️',
    description: 'Blog, sosyal medya, senaryo veya sunum için yaratıcı açı bul.',
    hint: 'İki kavramı çarpıştırıp içerik kıvılcımı çıkar.',
    recommendedPanel: 'storm',
    resultLabel: 'İçerik kıvılcımın',
  },
  {
    id: 'stuck',
    label: 'Tıkandım, ısınayım',
    short: 'Isınma',
    icon: '🔥',
    description: 'Beyin donduysa hızlı seçimlerle zihni aç.',
    hint: '45 saniyelik ısınma turuyla tempo kazan.',
    recommendedPanel: 'flex',
    resultLabel: 'Isınma fikirlerin',
  },
  {
    id: 'improve',
    label: 'Var olan fikri geliştir',
    short: 'Geliştir',
    icon: '🔧',
    description: 'Elindeki fikri SCAMPER ile büyüt, bük, güçlendir.',
    hint: 'Bir tohum seç, 7 teknikten biriyle dönüştür.',
    recommendedPanel: 'scamper',
    resultLabel: 'Geliştirilmiş fikrin',
  },
]

export function getGoal(id: string | null): Goal | null {
  if (!id) return null
  return GOALS.find((g) => g.id === id) ?? null
}
