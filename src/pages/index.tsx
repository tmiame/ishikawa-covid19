import React from 'react';
import Loadable from 'react-loadable';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import Header from '@/components/base/header/Header';
import Footer from '@/components/base/Footer';
import DailyCases from '@/components/cards/DailyCases';
import CityMapNew from '@/components/cards/CityMapNew';
import CityMapTotal from '@/components/cards/CityMapTotal';
import Summary from '@/components/cards/Summary';
import styles from './index.module.scss';
import containerStyles from '@/styles/modules/container.module.scss';

const Loading = () => <div>Loading</div>;

const ChartTestedPositive = Loadable({
  loader: () => import('@/components/cards/ChartTestedPositive'),
  loading: Loading,
});

const IndexPage = () => (
  <Layout>
    <SEO top />
    <Header />
    <div className={styles.home}>
      <DailyCases className={styles.sectionDailyCases} />
      <div className={containerStyles.container}>
        <div className={`${containerStyles.containerInner} ${styles.map}`}>
          <CityMapNew className={styles.mapItem} />
          <CityMapTotal className={styles.mapItem} />
        </div>
      </div>
      <Summary className={styles.sectionSummary} />
      <ChartTestedPositive className={styles.sectionChart} />
    </div>
    <Footer />
  </Layout>
);

export default IndexPage;
