/**
 * 検査陽性者の状況のカード
 */

import moment from 'moment';
import styles from './index.module.scss';
import { getCases, getCaseDataLastUpdateTime } from '@/plugins/useCityCases';
import { city, CityItemType } from '@/constants/city';

moment.locale('ja');

const DailyCases = (): JSX.Element => {
  const updateTime = getCaseDataLastUpdateTime();
  const allCases = getCases();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.heading}>
          <span>{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`}</span>
        </div>
        <div className={styles.dataList}>
          {allCases.map((item) => {
            return (
              <div className={styles.dataList_item} key={item.id}>
                <header className={styles.dataList_item_header}>
                  <div className={styles.dataList_item_city}>
                    <span className="u-sr-only">居住地</span>
                    {city[item.city].name}
                  </div>
                  <div className={styles.dataList_item_date}>
                    <span className="u-sr-only">公表日</span>
                    {moment(item.date).format('MM/DD')}
                  </div>
                </header>
                <h3 className={styles.dataList_item_name}>
                  <strong>{item.age}</strong>代 {item.gender === 2 ? '女' : '男'}
                </h3>
                <div className={styles.dataList_item_id}>{item.id}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyCases;
