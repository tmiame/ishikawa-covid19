import newsData from '@/data/news';
import { getCaseDataLastUpdateTime } from '@/plugins/caseData';

export function getBreadkingUpdate() {
  const lastItem = newsData.find((newsItem) => newsItem.showBrekingUpdate);

  if (lastItem && getCaseDataLastUpdateTime().isBefore(lastItem.date, 'hour')) {
    return lastItem;
  }

  return null;
}
