declare module '*.scss';
interface SymptomsItem {
  date: string;
  text: string;
}

interface ContactRelationItem {
  id: number;
  text: string;
}

declare module '@/data/list.json' {
  interface CaseData {
    lastUpdateDateTime: string;
    items: CaseItem[];
  }

  const data: CaseData;

  export default data;
}

interface CaseItem {
  id: number;
  date: string;
  dateTestPositive: string;
  age: number;
  gender: number;
  city:
    | 'suzu'
    | 'wajima'
    | 'noto'
    | 'anamizu'
    | 'nanao'
    | 'shika'
    | 'nakanoto'
    | 'hakui'
    | 'hodatsushimizu'
    | 'kahoku'
    | 'tsubata'
    | 'uchinada'
    | 'kanazawa'
    | 'nonoichi'
    | 'hakusan'
    | 'kawakita'
    | 'nomi'
    | 'komatsu'
    | 'kaga'
    | 'unknown'
    | 'kengai';
  note?: string;
  symptoms?: SymptomsItem[];
  contactRelation?: ContactRelationItem[];
}

declare namespace NodeJS {
  export interface Process {
    ENV: string | undefined;
  }
}
