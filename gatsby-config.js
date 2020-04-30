/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require('path');

module.exports = {
  plugins: [
    // Configure scss module
    // https://www.gatsbyjs.org/packages/gatsby-plugin-sass/
    // https://www.gatsbyjs.org/packages/gatsby-plugin-less/?=less
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },

    // Emotion, Css in JS library
    // https://github.com/emotion-js/emotion
    // https://www.gatsbyjs.org/packages/gatsby-plugin-emotion/
    'gatsby-plugin-emotion',

    // Configure Eslint
    // https://www.gatsbyjs.org/packages/gatsby-plugin-eslint/
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    // Configure alias
    // https://www.gatsbyjs.org/packages/gatsby-plugin-alias-imports/
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@@components': path.resolve(__dirname, 'src/components'),
          '@@pages': path.resolve(__dirname, 'src/__pages__'),
          '@@utils': path.resolve(__dirname, 'src/utils'),
        },
        extensions: ['js', 'css', 'sass', 'scss'],
      },
    },
    // Configure babel import
    // https://www.gatsbyjs.org/packages/gatsby-plugin-import
    {
      resolve: 'gatsby-plugin-import',
      options: {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    },
    // Wepack bundle analyzer
    // https://www.npmjs.com/package/webpack-bundle-analyzer
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        reportFilename: '../analyzer/bundler-analyzer.html',
        openAnalyzer: false,
      },
    },
    // like Wepack Bundle Analyzer but different GUI
    // https://www.gatsbyjs.org/packages/gatsby-plugin-bundle-stats/?=wepack
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        baseline: true,
        outDir: '../analyzer',
      },
    },
  ],
};
