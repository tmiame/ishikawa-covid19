import React from 'react';
import Loadable from 'react-loadable';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import SummaryTestPositive from '@/components/cards/SummaryTestPositive';
import SummaryCondition from '@/components/cards/SummaryCondition';
import CityMapNew from '@/components/cards/CityMapNew';
import CityMapTotal from '@/components/cards/CityMapTotal';
import styles from './index.module.scss';
import containerStyles from '@/styles/modules/container.module.scss';

const Loading = () => <div>Loading</div>;

const ChartTestPositive = Loadable({
  loader: () => import('@/components/cards/ChartTestPositive'),
  loading: Loading,
});

const IndexPage = () => (
  <Layout>
    <SEO top />
    <Header />
    <div className={styles.home}>
      <SummaryTestPositive className={styles.sectionSummaryTestPositive} />
      <div className={containerStyles.container}>
        <div className={`${containerStyles.containerInner} ${styles.map}`}>
          <CityMapNew className={styles.mapItem} />
          <CityMapTotal className={styles.mapItem} />
        </div>
      </div>
      <SummaryCondition className={styles.sectionSummaryCondition} />
      <ChartTestPositive className={styles.sectionChartTestPositive} />
    </div>
    <Footer />
  </Layout>
);

export default IndexPage;
