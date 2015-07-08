"use strict"


###*
 * @author Harminder Virk
 * @since v1.0.5
 * @description Parser to parse rules and convert into consumable objects
 * @singleton
###


_            = require 'lodash'
MESSAGES     = new(require './messages')


class Parser

  instance = null

  constructor: () ->
    if !instance then instance = this
    return instance


  ###*
   * Parse entry level rules into nested object
   * @param  {[string]} rules - Object to rule string
  ###
  parseRules: (rules,return_data,toKey) ->
    self = @
    _.transform rules, (result,rule,key) ->
      if not return_data then return_data = result
      if toKey then key = "#{toKey}.#{key}"

      if                  'object' is typeof rule
      then                self.parseRules rule,return_data,key
      else                return_data[key] = _.compact rule.split "|"


  ###*
    * method to parse a single rule and return
    * rule applied, arguments and error message to display
    * @param {String} rule Rule to parse against a field
    * @param {String} key field name
  ###
  parseRule: (rule,key,value) ->
    [defination,args]   = rule.split ":"
    message             = MESSAGES.buildMessage defination,key,args,value

    ## converting _ to camelcase
    rule          = defination.replace /_([a-z])/g , (g) -> g[1].toUpperCase()
    {rule,args,message}


module.exports = Parser