
  "use strict"

  ###*
   * @author Harminder Virk
   * @since v1.1.2
   * @description Util methods, to follow DRY approach
  ###


  module.exports =

    ###*
     * Converting an object recursively to dot notation
     * @param  {Object} data                 Object to loop over
     * @param  {Object} resultsBuiltOverTime Single leaf object to return
     * @param  {String} key                  dot notatation key build over time
     * @return {Object}                      Single leaf object to return
    ###
    convert_object_to_dot_notation: (data,resultsBuiltOverTime,key) ->
      if not resultsBuiltOverTime then resultsBuiltOverTime = {}

      for index,item of data
        if                    key
        then                  index = "#{key}.#{index}"

        if                    typeof(item) is 'object'
        then                  @convert_object_to_dot_notation item,resultsBuiltOverTime,index
        else                  resultsBuiltOverTime[index] = item
      return resultsBuiltOverTime
