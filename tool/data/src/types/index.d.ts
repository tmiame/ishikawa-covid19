export interface ConditionList {
  date: string;
  total: number;
  hospitalized: number;
  discharged: number;
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
