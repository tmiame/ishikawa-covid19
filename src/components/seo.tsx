import React from 'react';
import Helmet from 'react-helmet';
import siteMetadata from '@/data/siteMetadata';
import '../../static/ogp.png';
interface Props {
  top: boolean;
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  title?: string;
}

const SEO: React.FC<Props> = ({ top = false, description = '', lang = 'ja', meta = [], title = '' }) => {
  const metaTitle = top ? siteMetadata.title : `${title} | ${siteMetadata.title}`;
  const metaDescription = description || siteMetadata.description;
  const metaOgp = 'http://ishikawa-covid19.web.app/ogp.png';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `canonical`,
          content: 'http://ishikawa-covid19.web.app/',
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaOgp,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
