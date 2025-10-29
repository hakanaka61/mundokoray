import { MundoMatchup } from "./types";

/**
 * İsim normalize:
 *  "Cho'Gath" -> "chogath"
 *  "K'Sante"  -> "ksante"
 *  "Dr. Mundo"-> "drmundo"
 */
export function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

/**
 * Dr. Mundo için genel / fallback build.
 * Spesifik rakip datası yoksa bu kullanılacak.
 */
const BASE_DEFAULT: Omit<MundoMatchup, "enemyChampion"> = {
  myChampion: "Dr. Mundo",
  difficulty: "DENGELI",
  difficultyReason:
    "Genel plan: farmla, HP kas, uzun savaşta ölme. Anti-heal ve tank ayakkabı durumuna göre al.",
  core_items: [
    { name: "Heartsteel", why: "Uzun trade + yüksek HP scaling" },
    {
      name: "Thornmail",
      why: "Rakibin sustain / lifesteal'ını kesmek için anti-heal",
    },
    {
      name: "Spirit Visage",
      why: "Kendi iyileşmeni güçlendirir, AP'ye karşı değerli",
    },
  ],
  boots: "Plated Steelcaps / Mercury's Treads (duruma göre)",
  runes_primary: {
    tree: "Resolve",
    keystone: "Grasp of the Undying",
    minor: ["Demolish", "Second Wind", "Overgrowth"],
  },
  runes_secondary: {
    tree: "Inspiration",
    minor: ["Approach Velocity", "Magical Footwear"],
  },
  early_plan: [
    "Lane'i kule önünde dondurmaya çalış.",
    "Gereksiz all-in yapma; pasifinden value al.",
    "Dalgayı yavaş it, sustain avantajını kullan.",
  ],
};

/**
 * Mundo'nun tek tek rakiplere karşı planları.
 * difficultyReason = neden zor / rahat?
 */
const MUNDO_MATCHUPS_DATA: {
  enemy: string;
  data: Partial<MundoMatchup>;
}[] = [
  {
    enemy: "Gwen",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Gwen uzun savaşta seni eritiyor, özellikle sis (W) açıkken trade kaybedersin.",
      winrateHint: 43.5,
      core_items: [
        { name: "Heartsteel", why: "Uzun trade, HP scale" },
        {
          name: "Thornmail",
          why: "Gwen'in yüksek sustain'ini kesmek için",
        },
        {
          name: "Randuin's Omen",
          why: "Atk speed / crit kompozisyonuna karşı",
        },
      ],
      early_plan: [
        "Freeze yap. Gwen W (sis) açıkken uzun trade'e girme.",
        "Kısa Q+E takası yap, minyon altında kal.",
        "6 sonrası jungle ile kısa baskın oyna; extended fight verme.",
      ],
    },
  },
  {
    enemy: "Fiora",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Fiora %true damage ve çok iyi %heal. Senin büyük HP barını kesiyor.",
      core_items: [
        {
          name: "Bramble Vest → Thornmail",
          why: "Lifesteal ve ultiden gelen heal'ı kes",
        },
        { name: "Heartsteel", why: "Uzun savaşlarda HP kazan" },
        {
          name: "Randuin's Omen",
          why: "Crit/atak hızını düşür, yavaşlat",
        },
      ],
      early_plan: [
        "Riposte (W) baitlemeden E basma, kısa takas yap.",
        "Wave'i kule önünde dondur.",
        "Jungle çağır: Parry çıktıktan sonra all-in mümkün.",
      ],
    },
  },
  {
    enemy: "Darius",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Kan stack'lerini biriktirirse seni eritiyor. Anti-heal zorunlu.",
      core_items: [
        {
          name: "Bramble Vest → Thornmail",
          why: "Hem vurur hem iyileşir, anti-heal şart",
        },
        { name: "Heartsteel" },
        {
          name: "Randuin's Omen",
          why: "Uzun dövüşte slow + dayanıklılık",
        },
      ],
      early_plan: [
        "Stack biriktirmesine izin verme, kısa gir çık.",
        "E çekişini (Apprehend) minyon arkasıyla deny et.",
        "Ghost/Flash yoksa jungle gank ile kill çok kolay.",
      ],
    },
  },
  {
    enemy: "Jax",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Counter Strike açıkken vuramıyorsun, side lane'de seni outscale'ler.",
      core_items: [
        {
          name: "Plated Steelcaps",
          why: "AA ağırlıklı hasarı azalt",
        },
        { name: "Heartsteel" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "E (Counter Strike) açıkken trade etme.",
        "Freeze kule önünde; 6 sonrası saygı göster.",
        "Jungle CC ile zincirliyorsan skor çıkar.",
      ],
    },
  },
  {
    enemy: "Camille",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "True damage Q ikinci vuruş + mobilite = seni kesip çıkabilir.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Heartsteel" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "Hookshot (E) açılarını engelle, duvarlara çok yaklaşma.",
        "Kısa takas yap; onun pasif kalkanını boşa çıkar.",
        "Ultisine (The Hextech Ultimatum) jungle cevap versin, kaçamaz.",
      ],
    },
  },
  {
    enemy: "Aatrox",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Sürekli heal + uzun menzilli Q sweetspot. Anti-heal yoksa seni eritir.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        {
          name: "Heartsteel",
          why: "Uzun fight HP değeri",
        },
        {
          name: "Spirit Visage",
          why: "Senin heal'ını bufflar",
        },
      ],
      early_plan: [
        "Q sweetspot'tan uzak dur, kısa takas.",
        "Wave'i kule önünde tut.",
        "Anti-heal bitince çok daha rahat.",
      ],
    },
  },
  {
    enemy: "K'Sante",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "Tank vs tank. Sabırlı oynarsan sorun değil ama ultisinde seni duvarlara gömer.",
      core_items: [
        { name: "Heartsteel" },
        {
          name: "Sunfire Aegis",
          why: "Wave kontrol + AoE DPS",
        },
        { name: "Thornmail" },
      ],
      early_plan: [
        "Minyon sayısını kontrol et; çok uzun trade'e sokma.",
        "All Out ultisini say, jungle çağırarak cevapla.",
      ],
    },
  },
  {
    enemy: "Olaf",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Olaf erken oyunda deli gibi vurur ve ultide CC yemez.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Plated Steelcaps" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Çok uzun savaşma; baltayı kaçırmasını bekle.",
        "6'dan önce gank iste çünkü ultide CC işlemez.",
        "Wave'i kule önünde tut ki dive zor olsun.",
      ],
    },
  },
  {
    enemy: "Trundle",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "R ile tank statlarını çalıyor. Sen güçlendikçe o da güçleniyor.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Heartsteel" },
        {
          name: "Spirit Visage",
          why: "Senin heal değerini artırır",
        },
      ],
      early_plan: [
        "R (Subjugate) yedikten sonra geri çekil, stat çalıyor.",
        "Pillar'ı duvara yaslama; açık alanda kalma.",
        "Uzun 1v1 onun oyunu, jungle çağır.",
      ],
    },
  },
  {
    enemy: "Riven",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "Patlayıcı trade'leri var ama sen çok tanksın. Sabırlı oynarsan dayanıyorsun.",
      core_items: [
        { name: "Plated Steelcaps" },
        { name: "Heartsteel" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "Q üçleme + W stun zamanını say.",
        "Wave'i kule önünde tut, kısa takas yap.",
        "R aktifken saygı göster ama tanklığın seni kurtarır.",
      ],
    },
  },
  {
    enemy: "Irelia",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Stack toplayıp reset aldığında seni kesiyor. Yanlış pozisyon = ölüsün.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Plated Steelcaps" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "Passive stack doluyken minyona yaklaşma.",
        "E bıçaklarını yememeye çalış; dondurarak oyna.",
        "Jungle CC ile çok rahat kesilir.",
      ],
    },
  },
  {
    enemy: "Tryndamere",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "O seni kıramıyor, sen de onu zor kesiyorsun. Ultisinde ölmez, zaman kazan.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Randuin's Omen" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Fury barı doluyken sakın takasa girme.",
        "Ultisi (Undying Rage) açıkken zaman kazan, kule altına çek.",
        "Wave'i freeze ile deny et.",
      ],
    },
  },
  {
    enemy: "Quinn",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Range bully. Sürekli poke + kite, seni farmdan kesmek istiyor.",
      core_items: [
        { name: "Plated Steelcaps" },
        { name: "Heartsteel" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "Doran's Shield + Second Wind çok değerli.",
        "Freeze yap; uzun koridorda peşine koşma.",
        "Push etmeye çalışırsa jungle çağır.",
      ],
    },
  },
  {
    enemy: "Teemo",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Kör + sürekli range poke + mantar zonelama. Sinir bozucu lane.",
      core_items: [
        { name: "Mercury's Treads" },
        { name: "Spirit Visage" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Q kör ederken geri çekil.",
        "Mantarları kontrol totemiyle temizle.",
        "Wave'i kule önünde tut ki dive zor olsun.",
      ],
    },
  },
  {
    enemy: "Kennen",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "AP poke + AoE stun ultisi. Seni yavaş yavaş eritiyor, sonra all-in.",
      core_items: [
        { name: "Mercury's Treads" },
        { name: "Spirit Visage" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Poke'a karşı minyonların arkasına saklan.",
        "R (Slicing Maelstrom) yokken savaş.",
        "Wave'i hızlı itip base atmasına izin verme.",
      ],
    },
  },
  {
    enemy: "Vayne",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "%HP true damage (W) ile tankları delete'liyor. Duvara pinlenirsen bittin.",
      core_items: [
        { name: "Randuin's Omen" },
        { name: "Thornmail" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Duvara pin yememeye dikkat et.",
        "Kısa takas bile riskli; jungle baskını olmadan all-in yapma.",
        "Alan daralt, wave'i dondur.",
      ],
    },
  },
  {
    enemy: "Kog'Maw",
    data: {
      difficulty: "TEHLIKELI",
      difficultyReason:
        "Range + %HP shred DPS. Serbest vurursa erirsin.",
      core_items: [
        { name: "Randuin's Omen" },
        { name: "Thornmail" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "W açıldığında geri çekil, range çok artıyor.",
        "Jungle ile üstüne yürü, mobilitesi zayıf.",
        "Uzun koridorda koşmak yerine freeze oyna.",
      ],
    },
  },
  {
    enemy: "Yorick",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "Split push makinesi ama mobil değil. Maiden'ı kesersen nefessiz kalır.",
      core_items: [
        { name: "Heartsteel" },
        { name: "Sunfire Aegis", why: "Wave clear ve DPS için" },
        { name: "Thornmail" },
      ],
      early_plan: [
        "Mist Maiden'ı odakla; ghoul'ları Q ile temizle.",
        "Duvar (W) koyunca hızlıca kırmak için pozisyon al.",
        "Split push planına karşı wave'i iyi yönet.",
      ],
    },
  },
  {
    enemy: "Malphite",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "AP build poke'larsa can yakar ama genelde sen de tanksın o da tank.",
      core_items: [
        { name: "Heartsteel" },
        { name: "Thornmail" },
        { name: "Spirit Visage" },
      ],
      early_plan: [
        "AP Malphite ise Mercs + Visage çok iyi.",
        "R varken dalga ittirirken dikkat et.",
        "Uzun savaş yerine sabırlı oyna.",
      ],
    },
  },
  {
    enemy: "Sett",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "True damage W patlaması dışında seni çok hızlı kesemiyor.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Heartsteel" },
        { name: "Randuin's Omen" },
      ],
      early_plan: [
        "W true damage patlamasını baitle; ondan sonra tekrar gir.",
        "Minyon sayısı azsa takasa girme (Haymaker daha sert vurur).",
        "Freeze ile farm deny etmeye çalış.",
      ],
    },
  },
  {
    enemy: "Nasus",
    data: {
      difficulty: "RAHAT",
      difficultyReason:
        "Erken oyununda çok zayıf. Onun Q stack’ini yavaşlatırsan sen kazanıyorsun.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Heartsteel" },
        { name: "Sunfire Aegis" },
      ],
      early_plan: [
        "Q stack'lemesini yavaşlatmak için freeze yap.",
        "All-in zorlamak yerine minyon deny et.",
        "Wave kontrolünü bozarsa jungle çağır.",
      ],
    },
  },
  {
    enemy: "Volibear",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "All-in ve dive tehdidi var ama uzun oyunda sen daha tank oluyorsun.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Heartsteel" },
        { name: "Spirit Visage" },
      ],
      early_plan: [
        "E stun/slow alanından çık.",
        "Kule altı dive potansiyeline dikkat.",
        "Wave'i kule önünde tutmak güvenli.",
      ],
    },
  },
  {
    enemy: "Garen",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "Silence + execute var ama direkt seni eritecek burst yok.",
      core_items: [
        { name: "Bramble Vest → Thornmail" },
        { name: "Plated Steelcaps" },
        { name: "Heartsteel" },
      ],
      early_plan: [
        "Q silence sonrası hemen geri çekil.",
        "E spin hasarını minyonlarla tankla.",
        "R execute range'inde aşırı greed yapma.",
      ],
    },
  },
  {
    enemy: "Cho'Gath",
    data: {
      difficulty: "DENGELI",
      difficultyReason:
        "Yüksek HP + true damage ultisi. Sen de tanksın, o da tank.",
      core_items: [
        { name: "Heartsteel" },
        { name: "Thornmail" },
        { name: "Spirit Visage" },
      ],
      early_plan: [
        "Q knockup telegraph'ını iyi izle, sabırlı oyna.",
        "R menziline gireceğin can yüzdesine dikkat.",
        "Minyon arkası durup poke'u azalt.",
      ],
    },
  },
];

/**
 * getMundoMatchup:
 * - Enemy adıyla uyuşan özel kayıt varsa onu döndür.
 * - Yoksa BASE_DEFAULT'u enemyChampion = enemy ile birleştirip döndür.
 */
export function getMundoMatchup(enemyName: string): MundoMatchup {
  const norm = normalizeName(enemyName);

  const found = MUNDO_MATCHUPS_DATA.find(
    (m) => normalizeName(m.enemy) === norm
  );

  const base: MundoMatchup = {
    ...BASE_DEFAULT,
    enemyChampion: enemyName,
  };

  if (!found) {
    return base;
  }

  // override için spread
  return {
    ...base,
    enemyChampion: found.enemy,
    ...found.data,
  };
}
