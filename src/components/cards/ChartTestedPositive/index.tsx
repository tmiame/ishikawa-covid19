/**
 * 感染者数グラフカード
 */

import React, { useRef, useEffect, useState } from 'react';
import 'd3';
import c3, { ChartAPI } from 'c3';
import containerStyles from '@/styles/modules/container.module.scss';
import styles from './index.module.scss';
import { getCases } from '@/plugins/caseData';
import { useMqMin } from '@/plugins/useResize';

const Chart = ({ className }) => {
  const allCases = [...getCases()].sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });

  const data = [...allCases].reduce((accumulator: { date: string; data: CaseItem[] }[], currentValue) => {
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

  const graphColX = [...data].map((item) => item.date);
  const graphColCase = [...data].map((item) => item.data.length);
  const graphColCumulative = [...data].reduce((acc: number[], current) => {
    if (!acc.length) {
      acc = [...acc, current.data.length];
    } else {
      acc = [...acc, current.data.length + acc[acc.length - 1]];
    }
    return acc;
  }, []);

  const chartEl = useRef(null);
  const [chart, setChart] = useState<ChartAPI | null>(null);
  const mqMinT = useMqMin('T');

  useEffect(() => {
    setChart(
      c3.generate({
        bindto: chartEl.current,
        size: {
          height: mqMinT ? 480 : 300,
        },
        padding: {
          top: 25,
          left: 30,
          right: 35,
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
            ['新規', ...graphColCase],
            ['累計', ...graphColCumulative],
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
              rotate: 90,
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
          r: 3,
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
      }),
    );
  }, [chartEl, mqMinT]);

  return (
    <div className={`${className} ${containerStyles.container}`}>
      <div className={containerStyles.containerInner}>
        <div className={styles.block}>
          <h2 className={styles.block_heading} onClick={() => chart?.unzoom()}>
            感染者の推移
          </h2>
          <div className={styles.block_map}>
            <div ref={chartEl}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
