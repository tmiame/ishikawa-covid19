import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment, { Moment } from 'moment';
import styles from './index.module.scss';
import carbonIconStyles from '@/styles/modules/carbonIcon.module.scss';
import Map from '@/components/cards/Map';
import { getCases, getCaseDataLastUpdateTime } from '@/plugins/caseData';
import { useMqMin } from '@/plugins/useResize';
import { Calendar32 } from '@carbon/icons-react';

type Props = {
  className?: string;
};

const DailyMap: React.FC<Props> = ({ className = '' }) => {
  const lastUpdateTime = getCaseDataLastUpdateTime();
  const [singleDate, setSingleDate] = useState<Moment>(lastUpdateTime);
  const [focused, setFocused] = useState<boolean | null>(false);
  const mqMinT = useMqMin('T');

  function checkCase(day: Moment | undefined) {
    if (!day) {
      return false;
    }
    const items = getCases(day);
    return items.length ? false : true;
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.wrapperInner}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle} aria-label={`${singleDate.format('M月D日')}`}>
            <span className={styles.dateMonth}>{singleDate.format('M')}</span>
            <span className={styles.dateDay}>{singleDate.format('D')}</span>
            <span className={styles.dateDayOfWeek}>({singleDate.format('ddd')})</span>
          </h2>
          <button
            type="button"
            className={styles.openButton}
            onClick={(): void => setFocused(true)}
            aria-label="日付指定"
          >
            <Calendar32 className={carbonIconStyles.base} />
          </button>
          {mqMinT}
        </div>
        <div className={styles.focused}>
          {focused && (
            <SingleDatePicker
              block
              disableScroll
              hideKeyboardShortcutsPanel
              isOutsideRange={(day): boolean => {
                if (moment().diff(day) <= 0) {
                  return true;
                }
                return moment('2020-02-01').isSameOrAfter(day);
              }}
              isDayBlocked={(day) => checkCase(day)}
              date={singleDate}
              onDateChange={(date): void => {
                if (date) setSingleDate(date);
              }}
              focused={focused}
              onFocusChange={({ focused }): void => setFocused(focused)}
              orientation={mqMinT ? 'horizontal' : 'vertical'}
              numberOfMonths={1}
              withFullScreenPortal={true}
              daySize={mqMinT ? 50 : 46}
              transitionDuration={0}
              placeholder="日付を選択"
              monthFormat="YYYY年M月"
              id="your_unique_id"
            />
          )}
        </div>
        <Map className={styles.mapItem} date={singleDate} />
      </div>
    </div>
  );
};

export default DailyMap;
