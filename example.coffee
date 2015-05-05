
"use strict"

Validator = require "./lib/validator"
_         = require "lodash"

rules =
  'name'      : 'required|alpha|includes:am|startsWith:am|endsWith:rk|'
  'email'     : 'required|email'
  'join_from' : 'future'
  'signin'    : 'today'
  'terms'     : 'accepted'
  'reverse'   : 'palindrome'
  'blog'      : 'url'
  'status'    : 'required_with_any:name,phone_no'
  'is_admin'  : 'required_with_all:name,phone_no|boolean'
  'acl'       : 'required_without_all:is_admin,status'
  'cars'      : 'required|array'
  'password'  : 'min:4|max:10'
  'password_c': 'same:password'
  'dob'       : 'after:2015-03-10|before:2015-05-15'
  'created_on': 'date_format:YYYY-MM-DD'
  'score'     : 'above:30|under:39'
  'age'       : 'required_if:email,virk.officials@gmail.com|range:18,24'

data =
  'name'      : 'amanvirk'
  'signin'    : '2015-04-29'
  'phone_no'  : 102
  'age'       : '23'
  'is_admin'  : true
  'reverse'   : 'ama'
  'status'    : 'active'
  'password'  : 'amanovirk1'
  'password_c': 'amanovirk1'
  'join_from' : '2015-04-31'
  'dob'       : '2015-04-29'
  'blog'      : 'amanvirk.me'
  'cars'      : ['bmw']
  'terms'     : 'wow'
  'score'     : '38'
  'created_on': '2015-10-20'
  'email'     : 'virk.officials@gmail.com'

messages =
  'required'      : 'Enter %field%'
  'name.required' : 'Need your name'
  'future'        : 'This is not in futute'
  'url'           : 'Blog address is not valid'
  'age.number'    : 'This is not a valid age'


v = new Validator()

phone_no = (data,field,message,args) ->
  self = this;
  new Promise (resolve,reject) ->
    if (not _.has data,field) or self.IS.number data[field]
      resolve 'is valid phone'
    else
      reject message


today = (data,field,message,args) ->
  self = this;
  new Promise (resolve,reject) ->
    if (not _.has data,field) or self.IS.today data[field]
      resolve 'is valid day'
    else
      reject message


v.extend 'number', 'Enter valid number',phone_no
# v.extend 'today', 'Date should be today',today

console.time 'validating'

v.validateAll rules,data,messages
.then (good) ->
  console.log 'good>>',good
.catch (err) ->
  console.log 'err>>',err
.finally () ->
  console.timeEnd 'validating'