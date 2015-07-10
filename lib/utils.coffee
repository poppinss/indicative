
  "use strict"

  ###*
   * @author Harminder Virk
   * @since v1.1.2
   * @description Util methods, to follow DRY approach
  ###

  _ = require "lodash"

  module.exports =

    ###*
     * Converting an object recursively to dot notation
     * @param  {Object} data                 Object to loop over
     * @param  {Object} resultsBuiltOverTime Single leaf object to return
     * @param  {String} key                  dot notatation key build over time
     * @return {Object}                      Single leaf object to return
    ###
    convert_object_to_dot_notation: (compareWith,data,resultsBuiltOverTime,key) ->

      resultsBuiltOverTime ?= {}
      
      for index,item of data
        cloneIndex = index
        if key then index = "#{key}.#{index}"

        if typeof(compareWith) is 'undefined' then return resultsBuiltOverTime[index] = item

        ## @if - Do recursive only when rules are also recursive otherwise no
        if                    typeof(item) is 'object' and typeof(compareWith[cloneIndex]) isnt 'string'
        then                  @convert_object_to_dot_notation compareWith[cloneIndex],item,resultsBuiltOverTime,index
        else                  resultsBuiltOverTime[index] = item

      return resultsBuiltOverTime
