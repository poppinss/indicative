
  ## testing nested rules

  Validator     = require "../lib/validator"
  indicative    = new Validator


  rules = 
    binary: "required"

  data =
    binary: [0,1]

  indicative
  .validateAll rules,data
  .then (success) ->
    console.log success
  .catch (error) ->
    console.log error  


  rules = 
    "person.profile.firstname" : "required"
    "numbers.value"            : "array"


  data =
    person:
      profile:
        firstname: "somename"
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