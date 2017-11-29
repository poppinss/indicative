'use strict'

const Benchmark = require('benchmark')
const suite = new (Benchmark.Suite)()

const { validate } = require('../index')

const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:6|max:10'
}
const data = {}

suite.add('validate', function () {
  validate(rules, data)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.run({ 'async': true })
