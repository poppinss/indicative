require('babel-register')
require('babel-polyfill')

const cli = require('japa/cli')
cli.run('test/node/**/*.spec.js')
