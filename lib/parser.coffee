"use strict"


###*
 * @author Harminder Virk
 * @since v1.0.5
 * @description Parser to parse rules and convert into consumable objects
 * @singleton
###


_            = require 'lodash'
MESSAGES     = require './messages'


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
    _.each rules, (rule,key) ->
      ## if toKey is there, join it with new key
      ## using dot
      # if toKey
      #   key             = "#{toKey}.#{key}"

      # if 'object' is typeof rule
      #   self.parseRules rule,return_data,key
      # else
        return_data[key] = _.compact rule.split "|"


  ###*
   * Normalize data
  ###
  normalizeData: (data,return_data,toKey) ->
    self = @
    _.each data, (item,key) ->
      # if toKey
      #   key             = "#{toKey}.#{key}"

      # if 'object' is typeof item
      #   self.normalizeData item,return_data,key
      # else
        return_data[key]  = item


  ###*
    * method to parse a single rule and return
    * rule applied, arguments and error message to display
    * @param {String} rule Rule to parse against a field
    * @param {String} key field name
  ###
  parseRule: (rule,key) ->
    [defination,args]   = rule.split ":"
    message             = MESSAGES::buildMessage defination,key

    ## converting _ to camelcase
    rule          = defination.replace /_([a-z])/g , (g) -> g[1].toUpperCase()
    {rule,args,message}


module.exports = Parser