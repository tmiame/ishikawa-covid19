import React from 'react';
import styles from './index.module.scss';
import { getLastSummaryUpdateUpdateDateTime, getLastHospitalized, getLastDischarged } from '@/plugins/summaryData';

const MainSummary = () => {
  const updateTime = getLastSummaryUpdateUpdateDateTime();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.block}>
          <header className={styles.block_heading}>
            <h2 className="heading-4">感染者の状態</h2>
            <p className="body-xsmall">{`${updateTime.format('YYYY年M月D日')}更新 ${updateTime.fromNow()}`}</p>
          </header>
          <div className={styles.hospitalized}>
            <div className={styles.hospitalized_heading}>
              <div className={styles.heading_title}>治療中</div>
              <div className={styles.heading_text}>
                {getLastHospitalized()}
                <small>人</small>
              </div>
            </div>
          </div>
          <div className={styles.discharged}>
            <div className={styles.discharged_heading}>
              <div className={styles.heading_title}>退院</div>
              <div className={styles.heading_text}>
                {getLastDischarged()}
                <small>人</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSummary;
