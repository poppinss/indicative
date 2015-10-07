"use strict"
###*
 * @author Harminder Virk
 * @since v0.6
 * @description Container of different rules , each returns a promise
###

###*
 * @requires IS,LODASH,BLUEBIRD,EXTENDED RULES
###
IS                 = require 'is_js'
_                  = require 'lodash'
PROMISE            = require 'bluebird'
EXTENDED_RULES     = require './extendedRules'



###*
  * @class Rules
  * @extends {Class} EXTENDED_RULES
###

class Rules extends EXTENDED_RULES

  ###*
   * @constructor Registers series of dynamic methods based of their nature
   * @uses        IS.js
  ###
  constructor : () ->

    ###*
     * @var {Object} Access to this
    ###
    self = @

    ###*
     * Family of regex rules
     * @type {Array}
    ###
    regex = [
      'url'
      'email'
      'creditCard'
      'alphaNumeric'
      'socialSecurityNumber'
      'hexadecimal'
      'hexColor'
      'ip'
      'ipv4'
      'ipv6'
    ]

    ###*
     * Family of dates rules
     * @type {Array}
    ###
    dates = [
      'today'
      'yesterday'
      'tomorrow',
      'past',
      'future'
      'weekday',
      'weekend'
    ]

    ###*
     * Family of types rules
     * @type {Array}
    ###
    types = [
      'array'
      'boolean'
      'null'
      'number'
      'object'
      'json'
      'string'
    ]

    ###*
     * Family of strings rules
     * @type {Array}
    ###
    strings = [
      'upperCase'
      'lowerCase'
      'capitalized'
      'palindrome'
    ]

    ###*
     * Family of arthmetic rules
     * @type {Array}
    ###
    arthmetic = [
      'even'
      'odd'
      'positive'
      'negative'
      'decimal'
      'integer'
      'finite'
      'infinite'
    ]

    ###*
     * @var {Array} Concating above families to single array
    ###
    methods = Array.prototype.concat dates,regex,types,strings,arthmetic

    _.map methods, (method) ->
      self.validations[method] = (data,field,message) ->
        if       (_.includes dates,method) \
        and      (_.has data,field) \
        and      new Date data[field] isnt 'Invalid Date'
        then     data[field] = new Date data[field]

        new PROMISE (resolve,reject) ->
          if        (not data[field]) \
          or        IS[method] data[field]
          then      resolve "is #{method}"
          else      reject message

module.exports = Rules
