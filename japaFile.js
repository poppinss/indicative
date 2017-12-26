require('babel-register')
require('regenerator-runtime/runtime')

const cli = require('japa/cli')
cli.run('test/node/**/*.spec.js')
