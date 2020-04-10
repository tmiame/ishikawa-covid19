import styles from './index.module.scss';
import React from 'react';

const MainSummary = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.card}>
          <div className={styles.hospitalized}>
            <div className={styles.hospitalized_heading}>
              <div className={styles.heading_title}>治療中</div>
              <div className={styles.heading_text}>
                66<small>人</small>
              </div>
            </div>
          </div>
          <div className={styles.discharged}>
            <div className={styles.discharged_heading}>
              <div className={styles.heading_title}>退院</div>
              <div className={styles.heading_text}>
                6<small>人</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSummary;
