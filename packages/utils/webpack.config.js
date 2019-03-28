const { join } = require('path')

module.exports = require('../../_webpack.config')({
  output: {
    path: join(__dirname, './build'),
    library: 'indicative.utils',
  }
})
