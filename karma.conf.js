var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'test/**/*.spec.js'
    ],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}
