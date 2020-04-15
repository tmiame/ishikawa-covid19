import moment, { Moment } from 'moment';
import conditionData from '@/data/condition.json';

export function getLastSummary() {
  return conditionData.items[0];
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
