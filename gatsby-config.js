module.exports = {
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          localIdentName: '[local]-[hash:base64:5]',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '&#x1f9a0;新型コロナウイルス石川県の感染状況',
        short_name: '&#x1f9a0;石川県状況',
        start_url: '/',
        background_color: '#0088bb',
        theme_color: '#0088bb',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
