// Fynix Asset CDN URLs
// Design: "Enchanted Scroll" – Mystischer Wald trifft Mobile Gaming
// Fonts: Syne (display), DM Sans (body)
// Palette: Midnight Blue base, Amethyst primary, Moonlight Silver text

export const MASCOT = {
  angry: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/SFakockcNGiWonaJ.png',
  sleepy: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/ssctjsZxAMsVKiju.png',
  happy: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/DesPcmPEPjcbVQNX.png',
  smug: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/zfaUggItjdfxGgZR.png',
  crying: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/PcqUdiSizzYkUPUE.png',
  neutral: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/zfaUggItjdfxGgZR.png',
  laughing: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/DesPcmPEPjcbVQNX.png',
  thinking: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/zfaUggItjdfxGgZR.png',
  throne: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/DesPcmPEPjcbVQNX.png',
} as const;

export const ICONS = {
  streak: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/zKunnzghrchlZoKX.png',
  xp: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/QStBLbOzjhGItdcR.png',
} as const;

export const AVATARS = {
  headband: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/QEirWJurltuInfhw.png',
    name: 'Sporty',
  },
  hoodie_girl: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/jwkMvONGyMySagKF.png',
    name: 'Chill Girl',
  },
  skull: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/UzzxddjSEDZJOpVT.png',
    name: 'Rebel',
  },
  glasses: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/TwGsMMqjxaqvWmVi.png',
    name: 'Nerd',
  },
  artist: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/uJHjQHNhTlRgoSEV.png',
    name: 'Artist',
  },
  cap: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/ORLrMiPslQCAbRNa.png',
    name: 'Skater',
  },
  gamer: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/bHdMzuYCRAxaVuYt.png',
    name: 'Gamer',
  },
  star_girl: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/NjqpECvZuEomCHxY.png',
    name: 'Star',
  },
  chain_boy: {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663372553377/OVJeXQjCsMJGgKnN.png',
    name: 'Boss',
  },
} as const;

export type AvatarKey = keyof typeof AVATARS;
export type MascotMood = keyof typeof MASCOT;

// XP Level System
export const LEVEL_TITLES = ['Newbie', 'Scholar', 'Learner', 'Explorer', 'Thinker', 'Achiever', 'Master', 'Expert', 'Legend', 'Champion', 'GOD'];

export function getLevelInfo(xp: number) {
  const xpForLevel = (lvl: number) => {
    if (lvl <= 5) return 50 + Math.floor(lvl) * 50;
    if (lvl <= 15) return 300 + Math.floor(lvl - 5) * 100;
    if (lvl <= 40) return 1300 + Math.floor(lvl - 15) * 200;
    return 6300 + Math.floor(lvl - 40) * 500;
  };

  let level = 1;
  let curThresh = 0;
  let nextThresh = xpForLevel(1);
  while (xp >= nextThresh && level < 200) {
    level += 1;
    curThresh = nextThresh;
    nextThresh = curThresh + xpForLevel(level);
  }
  const pct = Math.min(100, Math.max(0, Math.round(((xp - curThresh) / (nextThresh - curThresh)) * 100)));
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return { level, title, pct, curThresh, nextThresh };
}

// Streak Bonus
export function getStreakBonus(streak: number): number {
  if (streak >= 21) return 50;
  if (streak >= 14) return 10;
  if (streak >= 7) return 5;
  return 0;
}

// Feed Content
export const FEED_CARDS = [
  {
    id: '1',
    category: 'Mathe',
    title: 'Prozentrechnung – No Cap',
    content: '10% von 250 ist 25. Einfach das Komma schieben, Bro. 20%? Verdoppel es einfach. Deine Mathe-Skills werden tuff, versprochen! 🔥',
    quiz: { question: 'Was sind 15% von 200?', options: ['25', '30', '35', '40'], correct: 1, type: 'mc' as const },
  },
  {
    id: '2',
    category: 'Englisch',
    title: 'Irregular Verbs (Tuff Version)',
    content: 'go → went → gone. Wer das nicht kann, ist lost. Fr, lern die auswendig, sonst wird\'s peinlich im Urlaub. 🌎',
    quiz: { question: 'Was ist die Past-Form von "see"?', options: ['seed', 'saw', 'seen', 'sawed'], correct: 1, type: 'mc' as const },
  },
  {
    id: '3',
    category: 'Biologie',
    title: 'Photosynthese-Vibe',
    content: 'Pflanzen ziehen CO₂ und Licht, droppen O₂ und Glucose. Ohne die grünen Bros wärst du nach 3 Minuten out of order. 🌿💀',
    quiz: { question: 'Was produzieren Pflanzen?', options: ['CO₂', 'O₂ + Glucose', 'Nur Staub', 'Nichts'], correct: 1, type: 'mc' as const },
  },
  {
    id: '4',
    category: 'Weltall',
    title: 'Schwarze Löcher sind wild',
    content: 'Diese Dinger schlucken Licht zum Frühstück. Wenn du da reinspringst, wirst du wie Spagetti gedehnt. Spaghettisierung, fr! 🌌🍝',
    quiz: { question: 'Was passiert in einem schwarzen Loch?', options: ['Man wird gegrillt', 'Spaghettisierung', 'Man wird reich', 'Nichts'], correct: 1, type: 'mc' as const },
  },
  {
    id: '5',
    category: 'History',
    title: 'Römer waren Built Different',
    content: 'Die hatten schon Fußbodenheizung, während deine Vorfahren noch im Wald gepennt haben. No cap, Ingenieurs-Level 1000. 🏛️🔥',
    quiz: { question: 'Was hatten die Römer schon?', options: ['W-LAN', 'Fußbodenheizung', 'iPhone', 'Telsa'], correct: 1, type: 'mc' as const },
  },
  {
    id: '6',
    category: 'Science',
    title: 'Wassertemperatur-Hack',
    content: 'Heißes Wasser gefriert manchmal schneller als kaltes. Mpemba-Effekt nennt man das. Physik ist manchmal echt glitchy. ❄️🤔',
    quiz: { question: 'Wie heißt dieser Effekt?', options: ['Fynix-Effekt', 'Mpemba-Effekt', 'Eis-Hack', 'Glace-Move'], correct: 1, type: 'mc' as const },
  },
  {
    id: '7',
    category: 'Tierwelt',
    title: 'Quallen sind Immortal',
    content: 'Es gibt eine Qualle, die einfach wieder zum Baby wird, wenn sie alt ist. Quasi der ultimative Life-Hack. Unendlicher Grind! 🪼✨',
    quiz: { question: 'Was kann die Turritopsis dohrnii?', options: ['Fliegen', 'Sich verjüngen', 'Sprechen', 'Unsichtbar sein'], correct: 1, type: 'mc' as const },
  },
  {
    id: '8',
    category: 'Tech',
    title: 'Erster Bug war ein echter Käfer',
    content: '1947 saß eine echte Motte in einem Computer. Seitdem nennen wir Fehler "Bugs". Keine Metapher, einfach Real-Life-Insekten. 🐛💻',
    quiz: { question: 'Was war der erste Computer-Bug?', options: ['Ein Softwarefehler', 'Eine echte Motte', 'Ein Virus', 'Kaffee'], correct: 1, type: 'mc' as const },
  },
  {
    id: '9',
    category: 'Geo',
    title: 'Berge wachsen, fr',
    content: 'Der Mount Everest wächst jedes Jahr ein paar Millimeter. Die Erde ist also ständig im Fitnessstudio am Gainen. 🏔️💪',
    quiz: { question: 'Wächst der Mount Everest?', options: ['Ja', 'Nein', 'Nur im Sommer', 'Er schrumpft'], correct: 0, type: 'mc' as const },
  },
  {
    id: '10',
    category: 'Food',
    title: 'Honig hält ewig',
    content: 'Archäologen haben Honig in Ägypten gefunden, der 3000 Jahre alt war und immer noch schmeckt. Konservierung ist tuff! 🍯🏺',
    quiz: { question: 'Wie lange hält Honig?', options: ['1 Jahr', '10 Jahre', 'Jahrtausende', '1 Monat'], correct: 2, type: 'mc' as const },
  },
  {
    id: '11',
    category: 'Sport',
    title: 'Olympia früher total wild',
    content: 'Früher haben die Athleten nackt gekämpft. Stell dir das mal heute bei DAZN vor... Komplett andere Vibes damals! 🏃‍♂️💀',
    quiz: { question: 'Wie traten antike Olympioniken an?', options: ['In Rüstung', 'Nackt', 'In Tunikas', 'Mit Masken'], correct: 1, type: 'mc' as const },
  },
  {
    id: '12',
    category: 'Physik',
    title: 'Lichtgeschwindigkeit Speedrun',
    content: 'Licht ist so schnell, es umrundet die Erde 7,5 Mal pro Sekunde. Ping: 0. Fr, schneller geht nicht mehr. ⚡🌍',
    quiz: { question: 'Wie oft schafft Licht die Erde pro Sekunde?', options: ['1 Mal', '7,5 Mal', '50 Mal', '100 Mal'], correct: 1, type: 'mc' as const },
  },
  {
    id: '13',
    category: 'Chemie',
    title: 'Diamanten aus Graphit',
    content: 'Mit genug Druck wird aus deinem Bleistift ein Diamant. Grind hard, shine bright – Chemie-Style! 💎✏️',
    quiz: { question: 'Woraus bestehen Diamanten?', options: ['Gold', 'Kohlenstoff (Graphit)', 'Glas', 'Silber'], correct: 1, type: 'mc' as const },
  },
  {
    id: '14',
    category: 'Körper',
    title: 'Nase und Hirn verknüpft',
    content: 'Gerüche schicken Erinnerungen direkt ins Hirn. Ein Sniff vom Parfüm deiner Ex und du bist instant wieder traurig. Bruh. 👃🧠',
    quiz: { question: 'Welcher Sinn triggert Erinnerungen am stärksten?', options: ['Hören', 'Geruch', 'Sehen', 'Tasten'], correct: 1, type: 'mc' as const },
  },
  {
    id: '15',
    category: 'Gaming',
    title: 'Pong war der Anfang',
    content: 'Zwei Striche und ein Punkt. Mehr brauchte man 1972 nicht zum Zocken. Heute heulst du ohne 4K rum. No cap. 🎮📺',
    quiz: { question: 'Wann kam Pong raus?', options: ['1985', '1972', '1990', '2000'], correct: 1, type: 'mc' as const },
  },
  {
    id: '16',
    category: 'Mathe',
    title: 'Pi ist unendlich',
    content: '3,14159... und es hört nie auf. Pi hat mehr Stellen als dein Kontostand jemals haben wird. 🥧🔥',
    quiz: { question: 'Mit welcher Zahl beginnt Pi?', options: ['2', '3', '4', '1'], correct: 1, type: 'mc' as const },
  },
  {
    id: '17',
    category: 'Bio',
    title: 'Oktopus hat 3 Herzen',
    content: 'Drei Herzen und blaues Blut. Die Jungs sind quasi Aliens aus dem Ozean. Tuff AF! 🐙💙',
    quiz: { question: 'Wie viele Herzen hat ein Oktopus?', options: ['1', '2', '3', '4'], correct: 2, type: 'mc' as const },
  },
  {
    id: '18',
    category: 'Natur',
    title: 'Bäume reden miteinander',
    content: 'Über Pilze im Boden schicken Bäume sich Warnungen und Nährstoffe. Ein echtes "Wood Wide Web". Fr! 🌳📶',
    quiz: { question: 'Wie kommunizieren Bäume?', options: ['Per Funk', 'Über Pilz-Netzwerke', 'Gar nicht', 'Mit Blättern'], correct: 1, type: 'mc' as const },
  },
  {
    id: '19',
    category: 'History',
    title: 'Wikinger am chillen',
    content: 'Wikinger hatten gar keine Hörner am Helm. Das war nur Marketing von Hollywood später. Die waren auch so krass genug. 🪓⛵',
    quiz: { question: 'Hatten Wikinger Hörner-Helme?', options: ['Ja, immer', 'Nein, nie', 'Nur die Chefs', 'Nur bei Festen'], correct: 1, type: 'mc' as const },
  },
  {
    id: '20',
    category: 'Tech',
    title: 'Emojis kommen aus Japan',
    content: '1999 hat ein Typ die ersten 176 Emojis erfunden. Jetzt verständigen wir uns nur noch per 💀 und 🔥. Evolution, fr. 🇯🇵📱',
    quiz: { question: 'Woher kommen Emojis?', options: ['USA', 'Deutschland', 'Japan', 'China'], correct: 2, type: 'mc' as const },
  },
  {
    id: '21',
    category: 'Weltall',
    title: 'Stille im All',
    content: 'Im Weltraum hört dich niemand schreien. Keine Luft, kein Schall. Absolute Ruhe. Perfekt für Introvertierte. 🚀🤫',
    quiz: { question: 'Warum gibt es im All keinen Schall?', options: ['Zu laut', 'Vakuum (kein Medium)', 'Zu kalt', 'Aliens verbieten es'], correct: 1, type: 'mc' as const },
  },
  {
    id: '22',
    category: 'Bio',
    title: 'DNA ist lang AF',
    content: 'Die DNA einer deiner Zellen ist 2 Meter lang. Wenn du alle verbindest, kommst du mehrmals bis zum Pluto und zurück. 🧬🪐',
    quiz: { question: 'Wie lang ist die DNA aller menschlichen Zellen zusammen?', options: ['1km', 'Bis zum Mond', 'Bis zum Pluto & zurück', '10 Meter'], correct: 2, type: 'mc' as const },
  },
  {
    id: '23',
    category: 'Science',
    title: 'Gold kommt aus dem All',
    content: 'Jedes Gramm Gold auf der Erde kam bei Meteoriten-Einschlägen zu uns. Dein Schmuck ist literally Sternenstaub. ✨💍',
    quiz: { question: 'Woher kommt das Gold der Erde?', options: ['Vom Kern', 'Aus dem All (Meteoriten)', 'Aus Pflanzen', 'Selbst erschaffen'], correct: 1, type: 'mc' as const },
  },
  {
    id: '24',
    category: 'Kultur',
    title: 'Mona Lisa hat keine Augenbrauen',
    content: 'Leonardo hat sie wohl weggemalt oder sie sind verblasst. Trotzdem tuff, wie sie alle anstarrt. 🎨👀',
    quiz: { question: 'Was fehlt der Mona Lisa im Gesicht?', options: ['Die Nase', 'Augenbrauen', 'Der Mund', 'Ohren'], correct: 1, type: 'mc' as const },
  },
  {
    id: '25',
    category: 'Physik',
    title: 'Zeit vergeht anders',
    content: 'Auf dem Mount Everest vergeht die Zeit schneller als am Strand. Relativität, Bro. Einstein wusste Bescheid. ⏰🏔️',
    quiz: { question: 'Wer erfand die Relativitätstheorie?', options: ['Newton', 'Einstein', 'Fynix', 'Tesla'], correct: 1, type: 'mc' as const },
  },
  {
    id: '26',
    category: 'Tiere',
    title: 'Pferde schlafen im Stehen',
    content: 'Die rasten ihre Beine ein und pennen einfach weg. Stell dir vor du müsstest so in der S-Bahn pennen. 🐴💤',
    quiz: { question: 'Wie schlafen Pferde meistens?', options: ['Liegend', 'Im Sitzen', 'Im Stehen', 'Gar nicht'], correct: 2, type: 'mc' as const },
  },
  {
    id: '27',
    category: 'Geo',
    title: 'Pazifik ist riesig',
    content: 'Der Pazifische Ozean ist größer als alle Landmassen der Erde zusammen. Wir leben auf einer Wasserwelt, fr. 🌊🌍',
    quiz: { question: 'Welcher Ozean ist der größte?', options: ['Atlantik', 'Indik', 'Pazifik', 'Eismeer'], correct: 2, type: 'mc' as const },
  },
  {
    id: '28',
    category: 'Chemie',
    title: 'Sauerstoff ist giftig (high dose)',
    content: 'Zu viel O₂ killt deine Zellen. Wir atmen also ein Gift in genau der richtigen Dosis. Wild, oder? 🧪💨',
    quiz: { question: 'Was passiert bei 100% reinem Sauerstoff über lange Zeit?', options: ['Man wird Superman', 'Lungen-Schäden', 'Man schläft ein', 'Nichts'], correct: 1, type: 'mc' as const },
  },
  {
    id: '29',
    category: 'History',
    title: 'Pyramiden waren weiß',
    content: 'Früher glänzten sie weiß mit Kalkstein und hatten Goldspitzen. Heute sind sie eher "Vintage". 🇪🇬✨',
    quiz: { question: 'Welche Farbe hatten die Pyramiden ursprünglich?', options: ['Rot', 'Weiß', 'Blau', 'Schwarz'], correct: 1, type: 'mc' as const },
  },
  {
    id: '30',
    category: 'Internet',
    title: 'Erste Website noch online',
    content: 'CERN hat 1991 die erste Website gelauncht. Kein CSS, kein JavaScript, einfach nur Text. Tuff Retro-Vibes. 🌐💾',
    quiz: { question: 'Wann ging die erste Website online?', options: ['1980', '1991', '1995', '2000'], correct: 1, type: 'mc' as const },
  },
  {
    id: '31',
    category: 'Bio',
    title: 'Deine Haut erneuert sich',
    content: 'Jeden Monat hast du quasi eine komplett neue Hülle. Du bist also ständig am Respawnen. 🧖‍♂️✨',
    quiz: { question: 'Wie oft erneuert sich die Haut komplett?', options: ['Alle 28 Tage', 'Jedes Jahr', 'Alle 7 Jahre', 'Nie'], correct: 0, type: 'mc' as const },
  },
  {
    id: '32',
    category: 'Science',
    title: 'Bananen sind Beeren',
    content: 'Botanisch gesehen sind Bananen Beeren, aber Erdbeeren nicht. Die Wissenschaft trollt uns mal wieder. 🍌🍓',
    quiz: { question: 'Ist die Banane eine Beere?', options: ['Ja', 'Nein', 'Nur gelbe', 'Nur grüne'], correct: 0, type: 'mc' as const },
  },
  {
    id: '33',
    category: 'Weltall',
    title: 'Ein Tag auf Venus ist lang',
    content: 'Venus dreht sich so langsam, dass ein Tag dort länger dauert als ein ganzes Jahr. Zeitmanagement = 0. ♀️🪐',
    quiz: { question: 'Wo dauert ein Tag länger als ein Jahr?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], correct: 2, type: 'mc' as const },
  },
  {
    id: '34',
    category: 'Mathe',
    title: 'Null wurde erst spät erfunden',
    content: 'Die Römer hatten keine Null. Rechnen war damals purer Pain. Danke an die indischen Mathematiker für diesen Life-Hack! 0️⃣🔥',
    quiz: { question: 'Hatten die Römer eine Ziffer für Null?', options: ['Ja', 'Nein', 'Nur in Geheimschrift', 'Nur beim Zählen'], correct: 1, type: 'mc' as const },
  },
  {
    id: '35',
    category: 'Tiere',
    title: 'Ameisen schlafen nie richtig',
    content: 'Die machen hunderte Powernaps am Tag, aber pennen nie 8 Stunden durch. Ultimatver Hustle-Modus. 🐜📉',
    quiz: { question: 'Wie schlafen Ameisen?', options: ['8 Stunden', 'Gar nicht', 'Viele kurze Naps', 'Nur im Winter'], correct: 2, type: 'mc' as const },
  },
  {
    id: '36',
    category: 'Musik',
    title: 'Vinyl kommt zurück',
    content: 'Trotz Spotify kaufen Leute wieder Schallplatten. Analoger Vibe ist einfach tuff. 🎻💿',
    quiz: { question: 'Was ist ein "analoger" Tonträger?', options: ['MP3', 'Schallplatte', 'Stream', 'WAV'], correct: 1, type: 'mc' as const },
  },
  {
    id: '37',
    category: 'Sprache',
    title: 'Oxford ist älter als die Azteken',
    content: 'An der Uni wurde schon unterrichtet, bevor das Azteken-Reich überhaupt gegründet wurde. Old-School-Level: Unendlich. 🎓🏰',
    quiz: { question: 'Was ist älter?', options: ['Azteken-Reich', 'Uni Oxford', 'Der Buchdruck', 'Das Internet'], correct: 1, type: 'mc' as const },
  },
  {
    id: '38',
    category: 'Tech',
    title: 'Google hieß fast "Backrub"',
    content: 'Stell dir vor du sagst "Ich backrub das mal kurz". Zum Glück haben sie es geändert. Wild. 🔍🤏',
    quiz: { question: 'Wie hieß Google am Anfang?', options: ['Searchy', 'Backrub', 'FindIt', 'PageRank'], correct: 1, type: 'mc' as const },
  },
  {
    id: '39',
    category: 'Bio',
    title: 'Fingerabdrücke von Koalas',
    content: 'Die sehen menschlichen Abdrücken so ähnlich, dass die Polizei sie manchmal verwechselt. Koala-Crime-Scene, fr! 🐨🛑',
    quiz: { question: 'Welches Tier hat menschähnliche Fingerabdrücke?', options: ['Affe', 'Koala', 'Hund', 'Katze'], correct: 1, type: 'mc' as const },
  },
  {
    id: '40',
    category: 'Physik',
    title: 'Du berührst nie wirklich etwas',
    content: 'Atome stoßen sich ab. Wenn du sitzt, schwebst du eigentlich auf einem Kraftfeld. Du bist Magneto, Bro. ⚛️💺',
    quiz: { question: 'Warum "berühren" wir uns nicht wirklich?', options: ['Zu schnell', 'Atomare Abstoßung', 'Luft dazwischen', 'Einbildung'], correct: 1, type: 'mc' as const },
  },
  {
    id: '41',
    category: 'Food',
    title: 'Ketchup war Medizin',
    content: '1834 wurde Ketchup gegen Durchfall verkauft. Heute ist es nur noch für Pommes tuff. 🍅💊',
    quiz: { question: 'Was war Ketchup im 19. Jhd?', options: ['Farbe', 'Medizin', 'Getränk', 'Gift'], correct: 1, type: 'mc' as const },
  },
  {
    id: '42',
    category: 'History',
    title: 'Napoleon war gar nicht so klein',
    content: 'Er war 1,68m – Durchschnitt damals. Der "kleine General" war wohl eher britisches Roast-Level 5 Propaganda. 🇫🇷🤏',
    quiz: { question: 'War Napoleon extrem klein?', options: ['Ja', 'Nein', 'Nur seine Beine', 'Er war ein Riese'], correct: 1, type: 'mc' as const },
  },
  {
    id: '43',
    category: 'Weltall',
    title: 'Diamanten-Regen',
    content: 'Auf Neptun und Saturn regnet es literally Diamanten. Schmuck-Vibes aus den Wolken. 💎☁️',
    quiz: { question: 'Wo regnet es Diamanten?', options: ['Mars', 'Neptun', 'Mond', 'Merkur'], correct: 1, type: 'mc' as const },
  },
  {
    id: '44',
    category: 'Tiere',
    title: 'Kühe haben Besties',
    content: 'Kühe sind traurig, wenn sie von ihrem besten Freund getrennt werden. Emotionale Rinder, tuff AF. 🐄❤️',
    quiz: { question: 'Haben Kühe beste Freunde?', options: ['Ja', 'Nein', 'Nur Bullen', 'Nur Kälber'], correct: 0, type: 'mc' as const },
  },
  {
    id: '45',
    category: 'Internet',
    title: 'Erstes YouTube Video',
    content: '2005: "Me at the zoo". Ein Typ vor Elefanten. Heute: 4 Billionen Views pro Tag. Grind started at the zoo. 🐘🎥',
    quiz: { question: 'Was war im ersten YouTube Video zu sehen?', options: ['Ein Auto', 'Ein Zoo', 'Ein Spiel', 'Ein Song'], correct: 1, type: 'mc' as const },
  },
  {
    id: '46',
    category: 'Bio',
    title: 'Wale singen Charts',
    content: 'Buckelwale lernen Songs voneinander und verbreiten sie im Ozean. Quasi Billboard Charts unter Wasser. 🐋🎶',
    quiz: { question: 'Singen Wale?', options: ['Ja', 'Nein', 'Nur wenn sie essen', 'Nur im Chor'], correct: 0, type: 'mc' as const },
  },
  {
    id: '47',
    category: 'History',
    title: 'Kein Klopapier im alten Rom',
    content: 'Die nutzten einen Schwamm an einem Stock. Den haben sich alle geteilt. Keine Hygiene, fr. 🧽🤮',
    quiz: { question: 'Was nutzten die Römer im Bad?', options: ['Papyrus', 'Einen Gemeinschafts-Schwamm', 'Blätter', 'Nichts'], correct: 1, type: 'mc' as const },
  },
  {
    id: '48',
    category: 'Tech',
    title: 'Siri hieß fast anders',
    content: 'Apple hat den Namen einfach gekauft. Siri heißt auf Norwegisch "schöne Siegerin". Tuff Flex von Apple. 🍎🎙️',
    quiz: { question: 'Was bedeutet Siri?', options: ['KI', 'Schöne Siegerin', 'Apfel', 'Stimme'], correct: 1, type: 'mc' as const },
  },
  {
    id: '49',
    category: 'Weltall',
    title: 'Sonnenuntergang auf Mars ist blau',
    content: 'Wegen dem Staub sieht die Sonne dort blau-weißlich aus beim Untergehen. Alien-Vibes pur. 🔴🏙️',
    quiz: { question: 'Welche Farbe hat der Mars-Sonnenuntergang?', options: ['Rot', 'Blau', 'Grün', 'Gelb'], correct: 1, type: 'mc' as const },
  },
  {
    id: '50',
    category: 'Fynix',
    title: 'Ich bin unschlagbar',
    content: 'Ich hab 847 Jahre Wissen und seh immer noch fresh aus. Du bist jetzt bei Item 50 angekommen. Respekt, Bro! 🔥🐉',
    quiz: { question: 'Wie alt ist Fynix?', options: ['100', '847', '500', 'Ewig'], correct: 1, type: 'mc' as const },
  },
];

// Roast Messages
export const ROASTS = {
  mild: [
    'Naja, knapp daneben ist auch vorbei 😅',
    'Fast! Aber fast zählt nur beim Hufeisen werfen 🐴',
    'Nicht schlimm, nächstes Mal klappt\'s! 💪',
  ],
  medium: [
    'Bruh... das war nicht dein bester Moment 💀',
    'Hast du geraten? Sei ehrlich 😤',
    'Mein Hamster hätte das gewusst 🐹',
  ],
  hard: [
    'Alter... ich bin sprachlos. Und das will was heißen 💀💀',
    'Hast du die Karte überhaupt gelesen?! 🤡',
    'Ich glaub du brauchst erstmal \'ne Pause... von allem 😭',
  ],
};
