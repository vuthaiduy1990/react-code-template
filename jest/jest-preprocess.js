/* eslint-disable import/no-extraneous-dependencies */
const babel = require('babel-jest');

const babelOptions = {
  presets: ['babel-preset-gatsby'],
};

module.exports = babel.createTransformer(babelOptions);
