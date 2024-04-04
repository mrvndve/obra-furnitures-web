const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': './src/components',
    '@pages': './src/pages',
    '@utils': './src/utils',
    '@helpers': './src/helpers',
    '@actions': './src/redux-saga/actions',
    '@action-types': './src/redux-saga/action-types'
  })(config);
  return config;
};