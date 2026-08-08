export type WorkoutId = 'spark' | 'content' | 'unblock' | 'refine'

export interface Workout {
  id: WorkoutId
  title: string
  subtitle: string
  duration: string
  forWho: string
}

export const WORKOUTS: Workout[] = [
  {
    id: 'spark',
    title: 'Kıvılcım',
    subtitle: 'Sıfırdan proje / ürün tohumu',
    duration: '~5 dk',
    forWho: 'Yeni bir şey başlatmak isteyenler',
  },
  {
    id: 'content',
    title: 'İçerik Atölyesi',
    subtitle: 'Yazı, post, senaryo açısı',
    duration: '~5 dk',
    forWho: 'Ne yazacağını bilemeyenler',
  },
  {
    id: 'unblock',
    title: 'Tıkanıklık Açıcı',
    subtitle: 'Hızlı ısınma + beklenmedik birleşimler',
    duration: '~4 dk',
    forWho: 'Beyni donmuş hissedenler',
  },
  {
    id: 'refine',
    title: 'Fikir Tornası',
    subtitle: 'Var olan fikri bük ve güçlendir',
    duration: '~5 dk',
    forWho: 'Elindeki fikri büyütmek isteyenler',
  },
]

export const WARMUP_ROUNDS = [
  {
    prompt: 'Bugün hangi enerjiyle antrenman yapıyorsun?',
    options: ['Meraklı', 'Cesur', 'Oyuncu', 'Sakin ama keskin'],
  },
  {
    prompt: 'Fikrin kime dokunsun?',
    options: ['Yalnız çalışanlara', 'Şehirde yaşayanlara', 'Çocuklara', 'Yaratıcı ekiplere'],
  },
  {
    prompt: 'Hangi duyguyu bırakmak istiyorsun?',
    options: ['Merak', 'Rahatlama', 'Cesaret', 'Gülümseme'],
  },
  {
    prompt: 'Ölçek ne olsun?',
    options: ['Cebime sığsın', 'Bir odayı doldursun', 'Şehre yayılsın', 'Sadece bir an sürsün'],
  },
]

export const CONCEPT_POOL = [
  'zaman', 'sessizlik', 'ayna', 'kök', 'köprü', 'rüya', 'harita', 'koku',
  'ışık', 'gölge', 'müzik', 'labirent', 'pusula', 'tohum', 'pencere', 'dalga',
  'hafıza', 'şehir', 'orman', 'anahtar', 'merdiven', 'bulut', 'kalp', 'kod',
]

export const COLLISION_TEMPLATES = [
  (a: string, b: string) => `${a} ile ${b} birleşince: günlük hayatta ${b} gibi çalışan bir ${a} deneyimi`,
  (a: string, b: string) => `Ya ${a} aslında bir ${b} olsaydı? Ortaya çıkan ürün: "${a}li ${b}"`,
  (a: string, b: string) => `${a} × ${b} = İnsanların paylaşmak istediği küçük bir ritüel`,
  (a: string, b: string) => `Gizli formül: ${b}in içindeki ${a}. Bunu bir hizmete çevir.`,
  (a: string, b: string) => `${a} ve ${b} dans ediyor — sonuç ne biri ne diğeri: ikisinin ruhu`,
]

export const SEED_IDEAS = [
  'Rüyalar arası posta servisi',
  'Zamanı satan dükkan',
  'Görünmez bir müze',
  'Sessizlik aboneliği',
  'Kaybolmuş eşya ormanı',
  'Kalp atışına göre değişen oda',
]

export const SHAPE_MOVES = [
  {
    id: 'shrink',
    label: 'Küçült',
    hint: 'Cep boyutuna indir',
    apply: (idea: string) => `${idea} — ama cepte taşınacak kadar küçük`,
  },
  {
    id: 'flip',
    label: 'Tersine çevir',
    hint: 'Rolleri değiştir',
    apply: (idea: string) => `${idea} — bu kez kullanıcı ürünü üretir`,
  },
  {
    id: 'merge',
    label: 'Başka dünyayla birleştir',
    hint: 'Beklenmedik ortak',
    apply: (idea: string) => `${idea} + mahalle bakkalı = herkesin uğradığı bir ritüel`,
  },
  {
    id: 'strip',
    label: 'Fazlalığı at',
    hint: 'Tek şeye indir',
    apply: (idea: string) => `${idea} — ekransız, sadece tek bir jestle çalışır`,
  },
  {
    id: 'stage',
    label: 'Sahneye koy',
    hint: 'Performansa çevir',
    apply: (idea: string) => `${idea} bir sokak performansı / pop-up deneyimi olsun`,
  },
  {
    id: 'gift',
    label: 'Hediyeleştir',
    hint: 'Paylaşılabilir yap',
    apply: (idea: string) => `${idea} — birine hediye edilebilen bir deneyim paketi`,
  },
]

export function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

export function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function composeSpark(energy: string, audience: string, emotion: string, scale: string): string {
  return `${audience} için ${scale.toLowerCase()} bir deneyim: ${emotion.toLowerCase()} hissi veren, ${energy.toLowerCase()} bir fikir kıvılcımı`
}
