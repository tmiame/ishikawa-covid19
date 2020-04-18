import moment, { Moment } from 'moment';
import { CityType } from '@/constants/city';
import caseData from '@/data/list.json';
import caseMergeData from '@/data/list-custom';

/**
 * Botで取得したデータにカスタムデータを付け加える
 */
const data = caseData.items.map(
  (item): CaseItem => {
    const mergeData = caseMergeData.find((margeItem) => margeItem.id === item.id);

    if (!mergeData) {
      return item;
    }

    return {
      ...item,
      source: mergeData.source ?? undefined,
      city: mergeData.city ?? item.city,
      refs: mergeData.refs && item.refs ? [...item.refs, ...mergeData.refs] : item.refs,
      note: mergeData.note && item.note ? [...item.note, ...mergeData.note] : item.note,
    };
  },
);

/**
 * 累計の陽性者を取得
 */
export function getCityCases(city: CityType) {
  return data.filter((caseItem) => caseItem.city === city);
}

/**
 * 市町村の特定日の陽性者を取得
 */
export function getCityDayCases(city: CityType, date: Moment | null = null) {
  const targetDate = date ?? moment();

  return data.filter((caseItem) => {
    return caseItem.city === city && moment(caseItem.date).isSame(targetDate, 'day');
  });
}

/**
 * すべてもしくは特定日の陽性者を取得
 */
export function getCases(date: Moment | null = null) {
  if (!date) {
    return data;
  }
  return data.filter((caseItem) => {
    return moment(caseItem.date).isSame(moment(date), 'day');
  });
}

/**
 * 指定期間の陽性者を取得
 */
export function getBetweenCases(minDate: Moment, maxDate: Moment) {
  return data.filter((caseItem) => {
    return moment(caseItem.date).isBetween(minDate, maxDate, 'day');
  });
}

/**
 * 一番新しい感染者の感染日を取得する
 */
export function getCasesLatestDateTime(): Moment {
  const cases = getCases();
  return moment(cases[0].date);
}

/**
 * 感染者データ最終更新日を取得する
 */
export function getCaseDataLastUpdateTime(): Moment {
  return moment(caseData.lastUpdateDateTime);
}
