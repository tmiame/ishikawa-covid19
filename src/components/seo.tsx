import React from 'react';
import Helmet from 'react-helmet';
import siteMetadata from '@/data/siteMetadata';

interface Props {
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  title?: string;
}

const SEO: React.FC<Props> = ({ description = '', lang = 'ja', meta = [], title = '' }) => {
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
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
          content: title,
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
