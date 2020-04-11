/**
 * 検査陽性者の状況のカード
 */

import React, { useState, useEffect } from 'react';
import { Moment } from 'moment';
import ReactTooltip from 'react-tooltip';
import { getCityDateDayCases, getCases, getCityCases } from '@/plugins/caseData';
import { city, CityItemType } from '@/constants/city';
import pathData from './svgIshikawaPath';
import styles from './index.module.scss';

type Props = {
  className?: string;
  date?: Moment;
};

const pathColor = (number = 0): string => {
  return number >= 10
    ? styles.pathHeat4
    : number >= 6
    ? styles.pathHeat3
    : number >= 3
    ? styles.pathHeat2
    : number > 0
    ? styles.pathHeat1
    : styles.pathGreen;
};

const Map: React.FC<Props> = ({ className = '', date }) => {
  const [mapData, setMapData] = useState(
    Object.values(city).map((cityItem: CityItemType) => {
      const cases = date ? getCityDateDayCases(cityItem.id, date) : getCityCases(cityItem.id);
      return {
        ...cityItem,
        cases: cases,
        path: pathData[cityItem.id],
      };
    }),
  );

  const getOtherCases = (key: 'unknown' | 'kengai', date?: Moment) => {
    return date ? getCityDateDayCases(key, date) : getCityCases(key);
  };

  const [otherCases, setOtherCases] = useState({
    unknown: getOtherCases('unknown', date),
    kengai: getOtherCases('kengai', date),
  });

  const [todayCases, setTodayCases] = useState(getCases(date));

  useEffect(() => {
    if (!date) {
      return;
    }

    setMapData(
      mapData.map((cityItem) => {
        return {
          ...cityItem,
          cases: getCityDateDayCases(cityItem.id, date),
        };
      }),
    );

    setTodayCases(getCases(date));

    setOtherCases({
      unknown: getOtherCases('unknown', date),
      kengai: getOtherCases('kengai', date),
    });
  }, [date]);

  return (
    <div className={`${styles.map} ${className}`}>
      <div className={styles.map_info}>
        <div className={styles.cases}>
          <div className={styles.cases_label}>感染者</div>
          <div className={styles.cases_count}>
            {todayCases.length}
            <small>人</small>
          </div>
        </div>
        <ul className={styles.mapHeatInfo}>
          <li className={styles.mapHeatInfo_item}>市町村不明 {otherCases.unknown?.length}人</li>
          <li className={styles.mapHeatInfo_item}>県外 {otherCases.kengai?.length}人</li>
          <li className={styles.mapHeatInfo_item} data-heat="4">
            10+
          </li>
          <li className={styles.mapHeatInfo_item} data-heat="3">
            6~9
          </li>
          <li className={styles.mapHeatInfo_item} data-heat="2">
            3~5
          </li>
          <li className={styles.mapHeatInfo_item} data-heat="1">
            1~2
          </li>
          <li className={styles.mapHeatInfo_item} data-heat="0">
            0
          </li>
        </ul>
      </div>
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 608 960.6">
        <path
          className={styles.pathOther}
          id="fukui"
          d="M-47,1024.6l-16-17h-1v17H-47z M-64,1024.6v-108l2-2l9-29l-1-6l9-8l3-11l18-13l3-11l7-12l-1-7l4,9l-5,10l11-18l-7,2l8-12l-6-17l11-2l6,3l10-5l28-21l7,3l-1,6l3,1l2,7l15,4l8,14l7,3l-2,16l7,16l7,5l23-4l2,9l12,11h11l13-12l9,7l19-5l23,14l6,13l17,9l3,13l44-10l5,11l-15,11l-2,30l11,4l1,18l18,6l-4,12l14,9l8,29l-3,8H-64z"
        />
        <path
          className={styles.pathOther}
          id="gihu"
          d="M672,793.6l-9,15l-5,1l3,12l7,4l1,11l-19,18l3,6l-5,10l11,14l11,7h2V793.6z M672,1024.6v-116l-2,2l1,9l-4,11l-21,14l-1,9l-8,14l-10,2l-9,15l-3,11l-8,3l-10-9h-9l-17,7l-8,8v16l-3,4H672z M313,1024.6l3-8l-8-29l-14-9l4-12l-18-6l-1-18l-11-4l2-30l15-11l-5-11l5-11l8-20l-7-12l15-6l1-8l10-9l-1-5l14-21l-8-10l-9-1l-10-19l18-4l5-15l-2-8l12-1l3-11l2,15l15-11l22,12l8,17l-7,19l8,2l0,0l5-7l12-4l4-15l8,1l6-6l4-8l-5-2l6-12l-1-3l8-7h8l-1-7l31-35l7,4l8-3l6,16l19-20l4,6l11-8l17,2l-1,11l-4,4l4,6l17-5l5-10l13-5l7,19l26,8l6-8l16,1l3,7l11,11l22,1v10l8,2v301H313z"
        />
        <path
          className={styles.pathOther}
          id="toyama"
          d="M672,705.6l-8,6l-22-1l-11-11l-3-7l-16-1l-6,8l-26-8l-7-19l-13,5l-5,10l-17,5l-4-6l4-4l1-11l-17-2l-11,8l-4-6l-19,20l-6-16l-8,3l-7-4l-31,35l1,7h-8l-8,7l1,3l-6,12l5,2l-4,8l-6,6l-8-1l-4,15l-12,4l-5,7l0,0l-8-2l7-19l-8-17l-22-12l-15,11l-2-15l-3,11l-12,1l2,8l-5,15l-18,4l-4-24l11-10l-6-24l-11-8l-1-8l13-9l-4-4l5-5l-2-8l4-6l-4-7v-8l10-23l-6-10h-6v-21l-2-13l6-4l1-6l10-13l-1-9l-5-1l3-8l-12-11l3-6h11l1-6l5-1l5-8l4-8l-5-7l4-2l-1-15l8-22l-2-5l5-5l6-10l-4-8l4-8l13-10l7-11l11-3l9,6l5-11l24-2l7,5l-12,11l3,9l-3,5l-19,23l4,14l11,12l18,16l4-1l1,5l52,21l20-3v7l5-9h-3l40,4l8-2l7-12l15-10l5-4v-8l8-15l-1-8l5-11l-5-10l8-14l29-18l24-4l31-8V705.6z"
        />
        <g>
          {mapData.map((item, index) => {
            return (
              !item.nomap && (
                <path
                  key={item.id}
                  className={`${styles.pathIshikawa} ${pathColor(item.cases.length)}`}
                  data-tip={`${item.name} ${item.cases.length}人`}
                  data-for={`tooltip-${index}`}
                  d={item.path}
                />
              )
            );
          })}
        </g>
      </svg>

      {mapData.map((item, index) => {
        return !item.nomap && <ReactTooltip html={true} key={item.id} id={`tooltip-${index}`} />;
      })}
    </div>
  );
};

export default Map;
