module.exports = function config (userConfig) {
  return require('extend')(true, {}, {
    entry: './index.ts',
    resolve: {
      extensions: ['.ts', '.js']
    },
    mode: 'production',
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  }, userConfig)
}
