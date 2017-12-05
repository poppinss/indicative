module.exports = function (config) {
  config.set({
    basePath: './',
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/browser/**/*.spec.js'
    ],
    preprocessors: {
      'test/browser/**/*.js': ['rollup']
    },
    rollupPreprocessor: {
      format: 'iife',
      name: 'indicative',
      sourcemap: 'inline',
      plugins: require('./rollupPlugins')
    },
    frameworks: ['japa']
  })
}
