"use strict"

###*
 * @author Harminder Virk
 * @since v0.6
 * @description Expressions to deep object parser, validator
 * and message constructor
 * @example
 * somefield = required|min:8 will be parsed to
 * { name:['required','min:8'] }
 * later each rule is validated using defined methods
###

_            = require 'lodash'
IS           = require 'is_js'

MESSAGES     = require './messages'
RULES        = require './rules'
PROMISE      = require 'bluebird'
ASYNC        = require 'async'
DOT          = require 'dot-object'


###*
 * @class Validator
 * @extends {Class} RULES
###

class Validator extends RULES

  # Access to raw `IS` object ,
  # to run Manual validations
  IS: IS


  # singleton instance holder
  instance = null


  # global private property
  # to save custom error messages
  CVM = {}


  # global private property
  # to save list of messages to return
  GE = []


  constructor: ->
    if !instance then instance = this
    super()
    return instance

  # private method to parse hash of rules
  _parseRules = (rules) ->
    _.transform rules, (result,rule,key) -> result[key] = rule.split "|"


  # private method to parse a single rule and return
  # rule applied, arguments and error message to display
  _parseRule = (rule,key) ->
    [defination,args]   = rule.split ":"
    message             = _messages defination,key

    ## converting _ to camelcase
    defination          = defination.replace /_([a-z])/g , (g) -> g[1].toUpperCase()

    {defination,args,message}


  ###*
   * Return best possible error message
   * @param  {[string]} Validation name
   * @param  {[string]} Field name
   * @return {[string]} Constructed message
  ###
  _messages = (validation,field) ->
    if CVM[field]?[validation] then       md = CVM[field][validation]
    else if CVM[validation]? then         md = CVM[validation]
    else if MESSAGES[validation]? then    md = MESSAGES[validation]
    else                                  md = "#{validation} validation failed on %field%"

    md.replace '%field%',field

  ###*
   * validating single field with array of rules
   * @param  {[object]}   access to class this property
   * @param  {[object]}   data object
   * @param  {[array]}    rules array for single field
   * @param  {[string]}   field name
   * @return {[promise]}
  ###
  _validateField = (self,data,rules,field) ->

    new PROMISE (resolve,reject) ->
      PROMISE.reduce (_.keys rules), (t,f) ->
        {defination,args,message} = _parseRule rules[f],field
        self.validations[defination].call self, data,field,message,args
        .catch (err) ->
          GE.push {field:field,message:err,rule:defination}
          reject GE
      , 0
      .then resolve
      .catch reject

  ###*
   * Public method to invoke validations
   * @param  {[object]}   object to rules
   * @param  {[data]}     object of data to apply rules on
   * @param  {[message]}  object of custom messages
   * @return {[promise]}
  ###
  validateAll : (rulesHash,data,messages) ->
    self = @
    CVM = messages || {}
    GE = []
    rH = _parseRules rulesHash

    if _.size messages
      DOT.object messages

    validateAsync = (index,cb) ->
      _validateField self,data,rH[index],index
      .then (success) -> cb null,success
      .catch (err)    -> cb err,null

    new PROMISE (resolve,reject) ->
      ASYNC.filter (_.keys rH), validateAsync , (err,results) ->
        if _.size err then reject GE else resolve data

  ###*
   * Public method to invoke validations and break on first error
   * @param  {[object]}   object to rules
   * @param  {[data]}     object of data to apply rules on
   * @param  {[message]}  object of custom messages
   * @return {[promise]}
  ###
  validate : (rulesHash,data,messages) ->
    self = @
    CVM  = messages || {}
    GE   = []
    rH   = _parseRules rulesHash

    if _.size messages
      DOT.object messages

    new PROMISE (resolve,reject) ->
      PROMISE.reduce _.keys(rH), (t,field) ->
        rules = rH[field]
        _validateField self,data,rules,field
      , 0
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
    self = @
    self.validations[name] = func_body
    MESSAGES[name] = message

module.exports = Validator