/* MISA Esports - Static Data */

const MISA_DATA = {
  team: {
    name: "MISA Esports",
    shortName: "MISA",
    officialSite: "https://misaesports.com",
    youtube: "https://www.youtube.com/@MisaEsportsOfficial",
    discord: "#",
    twitter: "#",
    // To update the featured YouTube video:
    // 1. Go to the MISA Esports YouTube channel
    // 2. Open the latest video
    // 3. Copy the video ID from the URL (the part after v=)
    // 4. Paste it here
    latestVideoId: "LY7qmqK7XMs"
  },

  branches: {
    lol: {
      name: "League of Legends",
      shortName: "LoL",
      icon: "sports_esports",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      gameLogo: "assets/images/lol-logo.png",
      tagline: "Dominating the Rift since Day One",
      roster: [
        { tag: "ShadowKing", name: "Ahmet Y.", role: "Top", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjm7ffKtD2n5KBrhvbLcIEppFAJ0GS3QlubkZjXX_Dakge3bFLsGqC9Dta_vgCMf055E5z1b4ZXQwz58T4hopcPtEBsML049YfjpTZoGqRuGEnL_5Kz-QziCGxV4OQZXuLHhGSOkvQ5dr082oNm_PuOeDj3UxM3jPSYfniIVano4Ii9PrGcySINwfSsCbRPkWjwNdX-vk_NIhQE-2mpsdtM0lcCyrJJbVNT4gcd72xclVqtDQ1QpF6g-fMA_kdTiBBWJRoAh3RqQ" },
        { tag: "JungleWrath", name: "Mehmet K.", role: "Jungle", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAThZXCl9sSmU5h31XmJG4C5YDufed_r917ojrvMzTfbSEP57bstC8F7mQrkgnmFWXaffAEuD9o7-ZunNFGot846_z7Jw_ZEniI_5DbAmTwtdG0fVIlKu_g2hGMhYdGtJ3EbxPw3iLof41rek4yB-XUboRwyilBgsN36F_UaoMyCsD4gDNuQiW4YnzcsqWZoq3pf_O9-8eYuzpDy2SsOGxB88PAJF91Bt1YalbtLsC92XQmg3rAw5dg3OA7-lR2oKQPwW3Fs9kPLJw" },
        { tag: "MidStorm", name: "Can B.", role: "Mid", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPB2AEYR1shpcIcCA8GrHckwt2ecvNTUX-Wk1KzzryJsqLw6vPz89jn2s9mVmCO5KLnHQOYKiVMBvCVIU4VfzE9yLQKqQKTS5q6bOYoasHQOXDL2jOwOCjdD3aM0hqY2gP5ciw3IpMUIKdA8-9sHQVD51Y-L-BtAp6x7SfuOcQFCArMPddeBP76wo7cLB27akqiY1_yaPD0R5m5FubCjQoWieCvBNV0l7lOtAS8yI7s_1PmjJdI8Uz_JrEgkM_57e8pwQKAr1BYDU" },
        { tag: "CarryMisa", name: "Emre T.", role: "ADC", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRoCozUVDcSkEhTqHV3wjq8RgW7gbEO1YnV89V103tS76u6uwqE63gQxzeIo5ja9pQL53-hbORZyE7hVXlhRyJiPLyny4VA2OyY9smo-n6iKDpFshqjPd612K1TPZSvc_694Gsjm45PCw6jVSo3s4MMR_YBhvnIAxd84gGal8fSMoNvf-BZCL34_nuoSWxpE1AilKcMqJBmLQxRTGaAumTiGJBw4L4x572dULOXmHtlcMnllEQxTERWi-oRyUiKl29i9nxfSqsSCU" },
        { tag: "GuardianX", name: "Burak S.", role: "Support", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWrj-3gQ2Tw1xpWxqTQNHeSuuFmnog5xldpsFdzNJT3BD6U4Jq8TgszntgnkSPtUIWOPCbVjtdzzAEGYbWc8a87jafGZrJ1ySeTFY3kFVlH3ekDiV2JrwDHSV1-NiBOZlM7y8q0ktGa2D00OVOBK5q-BaqM6AwU5TmLObwl2glAn8pURy7KnOEk3L9XUPCBfwl5C9Gx1u7px3TTRarQGEVcJOj7tLVdiZNlKVetuU-fssT8-AV-YbMrYw5Awi6PJ1kUXU3bsllnJ0" }
      ],
      standings: {
        leagueName: "TCL 2026 Spring",
        table: [
          { pos: 1, team: "Galatasaray Esports", w: 12, l: 2, isMisa: false },
          { pos: 2, team: "Besiktas Esports", w: 10, l: 4, isMisa: false },
          { pos: 3, team: "MISA Esports", w: 9, l: 5, isMisa: true },
          { pos: 4, team: "Papara SuperMassive", w: 8, l: 6, isMisa: false },
          { pos: 5, team: "Dark Passage", w: 7, l: 7, isMisa: false },
          { pos: 6, team: "Team Aurora", w: 5, l: 9, isMisa: false }
        ]
      }
    },
    cs2: {
      name: "Counter-Strike 2",
      shortName: "CS2",
      icon: "military_tech",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
      gameLogo: "assets/images/cs2-logo.png",
      tagline: "Precision. Discipline. Victory.",
      roster: [
        { tag: "AimLock", name: "Kerem D.", role: "AWPer", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjm7ffKtD2n5KBrhvbLcIEppFAJ0GS3QlubkZjXX_Dakge3bFLsGqC9Dta_vgCMf055E5z1b4ZXQwz58T4hopcPtEBsML049YfjpTZoGqRuGEnL_5Kz-QziCGxV4OQZXuLHhGSOkvQ5dr082oNm_PuOeDj3UxM3jPSYfniIVano4Ii9PrGcySINwfSsCbRPkWjwNdX-vk_NIhQE-2mpsdtM0lcCyrJJbVNT4gcd72xclVqtDQ1QpF6g-fMA_kdTiBBWJRoAh3RqQ" },
        { tag: "EntryX", name: "Murat A.", role: "Entry Fragger", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAThZXCl9sSmU5h31XmJG4C5YDufed_r917ojrvMzTfbSEP57bstC8F7mQrkgnmFWXaffAEuD9o7-ZunNFGot846_z7Jw_ZEniI_5DbAmTwtdG0fVIlKu_g2hGMhYdGtJ3EbxPw3iLof41rek4yB-XUboRwyilBgsN36F_UaoMyCsD4gDNuQiW4YnzcsqWZoq3pf_O9-8eYuzpDy2SsOGxB88PAJF91Bt1YalbtLsC92XQmg3rAw5dg3OA7-lR2oKQPwW3Fs9kPLJw" },
        { tag: "Smoke", name: "Ali R.", role: "IGL / Support", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPB2AEYR1shpcIcCA8GrHckwt2ecvNTUX-Wk1KzzryJsqLw6vPz89jn2s9mVmCO5KLnHQOYKiVMBvCVIU4VfzE9yLQKqQKTS5q6bOYoasHQOXDL2jOwOCjdD3aM0hqY2gP5ciw3IpMUIKdA8-9sHQVD51Y-L-BtAp6x7SfuOcQFCArMPddeBP76wo7cLB27akqiY1_yaPD0R5m5FubCjQoWieCvBNV0l7lOtAS8yI7s_1PmjJdI8Uz_JrEgkM_57e8pwQKAr1BYDU" },
        { tag: "Clutch", name: "Ozan K.", role: "Lurker", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRoCozUVDcSkEhTqHV3wjq8RgW7gbEO1YnV89V103tS76u6uwqE63gQxzeIo5ja9pQL53-hbORZyE7hVXlhRyJiPLyny4VA2OyY9smo-n6iKDpFshqjPd612K1TPZSvc_694Gsjm45PCw6jVSo3s4MMR_YBhvnIAxd84gGal8fSMoNvf-BZCL34_nuoSWxpE1AilKcMqJBmLQxRTGaAumTiGJBw4L4x572dULOXmHtlcMnllEQxTERWi-oRyUiKl29i9nxfSqsSCU" },
        { tag: "Flash", name: "Yusuf E.", role: "Rifler", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWrj-3gQ2Tw1xpWxqTQNHeSuuFmnog5xldpsFdzNJT3BD6U4Jq8TgszntgnkSPtUIWOPCbVjtdzzAEGYbWc8a87jafGZrJ1ySeTFY3kFVlH3ekDiV2JrwDHSV1-NiBOZlM7y8q0ktGa2D00OVOBK5q-BaqM6AwU5TmLObwl2glAn8pURy7KnOEk3L9XUPCBfwl5C9Gx1u7px3TTRarQGEVcJOj7tLVdiZNlKVetuU-fssT8-AV-YbMrYw5Awi6PJ1kUXU3bsllnJ0" }
      ],
      standings: {
        leagueName: "ESL Pro League 2026",
        table: [
          { pos: 1, team: "NAVI", w: 14, l: 2, isMisa: false },
          { pos: 2, team: "FaZe Clan", w: 12, l: 4, isMisa: false },
          { pos: 3, team: "Vitality", w: 11, l: 5, isMisa: false },
          { pos: 4, team: "MISA Esports", w: 10, l: 6, isMisa: true },
          { pos: 5, team: "G2 Esports", w: 9, l: 7, isMisa: false },
          { pos: 6, team: "Cloud9", w: 7, l: 9, isMisa: false }
        ]
      }
    },
    valorant: {
      name: "Valorant",
      shortName: "VAL",
      icon: "shield",
      image: "https://images.unsplash.com/photo-1633545495735-faaef1a1e6e4?w=800&q=80",
      gameLogo: "assets/images/valorant-logo.png",
      tagline: "Tactical Excellence in Every Round",
      roster: [
        { tag: "Phantom", name: "Arda M.", role: "Duelist / IGL", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjm7ffKtD2n5KBrhvbLcIEppFAJ0GS3QlubkZjXX_Dakge3bFLsGqC9Dta_vgCMf055E5z1b4ZXQwz58T4hopcPtEBsML049YfjpTZoGqRuGEnL_5Kz-QziCGxV4OQZXuLHhGSOkvQ5dr082oNm_PuOeDj3UxM3jPSYfniIVano4Ii9PrGcySINwfSsCbRPkWjwNdX-vk_NIhQE-2mpsdtM0lcCyrJJbVNT4gcd72xclVqtDQ1QpF6g-fMA_kdTiBBWJRoAh3RqQ" },
        { tag: "Viper", name: "Deniz C.", role: "Initiator", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAThZXCl9sSmU5h31XmJG4C5YDufed_r917ojrvMzTfbSEP57bstC8F7mQrkgnmFWXaffAEuD9o7-ZunNFGot846_z7Jw_ZEniI_5DbAmTwtdG0fVIlKu_g2hGMhYdGtJ3EbxPw3iLof41rek4yB-XUboRwyilBgsN36F_UaoMyCsD4gDNuQiW4YnzcsqWZoq3pf_O9-8eYuzpDy2SsOGxB88PAJF91Bt1YalbtLsC92XQmg3rAw5dg3OA7-lR2oKQPwW3Fs9kPLJw" },
        { tag: "Sage", name: "Berk O.", role: "Sentinel", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPB2AEYR1shpcIcCA8GrHckwt2ecvNTUX-Wk1KzzryJsqLw6vPz89jn2s9mVmCO5KLnHQOYKiVMBvCVIU4VfzE9yLQKqQKTS5q6bOYoasHQOXDL2jOwOCjdD3aM0hqY2gP5ciw3IpMUIKdA8-9sHQVD51Y-L-BtAp6x7SfuOcQFCArMPddeBP76wo7cLB27akqiY1_yaPD0R5m5FubCjQoWieCvBNV0l7lOtAS8yI7s_1PmjJdI8Uz_JrEgkM_57e8pwQKAr1BYDU" },
        { tag: "Omen", name: "Kaan G.", role: "Controller", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRoCozUVDcSkEhTqHV3wjq8RgW7gbEO1YnV89V103tS76u6uwqE63gQxzeIo5ja9pQL53-hbORZyE7hVXlhRyJiPLyny4VA2OyY9smo-n6iKDpFshqjPd612K1TPZSvc_694Gsjm45PCw6jVSo3s4MMR_YBhvnIAxd84gGal8fSMoNvf-BZCL34_nuoSWxpE1AilKcMqJBmLQxRTGaAumTiGJBw4L4x572dULOXmHtlcMnllEQxTERWi-oRyUiKl29i9nxfSqsSCU" },
        { tag: "Reyna", name: "Tolga P.", role: "Flex", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWrj-3gQ2Tw1xpWxqTQNHeSuuFmnog5xldpsFdzNJT3BD6U4Jq8TgszntgnkSPtUIWOPCbVjtdzzAEGYbWc8a87jafGZrJ1ySeTFY3kFVlH3ekDiV2JrwDHSV1-NiBOZlM7y8q0ktGa2D00OVOBK5q-BaqM6AwU5TmLObwl2glAn8pURy7KnOEk3L9XUPCBfwl5C9Gx1u7px3TTRarQGEVcJOj7tLVdiZNlKVetuU-fssT8-AV-YbMrYw5Awi6PJ1kUXU3bsllnJ0" }
      ],
      standings: {
        leagueName: "VCT EMEA 2026",
        table: [
          { pos: 1, team: "Fnatic", w: 11, l: 3, isMisa: false },
          { pos: 2, team: "Team Heretics", w: 10, l: 4, isMisa: false },
          { pos: 3, team: "MISA Esports", w: 9, l: 5, isMisa: true },
          { pos: 4, team: "Team Vitality", w: 8, l: 6, isMisa: false },
          { pos: 5, team: "Karmine Corp", w: 7, l: 7, isMisa: false },
          { pos: 6, team: "BBL Esports", w: 5, l: 9, isMisa: false }
        ]
      }
    }
  },

  matches: {
    upcoming: [],
    recent: []
  },

  news: [
    {
      title: "MISA ESPORTS SECURES PLAYOFF SPOT IN TCL SPRING",
      category: "LEAGUE OF LEGENDS",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxg6wZmCfMAXdbJBg-6q4IMeYoNAdOLbjq4vkFpgq6t9bwlr2HQBFRrnEH6OWr8eyupTok3eHkCx6WX8zECjL-jC8AIElFA3o3inSGO0nEZeNKHjfSzTSMO4m4K1raAlaPeKKdUuDlkKAZb6QezFZkolIgZiBC1alVdKcVhfkEB2eVe9zY4zN2FyQQat0n1cGbZRLxSF0pEWiqA2-ewaz3YzBWNVIo8gAR6QqqohuDwjAaGWYg64zFvObfjroC-W_j0pCP48DLRvU",
      summary: "A dominant performance in the second half of the split secures a top-3 finish and a guaranteed playoff spot for our LoL roster.",
      date: "2026-03-24"
    },
    {
      title: "CS2 SQUAD CLIMBS TO #4 IN ESL PRO LEAGUE",
      category: "COUNTER-STRIKE",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUfM98uoEsbKqLRWgpjkMP9-_9OPkrLTGarXX46KkDHKh29w9vsqh53hj5_IbRJd2_Oqwqr6Lt9Fsbz1POwsbMY-pskZGA-rAE6r3ZUlDAK9GvXpkolzV67F47me4wQcdHVv3GeoC0djFaY58ZknTtqQRuuy5Nse8CUKpkdOEDoYCP6suxS79pAzhnu1K23I2r0xgYDMOnRfXtwrF9ybEnnO1ytzR98uo-bN7zKMYGnH1owAFdPUff-WyXuFjoPj6QpDvAeU64o5E",
      summary: "Back-to-back wins against Vitality and Cloud9 push MISA to 4th place in the global standings.",
      date: "2026-03-22"
    },
    {
      title: "MLBB ROSTER DOMINATES MPL TURKEY WITH 11-1 RECORD",
      category: "MOBILE LEGENDS",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFlC9keIzFeen0hErHUExg8bynXi9cng6RKOaswcpmjMuOhU4w4A6IYVg5rfMCpR2A81fOeZEgY_58C3Xgi0HM0u_GQ7n4TSh0eh0C1wi88DPyZCAqQE36Tf3EutKPb3oaAd1k6EtKKuabwJpzAUGoxd3Vvfh0-6irUOELIhQJb5Lvf76BZ1tSSahj0qkTIwjSD0dMPX2aZqdPTWrcLtkDPOJveTDRYJDNkIQg43Wf533PChglAo6ayrhp6IlBIgrlNcoUvhgecbY",
      summary: "Our Mobile Legends squad continues their dominant run, holding the #1 position with only a single loss this season.",
      date: "2026-03-18"
    }
  ],

  misadle: {
    words: [
      "BARON", "FLASH", "SMOKE", "COMBO", "CARRY",
      "DRAFT", "PLANT", "BOOST", "FLANK", "ROYAL",
      "SNIPE", "TOWER", "MINOR", "AEGIS", "DODGE",
      "SPAWN", "ULTED", "GANKS", "SPLIT", "SIEGE",
      "ARMOR", "BLADE", "CHARM", "DRAKE", "ELDER",
      "FEINT", "GUARD", "HYPER", "INTEL", "JUKED",
      "KNIFE", "LASER", "MACRO", "NEXUS", "ORBIT",
      "PHASE", "QUEUE", "RAVEN", "STORM", "TRADE",
      "VENOM", "WRATH", "XENON", "YIELD", "ZONES"
    ],
    validGuesses: [
      "BARON", "FLASH", "SMOKE", "COMBO", "CARRY",
      "DRAFT", "PLANT", "BOOST", "FLANK", "ROYAL",
      "SNIPE", "TOWER", "MINOR", "AEGIS", "DODGE",
      "SPAWN", "ULTED", "GANKS", "SPLIT", "SIEGE",
      "ARMOR", "BLADE", "CHARM", "DRAKE", "ELDER",
      "FEINT", "GUARD", "HYPER", "INTEL", "JUKED",
      "KNIFE", "LASER", "MACRO", "NEXUS", "ORBIT",
      "PHASE", "QUEUE", "RAVEN", "STORM", "TRADE",
      "VENOM", "WRATH", "XENON", "YIELD", "ZONES",
      "AGENT", "AWPER", "BLOCK", "CREST", "DEATH",
      "ENTRY", "FIGHT", "GREED", "HEALS", "INPUT",
      "JOLTS", "KILLS", "LEVEL", "MELEE", "NIGHT",
      "OVERS", "POWER", "QUICK", "ROUND", "SKILL",
      "TEAMS", "ULTRA", "VIGOR", "WALLS", "EXTRA",
      "YOUTH", "ZEROS", "ANGLE", "BURST", "CLASH",
      "DUELS", "ELITE", "FOCUS", "GAMES", "HONOR",
      "ITEMS", "JUMPS", "KINGS", "LANCE", "MATCH",
      "NOBLE", "OMEGA", "PRIME", "QUEST", "RANKS",
      "SCORE", "TURBO", "UNITY", "VAULT", "WINGS",
      "JUKES"
    ]
  }
};
