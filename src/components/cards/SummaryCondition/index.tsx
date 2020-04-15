/**
 * 治療中・退院者カード
 */

import React from 'react';
import styles from './index.module.scss';
import { getLastSummaryUpdateUpdateDateTime, getLastSummary } from '@/plugins/conditionData';

const MainSummary: React.FC<{ className: string }> = ({ className = '' }) => {
  const updateTime = getLastSummaryUpdateUpdateDateTime();
  const lastSummaryData = getLastSummary();

  const styleDischarged = {
    width: `${(lastSummaryData.discharged / lastSummaryData.total) * 100}%`,
  };

  const styleHospitalized = {
    width: `${(lastSummaryData.hospitalized / lastSummaryData.total) * 100}%`,
  };

  return (
    <div className={`${styles.block} ${className}`}>
      <header className={styles.block_heading}>
        <h2 className="heading-4">感染者の状態</h2>
        <p className="body-xsmall">{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`}</p>
      </header>
      <div className={styles.hospitalized} style={styleHospitalized}>
        <div className={styles.hospitalized_heading}>
          <div className={styles.heading_title}>治療中</div>
          <div className={styles.heading_text}>
            {lastSummaryData.hospitalized}
            <small>人</small>
          </div>
        </div>
      </div>
      <div className={styles.discharged} style={styleDischarged}>
        <div className={styles.discharged_heading}>
          <div className={styles.heading_title}>退院</div>
          <div className={styles.heading_text}>
            {lastSummaryData.discharged}
            <small>人</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSummary;
