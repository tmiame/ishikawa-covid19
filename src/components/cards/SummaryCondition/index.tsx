/**
 * 治療・死者・退院者の状態カード
 */

import React from 'react';
import styles from './index.module.scss';
import { getLastSummaryUpdateUpdateDateTime, getLastSummary } from '@/plugins/conditionData';

const MainSummary: React.FC<{ className: string }> = ({ className = '' }) => {
  const updateTime = getLastSummaryUpdateUpdateDateTime();
  const latestData = getLastSummary();

  const styleDischarged = {
    width: `${(latestData.discharged / latestData.total) * 100}%`,
  };

  const styleDead = {
    right: `${(latestData.discharged / latestData.total) * 100}%`,
    width: `${(latestData.dead / latestData.total) * 100}%`,
  };

  const styleHospitalized = {
    width: `${(latestData.hospitalized / latestData.total) * 100}%`,
  };

  return (
    <div className={`${styles.block} ${className}`}>
      <header className={styles.block_heading}>
        <h2 className="heading-4">感染者の状態</h2>
        <p className="body-xsmall">{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`}</p>
      </header>

      <div className={[styles.block_bar, styles.isHospitalized].join(' ')} style={styleHospitalized}></div>
      <div className={[styles.block_bar, styles.isDead].join(' ')} style={styleDead}></div>
      <div className={[styles.block_bar, styles.isDischarged].join(' ')} style={styleDischarged}></div>

      <div className={styles.count_wrapper}>
        <div className={styles.count} data-type="hospitalized">
          <div className={styles.count_title}>治療中</div>
          <div className={styles.count_text}>
            {latestData.hospitalized}
            <small>人</small>
          </div>
        </div>
        <div className={styles.count} data-type="dead">
          <div className={styles.count_title}>死亡</div>
          <div className={styles.count_text}>
            {latestData.dead}
            <small>人</small>
          </div>
        </div>
        <div className={styles.count} data-type="discharged">
          <div className={styles.count_title}>退院</div>
          <div className={styles.count_text}>
            {latestData.discharged}
            <small>人</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSummary;
