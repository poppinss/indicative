"use strict"

###*
 * @author Harminder Virk
 * @since v1.0.5
 * @description Class to store error messages, build them as per priority
###

_            = require 'lodash'
UTILS        = require "./utils"
_.templateSettings =
  interpolate: /{{([\s\S]+?)}}/g


class Messages

  instance = null

  constructor: () ->
    if !instance then instance = this
    @CVM = {}
    return instance


  destructor: ->
    @CVM = {}

  ###*
   * Return best possible error message
   * @param  {[string]} Validation name
   * @param  {[string]} Field name
   * @return {[string]} Constructed message
  ###
  buildMessage : (rule,field,args,value) ->
    argument      = args?.split ","
    templateData  = {field,argument,rule,value}

    fieldNotation = "#{field}.#{rule}"
    if @CVM[fieldNotation]? then           md = @CVM[fieldNotation]
    else if @CVM[rule]? then               md = @CVM[rule]
    else                                   md = "{{rule}} validation failed on {{field}}"

    expression = new RegExp "(?:\\.)(\\w)(?:}})","g"
    matches    = md.match(expression)

    md = md.replace expression, "[$1]}}"
    template = _.template(md)
    template(templateData)


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
      hash = UTILS.convert_object_to_dot_notation {},hash
    @CVM  = hash


module.exports = Messages