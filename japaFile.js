require('babel-register')
require('babel-polyfill')

const cli = require('japa/cli')
cli.run('test/node/**/*.spec.js')
cli.filter((file) => file.endsWith('main.spec.js'))
