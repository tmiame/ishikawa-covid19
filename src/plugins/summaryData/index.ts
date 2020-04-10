import moment, { Moment } from 'moment';
import summaryData from '@/data/summary';

export function getLastSummary(): {
  date: string;
  hospitalized: number;
  discharged: number;
} {
  return summaryData[summaryData.length - 1];
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
