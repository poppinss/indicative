"use strict"
###*
 * @author Harminder Virk
 * @since v1.0.5
 * @description Error class to manage error stack
 * @singleton
###


class Errors

  instance = null
  errors : []

  constructor: () ->
    if !instance then instance = this
    return instance


  ## Removing all errors from errors array
  cleanErrors: () ->
    @errors = []

  ## Push an error to errors array
  pushError: (errStack) ->
    @errors.push errStack

  ## Get list of errors inside errors array
  getErrors: () ->
    @errors

module.exports = Errors