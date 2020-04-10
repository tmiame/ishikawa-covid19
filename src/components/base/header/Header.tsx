import React from 'react';
import styles from './Header.module.scss';

// import ThemeButton from './ThemeButton';
// import { useTheme } from '@/plugins/theme/ThemeContext';

const GlobalHeader = (): JSX.Element => {
  // const themeState = useTheme();
  return (
    <header className={`${styles.header}`}>
      <a className={styles.headerLogo}>
        <svg className={styles.headerLogoImage} version="1.1" x="0px" y="0px" viewBox="0 0 334 334">
          <path d="M0,267L108.9,89c7.1-12.3,20.1-22,36-22h135l-37.1,59.2c-7.5,13-19.8,20.7-40.7,20.7h-29.3l-15.2,23.8h39c13.4,0,18.5,6.4,12.5,16.8L160.7,267h-34.9l42-68.8h-49.4c-6,0-8.1-4.2-4.4-10.5l38.4-60.7c2.6-4.6,8.5-8.2,15.5-8.2H209c3.7,0,8-3.2,10.2-6.9l9.1-15.3h-72.7c-9.6,0-20,5.8-23.9,12.6L34.9,267H0z M299.1,171.8L242,267h34.9l57.1-95.2L299.1,171.8L299.1,171.8z M241,171.8L183.9,267h34.9l57.1-95.2L241,171.8L241,171.8z" />
        </svg>
        <div className={styles.headerLogoText}>
          <span>新型コロナウイルス</span>
          <span>石川県感染状況</span>
        </div>
      </a>
    </header>
  );
};

export default GlobalHeader;
