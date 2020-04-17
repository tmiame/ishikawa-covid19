/**
 * 感染者の状況(一日・週間・累計)
 */

import React, { useMemo } from 'react';
import moment from 'moment';
import styles from './index.module.scss';
import { getCases, getBetweenCases, getCasesLatestDateTime } from '@/plugins/caseData';
import dateFromNowLabel from '@/utils/dateFromNowLabel';

const DailyCases: React.FC<{ className: string }> = ({ className = '' }) => {
  const updateTime = useMemo(() => getCasesLatestDateTime(), []);
  const todayCases = useMemo(() => getCases(updateTime), [updateTime]);
  const yesterdayCases = useMemo(() => getCases(moment(updateTime).subtract(1, 'day')), [updateTime]);
  const weekCases = useMemo(() => getBetweenCases(moment(updateTime).subtract(6, 'day'), updateTime), [updateTime]);
  const allCases = useMemo(() => getCases(), []);

  return (
    <div className={className}>
      <div className={styles.cardList}>
        <div className={styles.card}>
          <h3 className={styles.title}>死亡者</h3>
          <p className={`${styles.number} ${styles.numberIsDead}`}>
            4<span>人</span>
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>{dateFromNowLabel(updateTime)}の感染者</h3>
          <p className={`${styles.number} ${styles.numberIs01}`}>
            {todayCases.length}
            <span>人</span>
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>{dateFromNowLabel(updateTime.subtract(1, 'day'))}の感染者</h3>
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
  );
};

export default DailyCases;
