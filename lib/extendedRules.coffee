"use strict"
###*
 * @author Harminder Virk
 * @since v0.6
 * @description Container of extended rules
###

###*
 * @requires IS,LODASH,BLUEBIRD,MOMENT=>(Date library)
###

IS           = require "is_js"
_            = require "lodash"
PROMISE      = require "bluebird"
MOMENT       = require "moment"


###*
  * @class ExtendedRules
###
class ExtendedRules


  ###*
   * @var {Object} Using validations object and storing methods inside it
  ###
  validations:

    ###*
     * Make sure field under validation is accepted
     * @param  {[object]}   data  [global data object]
     * @param  {[string]}   field [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @return {[promise]}  returns final promise
    ###
    accepted : (data,field,message) ->
      new PROMISE (resolve,reject) ->
        if        (_.has data,field) \
        and       IS.truthy data[field]
        then      resolve "is boolean"
        else      reject message


    ###*
     * Make sure field under validation is after {defined} date
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    after : (data,field,message,args) ->
      [date] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        MOMENT(data[field]).isAfter date
        then      resolve "is after date"
        else      reject message


    ###*
     * Executes defined regex on value for a given
     * field.
     * @method regex
     * @param  {Object} data    [description]
     * @param  {String} field   [description]
     * @param  {String} message [description]
     * @param  {String} args    [description]
     * @return {Promise}         [description]
    ###
    regex: (data,field,message,args) ->
      new PROMISE (resolve, reject) ->
        if        (not data[field]) \
        or        new RegExp(args).test(data[field])
        then      resolve "regex passed"
        else      reject message


    ###*
     * Make sure field under validation is on {defined} day
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###

    day : (data,field,message,args) ->
      [day] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.day(new Date(data[field]),day)
        then      resolve "is a valid day"
        else      reject message



    ###*
     * Make sure field under validation is on {defined} month
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###

    month : (data,field,message,args) ->
      [month] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.month(new Date(data[field]),month)
        then      resolve "is a valid month"
        else      reject message



    ###*
     * Make sure field under validation is on {defined} year
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###

    year : (data,field,message,args) ->
      [year] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.year(new Date(data[field]),parseInt(year))
        then      resolve "is a valid year"
        else      reject message



    ###*
     * Make sure field under validation is alpha only
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @return {[promise]}  returns final promise
    ###
    alpha : (data,field,message) ->
      letters = /^[A-Za-z]+$/
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        letters.test data[field]
        then      resolve "is alpha"
        else      reject message


    ###*
     * Make sure field under validation is before {defined} date
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    before : (data,field,message,args) ->
      [date] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        MOMENT(data[field]).isBefore date
        then      resolve "is after date"
        else      reject message


    ###*
     * Make sure field under validation must be a valid date
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @return {[promise]}  returns final promise
    ###
    date : (data,field,message) ->
      formats = ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD","YYYY/MM/DD"]
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        (MOMENT data[field],formats,true).isValid()
        then      resolve "is valid date"
        else      reject message


    ###*
     * Make sure field under validation must be a valid date
     * with specified format
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    dateFormat : (data,field,message,args) ->
      format = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        (MOMENT data[field],format,true).isValid()
        then      resolve "is valid date"
        else      reject message


    ###*
     * Make sure field under validation falls in given array of data
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    in : (data,field,message,args) ->
      with_in = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.inArray data[field],with_in
        then      resolve "is in array"
        else      reject message


    ###*
     * Make sure field under validation does not falls in given array of data
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    notIn : (data,field,message,args) ->
      with_not_in = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.not.inArray data[field],with_not_in
        then      resolve "is in array"
        else      reject message


    ###*
     * Make sure field under validation is required
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @return {[promise]}  returns final promise
    ###
    required : (data,field,message) ->
      new PROMISE (resolve,reject) ->
        if        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is present"
        else      reject message


    ###*
     * Make sure field under validation is required with additional condition
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    requiredIf : (data,field,message,args) ->
      [with_field,value] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,with_field) \
        or        (IS.not.equal data[with_field],value) \
        or        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is equal"
        else      reject message


    ###*
     * Make sure field under validation is required with any of the conditions
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    requiredWithAny : (data,field,message,args) ->
      with_any_fields = args.split ","
      intersection = _.intersection (_.keys data),with_any_fields
      new PROMISE (resolve,reject) ->
        if        (_.size intersection) is 0 \
        or        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is equal"
        else      reject message


    ###*
     * Make sure field under validation is required without
     * any of the conditions
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    requiredWithoutAny : (data,field,message,args) ->
      with_any_fields = args.split ","
      intersection = _.intersection (_.keys data),with_any_fields
      new PROMISE (resolve,reject) ->
        if        (_.size intersection) is (_.size with_any_fields) \
        or        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is equal"
        else      reject message

    ###*
     * Make sure field under validation is required with all of the conditions
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    requiredWithAll : (data,field,message,args) ->
      with_any_fields = args.split ","
      intersection = _.intersection (_.keys data),with_any_fields
      new PROMISE (resolve,reject) ->
        if        (_.size intersection) isnt (_.size with_any_fields) \
        or        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is equal"
        else      reject message


    ###*
     * Make sure field under validation is required without all
     * of the conditions
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    requiredWithoutAll : (data,field,message,args) ->
      with_any_fields = args.split ","
      intersection = _.intersection (_.keys data),with_any_fields
      new PROMISE (resolve,reject) ->
        if        (_.size intersection) isnt 0 \
        or        (_.has data,field) \
        and       IS.truthy data[field] \
        and       IS.existy data[field] \
        and       IS.not.empty data[field]
        then      resolve "is equal"
        else      reject message


    ###*
     * Make sure field under validation is same as given field
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    same : (data,field,message,args) ->
      [same_as] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.equal data[field],data[same_as]
        then      resolve "is same"
        else      reject message


    ###*
     * Make sure field under validation is equal to the given value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    equals : (data,field,message,args) ->
      [same_as] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.equal data[field],same_as
        then      resolve "is equal"
        else      reject message

    ###*
     * Make sure field under validation does not equal to the given value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    notEquals : (data,field,message,args) ->
      [same_as] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.not.equal data[field],same_as
        then      resolve "is not equal"
        else      reject message

    ###*
     * Make sure field under validation value is different
     * from the given field value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    different : (data,field,message,args) ->
      [same_as] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.not.equal data[field],data[same_as]
        then      resolve "is different"
        else      reject message


    ###*
     * Make sure field under validation must be between given range
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    range : (data,field,message,args) ->
      [start,end] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        _.inRange data[field],start,end
        then      resolve "is in range"
        else      reject message

    ###*
     * Make sure field under validation value has minimum value of
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    min : (data,field,message,args) ->
      [desired_length] = args.toString().split ","

      ## to calc integers length too
      data[field] = if typeof(data[field]) isnt 'undefined' then data[field].toString() else data[field]

      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        (_.size data[field]) >= parseInt desired_length
        then      resolve "is different"
        else      reject message

    ###*
     * Make sure field under validation value has maximum value of
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    max : (data,field,message,args) ->
      [desired_length] = args.toString().split ","

      ## to calc integers length too
      data[field] = if typeof(data[field]) isnt 'undefined' then data[field].toString() else data[field]

      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        (_.size data[field]) <= parseInt desired_length
        then      resolve "is different"
        else      reject message

    ###*
     * Make sure field under validation value has is above the given value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    above : (data,field,message,args) ->
      [min] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.above parseInt(data[field]),parseInt min
        then      resolve "is above"
        else      reject message


    ###*
     * Make sure field under validation value has is above the given value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    under : (data,field,message,args) ->
      [min] = args.toString().split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.under parseInt(data[field]),parseInt min
        then      resolve "is under"
        else      reject message


    ###*
     * Make sure field under validation value has is above the given value
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    includes : (data,field,message,args) ->
      [substring] = args.split ","

      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        _.contains data[field],substring
        then      resolve "does include"
        else      reject message


    ###*
     * Make sure the field under validation starts with given string
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    startsWith : (data,field,message,args) ->
      [substring] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.startWith data[field],substring
        then      resolve "does starts with"
        else      reject message

    ###*
     * Make sure the field under validation ends with given string
     * @param  {[object]}   data    [global data object]
     * @param  {[string]}   field   [field to be validated]
     * @param  {[string]}   message [message to be printed]
     * @param  {[string]}   args    [arguments passed along with validator]
     * @return {[promise]}  returns final promise
    ###
    endsWith : (data,field,message,args) ->
      [substring] = args.split ","
      new PROMISE (resolve,reject) ->
        if        (not _.has data,field) \
        or        IS.endWith data[field],substring
        then      resolve "does ends with"
        else      reject message

module.exports = ExtendedRules