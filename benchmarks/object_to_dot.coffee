
  _         = require "lodash"
  
  ## Setting up benchmark tool
  Benchmark = require 'benchmark'
  suite = new Benchmark.Suite



  "use strict"

  data =
    person:
      profile:
        name  :'something'
        email :'something'
      address:
        street: 'some street'
    food:
      breakfast: 'bread'


  convert_to_dot_object = (data,resultsToLoop,key) ->

    if not resultsToLoop then resultsToLoop = {}

    _.each data, (item,index) ->
      index = if key then "#{key}.#{index}" else index
      if typeof(item) is 'object'
        convert_to_dot_object item,resultsToLoop,index
      else
        resultsToLoop[index] = item


  convert_to_dot_object_native = (data,resultsToLoop,key) ->

    if not resultsToLoop then resultsToLoop = {}

    for index,item of data
      index = if key then "#{key}.#{index}" else index

      if typeof(item) is 'object'
        convert_to_dot_object item,resultsToLoop,index
      else
        resultsToLoop[index] = item
    return resultsToLoop
 

  suite
  .add 'Converting object to dot notation using underscore', () ->
    convert_to_dot_object(data)
  .add 'Converting object to dot notation using native for loop', () ->
    convert_to_dot_object_native(data)
  .on 'cycle', (event) ->
    console.log String(event.target)
  .on 'complete', () ->
    console.log "Fastest is #{this.filter('fastest').pluck('name')}"
  .run (
    'async' : true
  )