import moment, { Moment } from 'moment';
import conditionData from '@/data/condition';

export function getLastSummary(): {
  date: string;
  hospitalized: number;
  discharged: number;
  all: number;
} {
  const [summary] = conditionData;
  return {
    ...summary,
    all: summary.hospitalized + summary.discharged,
  };
}

export function getLastSummaryUpdateUpdateDateTime(): Moment {
  return moment(getLastSummary().date);
}

export function getLastHospitalized(): number {
  return getLastSummary().hospitalized;
}

export function getLastDischarged(): number {
  return getLastSummary().discharged;
}