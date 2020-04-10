/**
 * 検査陽性者の状況のカード
 */

import React from 'react';
import moment from 'moment';
import styles from './index.module.scss';
import { getCases, getBetweenCases, getCaseDataLastUpdateTime } from '@/plugins/useCityCases';

const DailyCases = (): JSX.Element => {
  moment.locale('fr');

  const updateTime = getCaseDataLastUpdateTime();
  const todayCases = getCases(updateTime);
  const yesterdayCases = getCases(moment(updateTime).subtract(1, 'day'));
  const weekCases = getBetweenCases(moment(updateTime).subtract(6, 'day'), updateTime);
  const allCases = getCases();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.heading}>
          <span>{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`} </span>
          <p className="body-xsmall">※各項目に更新日がないものは上記の更新時時点のデータ</p>
        </div>
        <div className={styles.cardList}>
          <div className={styles.card}>
            <h3 className={styles.title}>本日の陽性者数</h3>
            <p className={`${styles.number} ${styles.numberIs01}`}>
              {todayCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>前日の陽性者数</h3>
            <p className={styles.number}>
              {yesterdayCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>過去7日間の陽性者数</h3>
            <p className={styles.number}>
              {weekCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>累計陽性者数</h3>
            <p className={`${styles.number} ${styles.numberIs04}`}>
              {allCases.length}
              <span>人</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCases;
