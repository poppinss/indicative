"use strict"

###*
 * @author Harminder Virk
 * @since v1.0.5
 * @description Class to store error messages, build them as per priority
###

_            = require 'lodash'

class Messages

  instance = null
  CVM : {}



  normalizeMessages: (data,return_data,toKey) ->
    self = @

    _.transform data, (result,item,key) ->
      if not return_data then return_data = result
      if toKey then key = "#{toKey}.#{key}"

      if                  'object' is typeof item
      then                self.normalizeMessages item,return_data,key
      else                return_data[key]  = item


  constructor: () ->
    if !instance then instance = this
    return instance

  destructor: () ->
    @CVM = {}

  ###*
   * Return best possible error message
   * @param  {[string]} Validation name
   * @param  {[string]} Field name
   * @return {[string]} Constructed message
  ###
  buildMessage : (validation,field) ->
    field = "#{field}.#{validation}"
    if @CVM[field]? then                   md = "#{@CVM[field]}"
    else if @CVM[validation]? then         md = @CVM[validation]
    else                                   md = "#{validation} validation failed on %field%"
    md.replace '%field%',field

  ###*
   * Setting a single message to CVM object
   * @param { String} name message unique name
   * @param {String} message message to print
  ###
  setMessage: (name,message) ->
    @CVM[name] = message

  ###*
   * Setting hash of messages
   * @param {Object} Object to store after converting .[dot] value to nested objects
  ###
  setMessages: (hash) ->
    hash or= {}
    if _.size hash
      hash = @normalizeMessages hash
    @CVM  = hash


module.exports = Messages