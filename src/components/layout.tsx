/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'moment/locale/ja';
import 'c3/c3.css';
import '@/styles/global.scss';

if (process.env.ENV !== 'staging' && typeof window !== 'undefined') {
  require('@/plugins/firebase/initialize');
}

const Layout: React.FC = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
