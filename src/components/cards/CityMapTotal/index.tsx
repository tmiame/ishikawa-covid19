import React from 'react';
import moment from 'moment';
import styles from './index.module.scss';
import Map from '@/components/cards/Map';
import { getCases, getCaseDataLastUpdateTime } from '@/plugins/caseData';

type Props = {
  className?: string;
};

const DailyMap: React.FC<Props> = ({ className = '' }) => {
  const updateTime = getCaseDataLastUpdateTime();
  const allCases = getCases();
  const firstCase = allCases[allCases.length - 1];
  const firstCaseTime = firstCase.date;

  return (
    <div className={`${styles.layout} ${className}`}>
      <div className={styles.map}>
        <div className={styles.header}>
          <div className={styles.headerHeading}>
            <h2 className={styles.headerHeading_title}>全期間</h2>
            <p className={styles.headerHeading_date}>
              {`${moment(firstCaseTime).format('YYYY年M月D日(ddd)')}`} ~ {`${updateTime.format('M月D日(ddd)')}`}
            </p>
          </div>
        </div>
        <Map className={styles.mapItem} />
      </div>
    </div>
  );
};

export default DailyMap;
