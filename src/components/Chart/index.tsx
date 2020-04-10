import React from 'react';
import { useRef, useEffect, useState } from 'react';
import 'd3';
import c3 from 'c3';
// import 'c3/c3.css';
import styles from './index.module.scss';

import moment from 'moment';
import { getCases, getCaseDataLastUpdateTime } from '@/plugins/useCityCases';

moment.locale('ja');

const Chart = (): JSX.Element => {
  const updateTime = getCaseDataLastUpdateTime();
  const allCases = getCases().reverse();
  const data = allCases.reduce((accumulator: { date: string; data: CaseItem[] }[], currentValue) => {
    if (!accumulator.length) {
      accumulator = [
        {
          date: currentValue.date,
          data: [currentValue],
        },
      ];
      return accumulator;
    }

    if (accumulator[accumulator.length - 1].date === currentValue.date) {
      accumulator[accumulator.length - 1].data.push(currentValue);
    } else {
      accumulator.push({
        date: currentValue.date,
        data: [currentValue],
      });
    }

    return accumulator;
  }, []);

  const graphColX = data.map((item) => item.date);
  const graphColCase = data.map((item) => item.data.length);
  const graphColCumulative = data.reduce((acc: number[], current) => {
    if (!acc.length) {
      acc = [...acc, current.data.length];
    } else {
      acc = [...acc, current.data.length + acc[acc.length - 1]];
    }

    return acc;
  }, []);

  const chartEl = useRef(null);

  useEffect(() => {
    c3.generate({
      bindto: chartEl.current,
      size: {
        height: 480,
      },
      padding: {
        top: 20,
        left: 24,
        right: 24,
        bottom: 0,
      },
      color: {
        pattern: [
          '#1f77b4',
          '#aec7e8',
          '#ff7f0e',
          '#ffbb78',
          '#2ca02c',
          '#98df8a',
          '#d62728',
          '#ff9896',
          '#9467bd',
          '#c5b0d5',
          '#8c564b',
          '#c49c94',
          '#e377c2',
          '#f7b6d2',
          '#7f7f7f',
          '#c7c7c7',
          '#bcbd22',
          '#dbdb8d',
          '#17becf',
          '#9edae5',
        ],
      },
      data: {
        x: 'x',
        columns: [
          ['x', ...graphColX],
          ['日別', ...graphColCase],
          ['累計', ...graphColCumulative],
        ],
        types: {
          累計: 'area',
          日別: 'bar',
        },
        axes: {
          累計: 'y2',
        },
      },
      zoom: {
        enabled: true,
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d',
            rotate: 90,
            multiline: false,
          },
        },
        y2: {
          show: true,
        },
      },
      grid: {
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      point: {
        r: 2,
        focus: {
          expand: {
            enabled: true,
          },
        },
      },
      bar: {
        width: {
          ratio: 0.3,
        },
      },
    });
  }, [chartEl]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.block}>
          <h2 className={styles.block_heading}>感染者数グラフ</h2>
          <div className={styles.block_map}>
            <div ref={chartEl}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
