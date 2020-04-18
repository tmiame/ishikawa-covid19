import moment, { Moment } from 'moment';
import conditionData from '@/data/condition.json';

export function getLastConditionItem() {
  return conditionData.items[0];
}

export function getLastUpdateTime(): Moment {
  return moment(getLastConditionItem().date);
}
