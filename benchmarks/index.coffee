
## Setting up benchmark tool
Benchmark = require 'benchmark'
suite = new Benchmark.Suite

## Getting indicative validator
Indicative = require '../lib/validator'
validator  = new Indicative()

## Global User Data

user_data = 
  username : ''
  email    : 'something'
  password : ''

## Getting joi
Joi = require 'joi'

validateUsingJOI = () ->
  schema = Joi.object().keys(
    username : Joi.required()
    password : Joi.required()
    email    : Joi.string().email().required()
  )

  Joi.validate(
    user_data,
    schema,
    (err,value) ->
      return
  )

validateUsingIndicative = () ->
  schema = 
    username : 'required'
    password : 'required'
    email    : 'required|email'

  validator.validate schema,user_data
  .then (success) ->
    return
  .catch (err) ->
    return

suite
.add 'Validate Using JOI', () ->
  validateUsingJOI()
.add 'Validate Using Indicative', () ->
  validateUsingIndicative()
.on 'cycle', (event) ->
  console.log String(event.target)
.on 'complete', () ->
  console.log "Fastest is #{this.filter('fastest').pluck('name')}"
.run (
  'async' : true
)
