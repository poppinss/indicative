let browsers = ['Chrome']

/**
 * If karma tests are executed via `node bin/test.js` file. It will automatically
 * install the puppeteer module.
 */
if ('TRAVIS' in process.env && 'CI' in process.env) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()
  browsers = ['ChromeHeadless']
}

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      'node_modules/regenerator-runtime/runtime.js',
      'test/karma/**/*.spec.js'
    ],
    preprocessors: {
      'test/karma/**/*.js': ['rollup']
    },
    rollupPreprocessor: {
      format: 'iife',
      name: 'indicative',
      sourcemap: 'inline',
      plugins: require('./rollupPlugins')
    },
    port: 9876,
    reporters: ['dots'],
    frameworks: ['japa'],
    browsers: browsers,
    singleRun: true
  })
}
