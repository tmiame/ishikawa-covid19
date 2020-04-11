/**
 * 感染者の状況(一日・週間・累計)
 */

import React from 'react';
import moment, { Moment } from 'moment';
import containerStyles from '@/styles/modules/container.module.scss';
import styles from './index.module.scss';
import { getCases, getBetweenCases, getCaseDataLastUpdateTime } from '@/plugins/caseData';

const diffLabel = (date: Moment = moment()) => {
  const today = moment().set({ hour: 23, minute: 59 });
  const update = moment(date).set({ hour: 23, minute: 59 });
  const diffDays = today.diff(date, 'days');

  if (diffDays === 0) {
    return '今日';
  } else if (diffDays === 1) {
    return '昨日';
  } else if (diffDays === 2) {
    return '一昨日';
  }

  return update.format('M月D日(ddd)');
};

const DailyCases: React.FC<{ className: string }> = ({ className = '' }) => {
  const updateTime = getCaseDataLastUpdateTime();
  const todayCases = getCases(updateTime);
  const yesterdayCases = getCases(moment(updateTime).subtract(1, 'day'));
  const weekCases = getBetweenCases(moment(updateTime).subtract(6, 'day'), updateTime);
  const allCases = getCases();

  return (
    <div className={`${className} ${containerStyles.container}`}>
      <div className={`${containerStyles.containerInner}`}>
        <div className={styles.heading}>
          <span>{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`} </span>
          <p className="body-xsmall">※各項目に更新日がないものは上記の更新時時点のデータ</p>
          <p className="body-xsmall">※感染日は陽性判定日基準</p>
        </div>
        <div className={styles.cardList}>
          <div className={styles.card}>
            <h3 className={styles.title}>{diffLabel(updateTime)}の感染者</h3>
            <p className={`${styles.number} ${styles.numberIs01}`}>
              {todayCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>{diffLabel(updateTime.subtract(1, 'day'))}の感染者</h3>
            <p className={styles.number}>
              {yesterdayCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>過去7日間の感染者</h3>
            <p className={styles.number}>
              {weekCases.length}
              <span>人</span>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.title}>累計感染者</h3>
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
