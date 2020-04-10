/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

// import './layout.css';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Inter:wght@500;700&family=Noto+Sans+JP:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
