import React from 'react';
import Loadable from 'react-loadable';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import Header from '@/components/base/header/Header';
import CardDailyCases from '@/components/cards/DailyCases';
import DailyMap from '@/components/cards/DailyMap';
import MapCumulative from '@/components/cards/MapCumulative';
import Summary from '@/components/cards/Summary';
import DataView from '@/components/cards/DataView';
import styles from './index.module.scss';

const Loading = () => <div>Loading</div>;

const Chart = Loadable({
  loader: () => import('@/components/Chart'),
  loading: Loading,
});

const IndexPage = () => (
  <Layout>
    <SEO />
    <Header />
    <CardDailyCases />
    <div className={styles.map}>
      <DailyMap className={styles.mapItem} />
      <MapCumulative className={styles.mapItem} />
    </div>
    <Summary />
    <Chart />
    <DataView />
  </Layout>
);

export default IndexPage;