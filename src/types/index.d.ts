declare module '*.scss';
interface SymptomsItem {
  date: string;
  text: string;
}

interface RefItem {
  id: number;
  text: string;
}

declare module '@/data/list.json' {
  interface CaseData {
    lastUpdateDateTime: string;
    items: CaseItemBot[];
  }

  const data: CaseData;

  export default data;
}

declare module '@/data/condition.json' {
  interface ConditionData {
    lastUpdateDateTime: string;
    items: ConditionItem[];
  }

  const data: ConditionData;

  export default data;
}

interface CaseItemBot {
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
  note?: string[];
  symptoms?: SymptomsItem[];
  refs?: RefItem[];
}
interface CaseItemCustom {
  id: number;
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
  note?: string[];
  refs?: RefItem[];
  source?: {
    text: string;
    url: string;
    urlTitle: string;
  }[];
}

interface CaseItem extends CaseItemBot, CaseItemCustom {}

interface ConditionItem {
  date: string;
  total: number;
  dead: number;
  hospitalized: number;
  discharged: number;
  list: ConditionDayItem[];
}

interface ConditionDayItem {
  name: string;
  total: number;
  dead: number;
  hospitalized: number;
  discharged: number;
}

declare namespace NodeJS {
  export interface Process {
    ENV: string | undefined;
  }
}
