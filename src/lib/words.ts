export const DRIFT_WORDS = [
  'zaman', 'sessizlik', 'ayna', 'kök', 'köprü', 'rüya', 'harita', 'koku',
  'ışık', 'gölge', 'müzik', 'labirent', 'pusula', 'tohum', 'pencere', 'dalga',
  'hafıza', 'şehir', 'orman', 'anahtar', 'merdiven', 'bulut', 'kalp', 'kod',
  'fısıltı', 'buz', 'kum', 'yıldız', 'tünel', 'nefes', 'iz', 'kapı',
  'renk', 'rüzgar', 'sır', 'gülüş', 'çöl', 'ada', 'yankı', 'toz',
]

const BOTTLE_TEMPLATES = [
  (words: string[]) =>
    `${cap(words[0])} ile ${words[1]} aynı nehirde buluşursa: insanlara ${words[2] || 'umut'} taşıyan küçük bir ritüel doğar.`,
  (words: string[]) =>
    `Kıyıya vuran fikir: ${words[0]}ı ${words[1]} gibi kullanan, ${words[2] || 'sessiz'} bir deneyim.`,
  (words: string[]) =>
    `Şişedeki mesaj: "${words.join(' · ')}" — bunu bir ürün, bir hikâye veya bir oyun yap.`,
  (words: string[]) =>
    `${cap(words[0])} kaybolmasın diye ${words[1]}dan bir sığınak kur. İçinde ${words[2] || 'hafıza'} birikir.`,
  (words: string[]) =>
    `Ya ${words[0]} aslında bir ${words[1]} olsaydı? Ortaya çıkan şey: ${words.slice(0, 3).join('-')} makinesi.`,
]

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function brewBottles(caught: string[]): string[] {
  const pool = shuffle(caught)
  const templates = shuffle(BOTTLE_TEMPLATES)
  return [0, 1, 2].map((i) => {
    const slice = shuffle(pool).slice(0, 3)
    while (slice.length < 3) slice.push(DRIFT_WORDS[Math.floor(Math.random() * DRIFT_WORDS.length)])
    return templates[i % templates.length](slice)
  })
}

export type Floater = {
  id: string
  word: string
  y: number
  duration: number
  delay: number
  size: number
}
