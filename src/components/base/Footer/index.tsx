import React from 'react';
import styles from './index.module.scss';
import containerStyles from '@/styles/modules/container.module.scss';

const Footer = () => {
  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.containerInner}>
        <div className={styles.footer}>
          <p>
            データソース：
            <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html" rel="nofollow noopener">
              厚生労働省の発表資料
            </a>
            、
            <a href="https://www.pref.ishikawa.lg.jp/kansen/coronakennai.html" rel="nofollow noopener">
              石川県の発表資料
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
