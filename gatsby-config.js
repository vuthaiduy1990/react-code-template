/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require('path');

module.exports = {
  // muse be siteMetadata. Don't change this name
  // if not you will face the error: Error: Reducers may not dispatch actions.
  siteMetadata: {
    git: 'https://github.com/vuthaiduy1990/react-code-template',
    repo: 'React Code Template',
    author: 'Vu Thai Duy <vuthaiduy199@gmail.com>',
    version: '1.0.0',
    license: 'MIT',
  },
  plugins: [
    // Configure scss module
    // https://www.gatsbyjs.org/packages/gatsby-plugin-sass/
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-less/?=less
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
          '@@pages': path.resolve(__dirname, 'src/__pages__'),
          '@@components': path.resolve(__dirname, 'src/components'),
          '@@dialogs': path.resolve(__dirname, 'src/dialogs'),
          '@@utils': path.resolve(__dirname, 'src/utils'),
          '@@const': path.resolve(__dirname, 'src/const'),
          '@@datas': path.resolve(__dirname, 'src/datas'),
          '@@actions': path.resolve(__dirname, 'src/redux/actions'),
          '@@selectors': path.resolve(__dirname, 'src/redux/selectors'),
          routes: path.resolve(__dirname, 'src/routes'),
          global: path.resolve(__dirname, 'src/global'),
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
