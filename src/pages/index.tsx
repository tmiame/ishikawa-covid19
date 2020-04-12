import React from 'react';
import Loadable from 'react-loadable';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import Headline from '@/components/base/Headline';
import BrekingUpdate from '@/components/cards/BrekingUpdate';
import SummaryTestPositive from '@/components/cards/SummaryTestPositive';
import SummaryCondition from '@/components/cards/SummaryCondition';
import CityMapNew from '@/components/cards/CityMapNew';
import CityMapTotal from '@/components/cards/CityMapTotal';
import styles from './index.module.scss';
import containerStyles from '@/styles/modules/container.module.scss';
import { getCaseDataLastUpdateTime } from '@/plugins/caseData';

const Loading = () => <div>Loading</div>;

const ChartTestPositive = Loadable({
  loader: () => import('@/components/cards/ChartTestPositive'),
  loading: Loading,
});

const IndexPage = () => {
  const updateTime = getCaseDataLastUpdateTime();

  return (
    <Layout>
      <SEO top />
      <Header />
      <div className={containerStyles.container}>
        <div className={containerStyles.containerInner}>
          <BrekingUpdate />

          <div className={styles.home}>
            <Headline
              title="県発表の最新状況"
              text={`↓${updateTime.fromNow()}に更新 ${updateTime.format('YYYY年M月D日(ddd) HH:mm')}`}
            />
            <div className={styles.headline_caution}>
              <p className="body-xsmall">
                ※県の発表資料が更新され次第更新。各項目に更新日がない場合は上記の更新日時点のデータ。
              </p>
              <p className="body-xsmall">※感染日は陽性判定日基準</p>
            </div>
            <div className={styles.home}>
              <SummaryTestPositive className={styles.sectionSummaryTestPositive} />
              <div className={styles.map}>
                <CityMapNew className={styles.mapItem} />
                <CityMapTotal className={styles.mapItem} />
              </div>
              <SummaryCondition className={styles.sectionSummaryCondition} />
              <ChartTestPositive className={styles.sectionChartTestPositive} />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
