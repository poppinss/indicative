
## Setting up benchmark tool
Benchmark = require 'benchmark'
suite = new Benchmark.Suite

## Getting indicative validator
Indicative = require '../lib/validator'
validator  = new Indicative()

## Global User Data
correct_user_data = 
  username : 'john'
  email    : 'john@example.com'
  password : 'johny'

## Getting joi
Joi = require 'joi'

joiSchema = Joi.object().keys(
  username : Joi.required()
  password : Joi.required()
  email    : Joi.string().email().required()
)

indicativeSchema = 
  username : 'required'
  password : 'required'
  email    : 'required|email'


validationPassedUsingJoi = () ->
  Joi.validate(
    correct_user_data,
    joiSchema,
    (err,value) ->
      return
  )

validationPassedUsingIndicative = () ->
  validator.validate indicativeSchema,correct_user_data
  .then (success) ->
    return
  .catch (err) ->
    return



suite
.add 'Validation Passed Using JOI', () ->
  validationPassedUsingJoi()
.add 'Validation Passed Using Indicative', () ->
  validationPassedUsingIndicative()
.on 'cycle', (event) ->
  console.log String(event.target)
.on 'complete', () ->
  console.log "Fastest is #{this.filter('fastest').pluck('name')}"
.run (
  'async' : true
)