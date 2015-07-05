
  ## testing nested rules

  Validator     = require "../lib/validator"
  indicative    = new Validator

  rules = 
    "person.profile.firstname" : "required"
    "firstname"                : "required"
    "numbers.value"            : "array"


  data =
    firstname : "virk"
    person:
      profile:
        firstname: null
    numbers:
      value: [1]


  message =
    "required"                         : "This is required"
    person:
      profile:
        "firstname.required"           : "I need person firstname" 

  indicative
  .validateAll rules,data,message
  .then (success) ->
    console.log success
  .catch (error) ->
    console.log error