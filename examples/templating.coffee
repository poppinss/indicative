
"use strict"
Validator = require "../lib/validator"

rules = 
  name  : 'required'
  email : 'required|email'
  age   : 'range:18,42'

data =
  email: 'something'
  age  :  10

messages=
  required  : '{{field}} is {{rule}}'
  email     : '{{value}} is not a valid email address'
  range     : '{{field}} must be under {{argument.1}} and over {{argument.0}}'

validator = new Validator

validator
.validateAll rules,data,messages
.then (success) ->
  console.log 'success>>>',success
.catch (error) ->
  console.log 'error>>',error