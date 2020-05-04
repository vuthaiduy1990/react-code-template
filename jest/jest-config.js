module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest/jest-preprocess.js',
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)test.js'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/file-mock.js',
  },
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    '<rootDir>.*/static',
    '<rootDir>/lang',
    '<rootDir>/coverage',
    '<rootDir>/jest-report',
    '<rootDir>/analyzer',
  ],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/jest/loadershim.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './jest-report',
        filename: 'index.html',
      },
    ],
  ],
};
