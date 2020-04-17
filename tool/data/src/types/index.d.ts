export interface ConditionList {
  date: string;
  total: number;
  hospitalized: number;
  discharged: number;
  dead: number;
  list: {
    name: string;
    total: number;
    hospitalized: number;
    discharged: number;
  }[];
}

export interface ConditionContent {
  lastUpdateDateTime: string;
  items: ConditionList[];
}

export interface CaseContent {
  lastUpdateDateTime: string;
  items: CaseItem[];
}
export interface CaseItem {
  id: number;
  date: string;
  dateTestPositive?: string;
  note: string[];
  age?: number;
  gender?: number;
  city?: string;
  job?: string;
  symptoms: { type: string; text: string }[];
  contactRelation?: { id: number; text: string }[];
}
