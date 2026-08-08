export const CONCEPTS = [
  'su', 'ateş', 'gölge', 'müzik', 'zaman', 'ayna', 'labirent', 'kök',
  'bulut', 'kristal', 'rüzgar', 'tohum', 'köprü', 'dalga', 'karanlık',
  'ışık', 'hafıza', 'yolculuk', 'dönüşüm', 'sessizlik', 'fırtına',
  'bahçe', 'kule', 'nehir', 'yıldız', 'kum', 'cam', 'demir', 'ipek',
  'robot', 'orman', 'şehir', 'okyanus', 'dağ', 'çöl', 'buzul',
  'kütüphane', 'teleskop', 'kale', 'ada', 'tünel', 'uçurtma', 'mıknatıs',
  'pusula', 'anahtar', 'kapı', 'pencere', 'merdiven', 'çan', 'göz',
  'kalp', 'el', 'ses', 'renk', 'koku', 'tat', 'dokunuş', 'rüya',
  'uyanış', 'sır', 'harita', 'hazine', 'kayıp', 'buluş', 'icat',
  'soru', 'cevap', 'paradoks', 'döngü', 'spiral', 'fraktal', 'kod',
  'şifre', 'dil', 'gülüş', 'gözyaşı', 'kahkaha', 'fısıltı', 'çığlık',
]

export const STORM_TEMPLATES = [
  (a: string, b: string) => `${a} ile ${b} bir araya geldiğinde: ${b}in içindeki ${a} gizli bir kapı açıyor.`,
  (a: string, b: string) => `Ya ${a} aslında bir ${b} olsaydı? Her ${b}, kendi ${a}ini taşır.`,
  (a: string, b: string) => `${a} + ${b} = Görünmez bir ${b} fabrikası. ${a} ham madde, ${b} ürün.`,
  (a: string, b: string) => `Bir ${a} düşün — ama ${b} gibi davranıyor. Sonuç: Evrenin en garip ${b}i.`,
  (a: string, b: string) => `${b}in kalbinde ${a} yatıyor. Onu uyandırırsan, ${b} asla eskisi gibi olmaz.`,
  (a: string, b: string) => `Eğer ${a} bir ${b} olsaydı, dünya ${b}lerle dolardı. Her biri farklı bir ${a}.`,
  (a: string, b: string) => `${a} ve ${b} dans ediyor. Ortaya çıkan şey: ne ${a} ne ${b}, ama ikisinin de ruhu.`,
  (a: string, b: string) => `Gizli formül: ${a} × ${b}² = Sonsuz ${b} potansiyeli.`,
  (a: string, b: string) => `Bir çocuk ${a} ile ${b}i karıştırdı. Ortaya çıkan mucize: "${b}li ${a}".`,
  (a: string, b: string) => `${a}in ${b}e dönüşme hikayesi: Önce küçük bir titreşim, sonra patlama.`,
]

export const THEMES = [
  { id: 'time', label: 'Zaman', icon: '⏳' },
  { id: 'dream', label: 'Rüya', icon: '💭' },
  { id: 'nature', label: 'Doğa', icon: '🌿' },
  { id: 'city', label: 'Şehir', icon: '🏙️' },
  { id: 'body', label: 'Beden', icon: '🫀' },
  { id: 'tech', label: 'Teknoloji', icon: '🤖' },
  { id: 'memory', label: 'Hafıza', icon: '🧠' },
  { id: 'sound', label: 'Ses', icon: '🔊' },
] as const

export const MOODS = [
  { id: 'curious', label: 'Meraklı', icon: '🔍' },
  { id: 'dark', label: 'Karanlık', icon: '🌑' },
  { id: 'playful', label: 'Oyuncu', icon: '🎲' },
  { id: 'poetic', label: 'Şiirsel', icon: '🌙' },
  { id: 'absurd', label: 'Absürt', icon: '🌀' },
  { id: 'warm', label: 'Sıcak', icon: '☀️' },
] as const

export const MEDIUMS = [
  { id: 'app', label: 'Uygulama', icon: '📱' },
  { id: 'place', label: 'Mekân', icon: '🏛️' },
  { id: 'object', label: 'Nesne', icon: '📦' },
  { id: 'service', label: 'Hizmet', icon: '🛎️' },
  { id: 'ritual', label: 'Ritüel', icon: '🕯️' },
  { id: 'story', label: 'Hikâye', icon: '📖' },
] as const

export const TWISTS = [
  { id: 'invisible', label: 'Görünmez', icon: '👻' },
  { id: 'reverse', label: 'Tersine', icon: '↩️' },
  { id: 'tiny', label: 'Minik', icon: '🔬' },
  { id: 'eternal', label: 'Sonsuz', icon: '♾️' },
  { id: 'shared', label: 'Paylaşımlı', icon: '🤝' },
  { id: 'forgotten', label: 'Unutulmuş', icon: '🌫️' },
] as const

type ThemeId = (typeof THEMES)[number]['id']
type MoodId = (typeof MOODS)[number]['id']
type MediumId = (typeof MEDIUMS)[number]['id']
type TwistId = (typeof TWISTS)[number]['id']

const IDEA_MATRIX: Record<ThemeId, Record<MediumId, string>> = {
  time: {
    app: 'Zamanı yavaşlatan bir uygulama',
    place: 'Saatin durduğu bir oda',
    object: 'Geçmişi gösteren bir saat',
    service: 'Anıları kiralayan bir servis',
    ritual: 'Her sabah 5 dakika geriye giden ritüel',
    story: 'Zamanın ters aktığı bir hikâye',
  },
  dream: {
    app: 'Rüyaları kaydeden bir uygulama',
    place: 'Rüyalar arası bir tren istasyonu',
    object: 'Uyanınca rüyayı tutan bir kavanoz',
    service: 'Rüya eşleştirme servisi',
    ritual: 'Uyumadan önce rüya tohumu ekme',
    story: 'İki kişinin aynı rüyayı gördüğü hikâye',
  },
  nature: {
    app: 'Ağaçlarla konuşturan bir uygulama',
    place: 'Yeraltı kök müzesi',
    object: 'Yağmur kokusu taşıyan bir taş',
    service: 'Şehirde orman kiralama',
    ritual: 'Ay ışığında tohum bırakma',
    story: 'Bir nehrin anlattığı hikâye',
  },
  city: {
    app: 'Boş sokakları keşfeden bir uygulama',
    place: 'Sadece fısıltıların duyulduğu kütüphane',
    object: 'Şehrin nabzını gösteren bir pusula',
    service: 'Kaybolmuş eşya posta servisi',
    ritual: 'Her salı bilinmeyen bir caddeye çıkmak',
    story: 'Binaların birbirine mektup yazdığı hikâye',
  },
  body: {
    app: 'Duyguları renge çeviren bir uygulama',
    place: 'Kalp atışına göre değişen bir salon',
    object: 'Dokunduğunda anı hatırlatan eldiven',
    service: 'Sessiz kucaklaşma stüdyosu',
    ritual: 'Nefesle ışık yakma ritüeli',
    story: 'Ellerin kendi başına yürüdüğü hikâye',
  },
  tech: {
    app: 'Düşünceleri filtreleyen bir uygulama',
    place: 'Robotların şiir yazdığı atölye',
    object: 'Soru soran bir ayna',
    service: 'Yapay zekâya rüya anlatma servisi',
    ritual: 'Cihazları bir gün sessize alma',
    story: 'Algoritmanın aşık olduğu hikâye',
  },
  memory: {
    app: 'Unutulan anıları bulan bir uygulama',
    place: 'Kaybolmuş anılar deposu',
    object: 'Kokusuyla geçmişi açan bir kutu',
    service: 'Başkasının anısını bir günlüğüne taşıma',
    ritual: 'Her ay bir anıyı toprağa gömme',
    story: 'Hafızasını birine emanet eden kişi',
  },
  sound: {
    app: 'Sessizliği besteye çeviren bir uygulama',
    place: 'Yankısız bir müzik salonu',
    object: 'Duyguları ses olarak saklayan küre',
    service: 'Kişisel fısıltı arşivi',
    ritual: 'Şehir gürültüsünü dinleme seansı',
    story: 'Kelimelerin müzik olduğu bir dil',
  },
}

const TWIST_PREFIX: Record<TwistId, (idea: string) => string> = {
  invisible: (idea) => `Görünmez ${idea.toLowerCase()}`,
  reverse: (idea) => `${idea} — ama her şey tersine işliyor`,
  tiny: (idea) => `Cebine sığan ${idea.toLowerCase()}`,
  eternal: (idea) => `Asla bitmeyen ${idea.toLowerCase()}`,
  shared: (idea) => `İki kişinin aynı anda yaşadığı ${idea.toLowerCase()}`,
  forgotten: (idea) => `Herkesin unuttuğu ${idea.toLowerCase()}`,
}

const MOOD_FLAVOR: Record<MoodId, string> = {
  curious: 'Merak uyandıran bir keşif gibi',
  dark: 'Hafif ürpertici bir gizemle',
  playful: 'Gülümseten bir oyun ruhuyla',
  poetic: 'Yumuşak ve şiirsel bir dokunuşla',
  absurd: 'Mantığı altüst eden bir sürprizle',
  warm: 'İç ısıtan bir samimiyetle',
}

export function composeIdea(
  themeId: ThemeId,
  moodId: MoodId,
  mediumId: MediumId,
  twistId: TwistId,
): { title: string; description: string } {
  const base = IDEA_MATRIX[themeId][mediumId]
  const title = TWIST_PREFIX[twistId](base)
  const theme = THEMES.find((t) => t.id === themeId)!
  const mood = MOODS.find((m) => m.id === moodId)!
  const medium = MEDIUMS.find((m) => m.id === mediumId)!
  const twist = TWISTS.find((t) => t.id === twistId)!
  const description = `${MOOD_FLAVOR[moodId]} ${theme.label} × ${medium.label} × ${twist.label} karışımı. ${mood.icon} ${medium.icon} ${twist.icon}`
  return { title, description }
}

export const FLEX_ROUNDS = [
  {
    prompt: 'Bir bardak suyu nasıl kullanırdın?',
    options: [
      'Zaman kapsülü gibi gömmek',
      'Şehir haritası çizmek için mürekkep yapmak',
      'Komşuya mesaj şişesi göndermek',
      'Ay ışığını içinde saklamak',
    ],
  },
  {
    prompt: 'Telefon yokken insanlar ne yapardı?',
    options: [
      'Pencereye not asmak',
      'Gölgeleri işaret diliyle konuşturmak',
      'Park banklarında sır paylaşmak',
      'Gökyüzüne dumanla yazmak',
    ],
  },
  {
    prompt: 'En absürt restoran fikri hangisi?',
    options: [
      'Sadece fısıltıyla sipariş',
      'Menü yok, duygu seçiyorsun',
      'Yemekler görünmez, koku var',
      'Garsonlar robot kedi',
    ],
  },
  {
    prompt: 'Bir bulutu satmak için slogan?',
    options: [
      'Gökyüzünün en yumuşak parçası',
      'Kendi yağmurunu taşı',
      'Hayal kurmak için abonelik',
      'Bulut: taşınabilir huzur',
    ],
  },
  {
    prompt: 'Kediler dünyayı yönetse ilk kanun?',
    options: [
      'Her öğleden sonra zorunlu şekerleme',
      'Kutu üretimi devlet tekeli',
      'Lazer pointer yasak',
      'Pencere kenarı herkese açık',
    ],
  },
  {
    prompt: 'Sessizliği nasıl paketlerdin?',
    options: [
      'Cam kavanozda satmak',
      'Kulaklık aboneliği olarak',
      'Gece parkı biletiyle',
      'Tek nefeslik kapsülde',
    ],
  },
  {
    prompt: 'Ayakkabılar konuşabilse ne derdi?',
    options: [
      'Yeter, başka bir yere gidelim',
      'Bugün seni gururla taşıdım',
      'O çamuru unutmayacağım',
      'Dans etmemiz lazım',
    ],
  },
  {
    prompt: 'Yağmuru müziğe çevirsen?',
    options: [
      'Her damla bir piyano tuşu',
      'Sokaklar davul olurdu',
      'Şemsiyeler yay gibi titreşirdi',
      'Gök gürültüsü bas gitar',
    ],
  },
  {
    prompt: 'Bir tuğlayı neye dönüştürürdün?',
    options: [
      'Cep kütüphanesi',
      'Sıcak tutan el ısıtıcısı',
      'Şehir anı belgesi',
      'Mini bitki evi',
    ],
  },
  {
    prompt: 'Yerçekimi 5 dakika kapansa?',
    options: [
      'Herkes tavanda kahve içer',
      'Çamaşırlar gökyüzünde dans eder',
      'Kediler en mutlu günlerini yaşar',
      'Öpücükler havada asılı kalır',
    ],
  },
]

export const PERSPECTIVES = [
  {
    id: 'artist',
    name: 'Sanatçı',
    emoji: '🎨',
    color: '#ff00aa',
    transform: (idea: string) =>
      `"${idea}" — tuvalde bu fikir, tüm duygusal tonlarını aynı anda yansıtan bir impresyonist tablo olurdu. Renkler konuşur, formlar dans eder.`,
  },
  {
    id: 'engineer',
    name: 'Mühendis',
    emoji: '⚙️',
    color: '#00f5ff',
    transform: (idea: string) =>
      `"${idea}" — sistem analizi: Girdi → fikir → Çıktı. Verimlilik: %∞. Darboğaz: yaratıcılık. Çözüm: iterasyon ve prototip.`,
  },
  {
    id: 'child',
    name: 'Çocuk',
    emoji: '🧒',
    color: '#ffd700',
    transform: (idea: string) =>
      `"${idea}" çok eğlenceli! Bununla oynayabilir miyim? Belki bundan bir kale yapabilirim!`,
  },
  {
    id: 'critic',
    name: 'Eleştirmen',
    emoji: '🔍',
    color: '#bf00ff',
    transform: (idea: string) =>
      `"${idea}" — ilginç bir deneme. Potansiyeli var ama daha cesur, daha keskin bir kenar lazım.`,
  },
  {
    id: 'investor',
    name: 'Yatırımcı',
    emoji: '💰',
    color: '#00ff88',
    transform: (idea: string) =>
      `"${idea}" — TAM pazar büyüklüğü: $47B. CAGR: %340. Benzersiz moat. Series A için hazır.`,
  },
  {
    id: 'poet',
    name: 'Şair',
    emoji: '✨',
    color: '#e056fd',
    transform: (idea: string) =>
      `${idea} / sessiz bir nefes gibi / düşüncenin kıyısında durur / ve bizi çağırır / adını bilmediğimiz yerlere`,
  },
]

export const SEED_IDEAS = [
  'Görünmez bir müze',
  'Zamanı satan dükkan',
  'Rüyalar arası posta servisi',
  'Düşüncelerin kokusu',
  'Sonsuz bir merdiven',
  'Sessizlik fabrikası',
  'Kaybolmuş eşya ormanı',
  'Kalp atışına göre değişen oda',
]

export const SCAMPER = [
  {
    letter: 'S',
    word: 'Substitute',
    tr: 'Yerine Koy',
    desc: 'Bir öğeyi başka bir şeyle değiştir',
    question: 'Bunun yerine ne kullanılabilir?',
    optionsFor: (idea: string) => [
      `${idea} içindeki insanı bir AI ile değiştir`,
      `${idea} yerine bir rüya koy`,
      `${idea}in malzemesini ışık yap`,
      `${idea}in dilini sessizlik yap`,
    ],
  },
  {
    letter: 'C',
    word: 'Combine',
    tr: 'Birleştir',
    desc: 'İki veya daha fazla şeyi bir araya getir',
    question: 'Bunu başka neyle birleştirebilirsin?',
    optionsFor: (idea: string) => [
      `${idea} + müzik = duygu orkestrası`,
      `${idea} + harita = keşif oyunu`,
      `${idea} + koku = anı tetikleyici`,
      `${idea} + oyun = bağımlılık yaratan ritüel`,
    ],
  },
  {
    letter: 'A',
    word: 'Adapt',
    tr: 'Uyarla',
    desc: 'Başka bir bağlamdan ilham al',
    question: 'Başka nerelerde benzer bir şey var?',
    optionsFor: (idea: string) => [
      `Doğadan uyarla: ${idea} bir arı kovanı gibi çalışsın`,
      `Mutfaktan uyarla: ${idea} bir tarif gibi adım adım olsun`,
      `Oyunlardan uyarla: ${idea} seviye atlasın`,
      `Tiyatroden uyarla: ${idea} bir sahne gibi kurulsun`,
    ],
  },
  {
    letter: 'M',
    word: 'Modify',
    tr: 'Değiştir',
    desc: 'Boyut, şekil veya özellikleri değiştir',
    question: 'Bunu büyütürsek/küçültürsek ne olur?',
    optionsFor: (idea: string) => [
      `${idea} cep boyutuna küçülsün`,
      `${idea} bir şehre yayılsın`,
      `${idea} sadece geceleri çalışsın`,
      `${idea} tek kullanımlık olsun`,
    ],
  },
  {
    letter: 'P',
    word: 'Put to other uses',
    tr: 'Başka Amaçla Kullan',
    desc: 'Tamamen farklı bir kullanım bul',
    question: 'Bunu başka ne için kullanabilirsin?',
    optionsFor: (idea: string) => [
      `${idea} eğitim aracı olsun`,
      `${idea} terapi yöntemi olsun`,
      `${idea} flört mekanı olsun`,
      `${idea} şehir festiveline dönüşsün`,
    ],
  },
  {
    letter: 'E',
    word: 'Eliminate',
    tr: 'Çıkar',
    desc: 'Gereksiz parçaları kaldır',
    question: 'Neyi çıkarırsan daha iyi olur?',
    optionsFor: (idea: string) => [
      `${idea}den parayı çıkar — tamamen bedava`,
      `${idea}den ekranı çıkar — sadece fiziksel`,
      `${idea}den kuralları çıkar — kaos serbest`,
      `${idea}den kelimeleri çıkar — sadece jest`,
    ],
  },
  {
    letter: 'R',
    word: 'Reverse',
    tr: 'Tersine Çevir',
    desc: 'Sırayı, yönü veya rolleri değiştir',
    question: 'Bunu tersine çevirirsen ne olur?',
    optionsFor: (idea: string) => [
      `${idea}: kullanıcı ürünü üretir`,
      `${idea}: son adım ilk adım olur`,
      `${idea}: gece gündüz gibi çalışır`,
      `${idea}: veren alan, alan veren olur`,
    ],
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
