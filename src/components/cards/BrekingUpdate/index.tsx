/**
 * メディア発表の速報カード
 */

import React from 'react';
import moment from 'moment';
import Headline from '@/components/base/Headline';
import styles from './index.module.scss';
import { getBreadkingUpdate } from '@/plugins/newsData';
import dateFromNowLabel from '@/utils/dateFromNowLabel';

const BreakingUpdate: React.FC<{ className?: string }> = ({ className = '' }) => {
  const item = getBreadkingUpdate();

  return (
    item && (
      <div className={`${styles.wrapper} ${className}`}>
        <Headline title={dateFromNowLabel()} text={`感染者情報 ${moment(item.date).format('M月D日(ddd) HH:mm')}`} />
        <div className={styles.newItem}>
          <a className="body-small" href={item.url} target="_blank" rel="noopener noreferrer">
            {item.text} -&gt;
          </a>
        </div>
      </div>
    )
  );
};

export default BreakingUpdate;
