export const CONCEPTS = [
  'su', 'ateş', 'gölge', 'müzik', 'zaman', 'ayna', 'labirent', 'kök',
  'bulut', 'kristal', 'rüzgar', 'tohum', 'köprü', 'dalga', 'karanlık',
  'ışık', 'hafıza', 'yolculuk', 'dönüşüm', 'sessizlik', 'fırtına',
  'bahçe', 'kule', 'nehir', 'yıldız', 'kum', 'cam', 'demir', 'ipek',
  'robot', 'ormanı', 'şehir', 'okyanus', 'dağ', 'çöl', 'buzul',
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

export const FLEX_PROMPTS = [
  'Bir bardak suyu 10 farklı şekilde kullan',
  'Telefonu olmayan bir dünya tasarla',
  'En kötü restoran fikrini bul (ciddi olmasın)',
  'Süper gücün "herkesi güldürmek" olsaydı ne yapardın?',
  'Bir bulutu satmak için reklam sloganı yaz',
  'Yastık bir devlet olsaydı, başkenti neresi olurdu?',
  'Zamanı geri sarsan ilk 3 şey ne olurdu?',
  'Kediler dünyayı yönetseydi ilk kanun ne olurdu?',
  'Sessizliği paketleyip sat',
  'Ayakkabıların konuşabildiği bir gün',
  'Yağmuru müzik notalarına çevir',
  'Bir tuğlayı milyon dolarlık ürüne dönüştür',
  'En absürt uygulama fikrini bul',
  'Rüyaları kaydetmek için cihaz tasarla',
  'Herkesin aynı düşüncede olduğu bir an',
  'Renkleri tatmak nasıl olurdu?',
  'Evrenin en küçük mucizesi nedir?',
  'Bir ağacın günlüğünü yaz',
  'Yerçekimi 5 dakikalığına kapansa ne olur?',
  'En iyi kötü fikir hangisi?',
]

export const PERSPECTIVES = [
  {
    id: 'artist',
    name: 'Sanatçı',
    emoji: '🎨',
    color: '#ff00aa',
    transform: (idea: string) =>
      `"${idea}" — tuvalde bu fikir, ${idea.toLowerCase()}in tüm duygusal tonlarını aynı anda yansıtan bir impresyonist tablo olurdu. Renkler konuşur, formlar dans eder.`,
  },
  {
    id: 'engineer',
    name: 'Mühendis',
    emoji: '⚙️',
    color: '#00f5ff',
    transform: (idea: string) =>
      `"${idea}" — sistem analizi: Girdi → ${idea} → Çıktı. Verimlilik: %∞. Darboğaz: yaratıcılık. Çözüm: iterasyon.`,
  },
  {
    id: 'child',
    name: 'Çocuk',
    emoji: '🧒',
    color: '#ffd700',
    transform: (idea: string) =>
      `"${idea}" çok eğlenceli! Bununla oynayabilir miyim? Bir de arkadaşıma göstermek istiyorum! Belki ${idea.toLowerCase()}den bir kale yapabilirim!`,
  },
  {
    id: 'critic',
    name: 'Eleştirmen',
    emoji: '🔍',
    color: '#bf00ff',
    transform: (idea: string) =>
      `"${idea}" — ilginç bir deneme. Ancak derinlik eksik. ${idea}in potansiyeli var ama yüzeysel kalıyor. Daha cesur olmalı.`,
  },
  {
    id: 'investor',
    name: 'Yatırımcı',
    emoji: '💰',
    color: '#00ff88',
    transform: (idea: string) =>
      `"${idea}" — TAM pazar büyüklüğü: $47B. CAGR: %340. Moat: benzersiz ${idea.toLowerCase()} yaklaşımı. Series A için hazır.`,
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

export const SCAMPER = [
  { letter: 'S', word: 'Substitute', tr: 'Yerine Koy', desc: 'Bir öğeyi başka bir şeyle değiştir', question: 'Bunun yerine ne kullanılabilir?' },
  { letter: 'C', word: 'Combine', tr: 'Birleştir', desc: 'İki veya daha fazla şeyi bir araya getir', question: 'Bunu başka neyle birleştirebilirsin?' },
  { letter: 'A', word: 'Adapt', tr: 'Uyarla', desc: 'Başka bir bağlamdan ilham al', question: 'Başka nerelerde benzer bir şey var?' },
  { letter: 'M', word: 'Modify', tr: 'Değiştir', desc: 'Boyut, şekil veya özellikleri değiştir', question: 'Bunu büyütürsek/küçültürsek ne olur?' },
  { letter: 'P', word: 'Put to other uses', tr: 'Başka Amaçla Kullan', desc: 'Tamamen farklı bir kullanım bul', question: 'Bunu başka ne için kullanabilirsin?' },
  { letter: 'E', word: 'Eliminate', tr: 'Çıkar', desc: 'Gereksiz parçaları kaldır', question: 'Neyi çıkarırsan daha iyi olur?' },
  { letter: 'R', word: 'Reverse', tr: 'Tersine Çevir', desc: 'Sırayı, yönü veya rolleri değiştir', question: 'Bunu tersine çevirirsen ne olur?' },
]

export const STARTER_IDEAS = [
  'Görünmez bir müze',
  'Zamanı satan dükkan',
  'Rüyalar arası posta servisi',
  'Düşüncelerin kokusu',
  'Sonsuz bir merdiven',
]
