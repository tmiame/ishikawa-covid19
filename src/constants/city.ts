export const city = {
  suzu: {
    id: 'suzu',
    name: '珠洲市',
  },
  wajima: {
    id: 'wajima',
    name: '輪島市',
  },
  noto: {
    id: 'noto',
    name: '能登町',
  },
  anamizu: {
    id: 'anamizu',
    name: '穴水町',
  },
  nanao: {
    id: 'nanao',
    name: '七尾市',
  },
  shika: {
    id: 'shika',
    name: '志賀町',
  },
  nakanoto: {
    id: 'nakanoto',
    name: '中能登町',
  },
  hakui: {
    id: 'hakui',
    name: '羽咋市',
  },
  hodatsushimizu: {
    id: 'hodatsushimizu',
    name: '宝達志水町',
  },
  kahoku: {
    id: 'kahoku',
    name: 'かほく市',
  },
  tsubata: {
    id: 'tsubata',
    name: '津幡町',
  },
  uchinada: {
    id: 'uchinada',
    name: '内灘町',
  },
  kanazawa: {
    id: 'kanazawa',
    name: '金沢市',
  },
  nonoichi: {
    id: 'nonoichi',
    name: '野々市市',
  },
  hakusan: {
    id: 'hakusan',
    name: '白山市',
  },
  kawakita: {
    id: 'kawakita',
    name: '川北町',
  },
  nomi: {
    id: 'nomi',
    name: '能美市',
  },
  komatsu: {
    id: 'komatsu',
    name: '小松市',
  },
  kaga: {
    id: 'kaga',
    name: '加賀市',
  },
  unknown: {
    nomap: true,
    id: 'unknown',
    name: '市町村不明',
  },
  kengai: {
    nomap: true,
    id: 'kengai',
    name: '県外',
  },
} as const;

export type CityType = keyof typeof city;

export type CityItemType = {
  id: CityType;
  name: string;
  nomap?: boolean;
};
