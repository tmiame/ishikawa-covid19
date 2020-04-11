import React from 'react';
import styles from './index.module.scss';

const Layout: React.FC<{ className?: string; title: string | React.ReactElement; text?: string }> = ({
  children,
  className = '',
  title = '',
  text = '',
}) => {
  return (
    <header className={`${className} ${styles.headline}`}>
      <h2 className="heading-1">{title}</h2>
      <p className="body-small">{text}</p>
      {children}
    </header>
  );
};

export default Layout;
