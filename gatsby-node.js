/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const Dotenv = require('dotenv-webpack');

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ],
  });
};
