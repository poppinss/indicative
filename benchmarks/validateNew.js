'use strict'

const Benchmark = require('benchmark')
const suite = new (Benchmark.Suite)()

const { required } = require('../build/validations')
const validator = require('../build/core')
const { validate } = validator({ required })

const rules = {
  username: 'required'
}
const data = {}

suite.add('validate', function () {
  validate(data, rules).catch(() => {})
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.run({ 'async': true })
