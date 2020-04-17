/**
 * 感染者数グラフカード
 */

import React, { useRef, useMemo, useCallback } from 'react';
import 'd3';
import c3 from 'c3';
import moment from 'moment';
import styles from './index.module.scss';
import { getCases } from '@/plugins/caseData';
import { useMqMin } from '@/plugins/useResize';

const getAllCases = () => {
  return getCases().sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};

/**
 * 日付毎の感染者データを作成
 */
const getData = (list: CaseItem[]) => {
  return list.reduce<{ date: string; data: CaseItem[] }[]>((acc, item) => {
    if (!acc.length || acc[acc.length - 1].date !== item.date) {
      acc.push({
        date: item.date,
        data: [item],
      });
    } else {
      acc[acc.length - 1].data.push(item);
    }
    return acc;
  }, []);
};

const getGraphColumn = (
  data: {
    date: string;
    data: CaseItem[];
  }[],
) => {
  return {
    x: data.map((item) => moment(item.date).format('YYYY-MM-DD')),
    daily: data.map((item) => item.data.length),
    cumulative: data.reduce<number[]>((acc, current) => {
      if (!acc.length) {
        acc = [...acc, current.data.length];
      } else {
        acc = [...acc, current.data.length + acc[acc.length - 1]];
      }
      return acc;
    }, []),
  };
};

const Chart = ({ className = '' }) => {
  const allCases = useMemo(() => getAllCases(), []);
  const data = useMemo(() => getData(allCases), [allCases]);
  const { x, daily, cumulative } = useMemo(() => getGraphColumn(data), [data]);
  const mqMinT = useMqMin('T');
  const chartEl = useRef<HTMLDivElement>();

  const setChartRef = useCallback(
    (node: HTMLDivElement) => {
      chartEl.current = node;

      const chart = c3.generate({
        bindto: chartEl.current,
        size: {
          height: mqMinT ? 500 : 380,
        },
        padding: {
          top: mqMinT ? 30 : 20,
          left: mqMinT ? 30 : 30,
          right: mqMinT ? 35 : 35,
          bottom: 0,
        },
        color: {
          pattern: [
            '#0088BB',
            // '#4daccf',
            // '#1f77b4',
            'rgba(255,255,255, 0.7)',
            // '#e9d160',
            // '#aec7e8',
            // '#ff7f0e',
            // '#ffbb78',
            // '#2ca02c',
            // '#98df8a',
            // '#d62728',
            // '#ff9896',
            // '#9467bd',
            // '#c5b0d5',
            // '#8c564b',
            // '#c49c94',
            // '#e377c2',
            // '#f7b6d2',
            // '#7f7f7f',
            // '#c7c7c7',
            // '#bcbd22',
            // '#dbdb8d',
            // '#17becf',
            '#9edae5',
          ],
        },
        data: {
          x: 'x',
          columns: [
            ['x', ...x],
            ['新規', ...daily],
            ['累計', ...cumulative],
          ],
          types: {
            累計: 'area',
            新規: 'bar',
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
              rotate: 50,
              multiline: false,
            },
            extent: [5, 10],
          },
          y: {
            label: '新規',
          },
          y2: {
            label: '累計',
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
        },
        bar: {
          width: {
            ratio: 0.3,
          },
        },
      });

      setTimeout(() => {
        chart.resize();
      }, 10);
    },
    [mqMinT],
  );

  return (
    <div className={className}>
      <div className={styles.block}>
        <h2 className={styles.block_heading}>感染者の推移</h2>
        <div className={styles.block_map}>
          <div className="cc3">
            <div ref={setChartRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
