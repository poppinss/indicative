"use strict"

###*
 * @author Harminder Virk
 * @since v0.6
 * @description Expressions to deep object parser, validator
 * and message constructor
###

_            = require 'lodash'
IS           = require 'is_js'

PARSER       = require './parser'
ERRORS       = require './errors'
RULES        = require './rules'
MESSAGES     = new(require './messages')
PROMISE      = require 'bluebird'
ASYNC        = require 'async'
UTILS        = require "./utils"
DOT          = require "dot-object"


###*
 * @class Validator
 * @extends {Class} RULES
###

class Validator extends RULES

  # Access to raw `IS` object ,
  # to run Manual validations
  'is': IS

  # singleton instance holder
  instance = null


  constructor: ->
    if !instance then instance = this
    super()
    return instance


  initiate: (messages) ->
    ERRORS::cleanErrors()
    MESSAGES.destructor()
    MESSAGES.setMessages messages


  ###*
   * validating single field with array of rules
   * @param  {[object]}   access to class this property
   * @param  {[object]}   data object
   * @param  {[array]}    rules array for single field
   * @param  {[string]}   field name
   * @return {[promise]}
  ###
  validateField : (data,rules,field) ->

    self = @

    new PROMISE (resolve,reject) ->

      PROMISE.reduce (_.keys rules), (t,f) ->

        {rule,args,message} = PARSER::parseRule rules[f],field,data[field]

        self.validations[rule].call self,data,field,message,args
        .catch (message) ->
          ERRORS::pushError {field,message,rule}
          reject ERRORS::getErrors()
      , 0

      .then resolve
      .reject

  ###*
   * Public method to invoke validations
   * @param  {[object]}   object to rules
   * @param  {[data]}     object of data to apply rules on
   * @param  {[message]}  object of custom messages
   * @return {[promise]}
  ###
  validateAll : (rulesHash,data,messages) ->
    self = @
    @initiate(messages)

    parsedRules    = PARSER::parseRules rulesHash
    ruleCopy       = rulesHash
    DOT.object(ruleCopy)
    normalizedData = UTILS.convert_object_to_dot_notation ruleCopy,data

    validateAsync = (index,cb) ->
      self.validateField normalizedData,parsedRules[index],index
      .then (success) -> cb null,success
      .catch (err)    -> cb err,null

    new PROMISE (resolve,reject) ->
      ASYNC.filter (_.keys parsedRules), validateAsync , (err,results) ->
        if _.size err
          reject ERRORS::getErrors()
        else
          resolve data


  ###*
   * Public method to invoke validations and break on first error
   * @param  {[object]}   object to rules
   * @param  {[data]}     object of data to apply rules on
   * @param  {[message]}  object of custom messages
   * @return {[promise]}
  ###
  validate : (rulesHash,data,messages) ->

    self = @
    @initiate(messages)

    parsedRules    = PARSER::parseRules rulesHash
    ruleCopy       = rulesHash
    DOT.object(ruleCopy)

    normalizedData = UTILS.convert_object_to_dot_notation ruleCopy,data

    new PROMISE (resolve,reject) ->
      PROMISE.reduce _.keys(parsedRules), (t,field) ->
        self.validateField normalizedData,parsedRules[field],field
      ,0
      .then () -> resolve data
      .catch reject


  ###*
   * Interface to extend validator class
   * @param  {[string]} Name of the validator
   * @param  {[function]} Function body
   * @param  {[message]} Error message to return on erro
   * @return {[void]}
  ###
  extend: (name,message,func_body) ->
    @validations[name] = func_body
    MESSAGES.setMessage name,message


module.exports = Validator