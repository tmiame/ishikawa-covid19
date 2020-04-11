import React from 'react';
import Loadable from 'react-loadable';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import Header from '@/components/base/header/Header';
import Footer from '@/components/base/Footer';
import CardDailyCases from '@/components/cards/DailyCases';
import DailyMap from '@/components/cards/DailyMap';
import MapCumulative from '@/components/cards/MapCumulative';
import Summary from '@/components/cards/Summary';
import styles from './index.module.scss';
import containerStyles from '@/styles/modules/container.module.scss';

const Loading = () => <div>Loading</div>;

const Chart = Loadable({
  loader: () => import('@/components/Chart'),
  loading: Loading,
});

const IndexPage = () => (
  <Layout>
    <SEO top />
    <Header />
    <div className={styles.home}>
      <CardDailyCases className={styles.sectionDailyCases} />
      <div className={containerStyles.container}>
        <div className={`${containerStyles.containerInner} ${styles.map}`}>
          <DailyMap className={styles.mapItem} />
          <MapCumulative className={styles.mapItem} />
        </div>
      </div>
      <Summary className={styles.sectionSummary} />
      <Chart className={styles.sectionChart} />
    </div>
    <Footer />
  </Layout>
);

export default IndexPage;
