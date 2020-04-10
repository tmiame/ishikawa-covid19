import moment, { Moment } from 'moment';
import { CityType } from '@/constants/city';
import cases, { lastUpdateDateTime } from '@/data/list';

/**
 * 累計の陽性者を取得
 *
 * @param {CityType} city
 */
export function getCityCases(city: CityType): CaseItem[] {
  return cases.filter((caseItem: CaseItem) => caseItem.city === city);
}

/**
 * 特定の曜日の曜日の陽性者を取得
 */
export function getCityDateDayCases(city: CityType, date: Moment | null = null): CaseItem[] {
  const targetDate = !date ? moment() : moment(date);
  return cases.filter((caseItem: CaseItem) => {
    return caseItem.city === city && moment(caseItem.date).isSame(targetDate, 'day');
  });
}

/**
 * データの最終更新日
 */
export function getCaseDataLastUpdateTime(): Moment {
  return moment(lastUpdateDateTime);
}

/**
 * 特定の曜日の陽性者を取得
 */
export function getCases(date: Moment | null = null): CaseItem[] {
  if (!date) {
    return cases;
  }
  return cases.filter((caseItem: CaseItem) => {
    return moment(caseItem.date).isSame(moment(date), 'day');
  });
}

/**
 * 特定の曜日の陽性者を取得
 */
export function getBetweenCases(minDate: Moment, maxDate: Moment): CaseItem[] {
  return cases.filter((caseItem: CaseItem) => {
    return moment(caseItem.date).isBetween(minDate, maxDate, 'day');
  });
}
