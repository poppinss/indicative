
  ## testing nested rules

  Validator     = require "../lib/validator"
  indicative    = new Validator
  DOT           = require "dot-object"


  rules = 
    "person.profile.firstname" : "required"
    "firstname"                : "required"
    "numbers.value"            : "array"

  data =
    firstname : "virk"
    person:
      profile:
        firstname: "virk"
    numbers:
      value: [1]

  indicative
  .validateAll rules,data
  .then (success) ->
    console.log success
  .catch (error) ->
    console.log error