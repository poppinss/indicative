'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const Is = require('../src/Raw')
const addMonths = require('date-fns/add_months')
const subMonths = require('date-fns/sub_months')

test.group('Raw | Types', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  test('should return true when input is an array', function (assert) {
    const isArray = Is.array(['22', '12'])
    assert.equal(isArray, true)
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  test('should return false when input is an object', function (assert) {
    const isArray = Is.array({age: 22})
    assert.equal(isArray, false)
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  test('should return false when input is a string', function (assert) {
    const isArray = Is.array('input')
    assert.equal(isArray, false)
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should return true when input is a boolean', function (assert) {
    const isBoolean = Is.boolean(true)
    assert.equal(isBoolean, true)
  })

  // ////////////////
  // test suite 5 //
  // ////////////////
  test('should return true when input is a negative boolean', function (assert) {
    const isBoolean = Is.boolean(false)
    assert.equal(isBoolean, true)
  })

  // ////////////////
  // test suite 6 //
  // ////////////////
  test('should return true when input is a numeric true/false state', function (assert) {
    const isBoolean = Is.boolean(1)
    assert.equal(isBoolean, true)
  })

  // ////////////////
  // test suite 7 //
  // ////////////////
  test('should return false when input is a string', function (assert) {
    const isBoolean = Is.boolean('true')
    assert.equal(isBoolean, false)
  })

  // ////////////////
  // test suite 8 //
  // ////////////////
  test('should return true when input is a date', function (assert) {
    const isDate = Is.date(new Date())
    assert.equal(isDate, true)
  })

  // ////////////////
  // test suite 9 //
  // ////////////////
  test('should return true when input is string representation of date', function (assert) {
    const isDate = Is.date('2015-11-30')
    assert.equal(isDate, true)
  })

  // ////////////////
  // test suite 10 //
  // ////////////////
  test('should return false when input is invalid string representation of date', function (assert) {
    const isDate = Is.date('2015-11-40')
    assert.equal(isDate, false)
  })

  // /////////////////
  // test suite 11 //
  // /////////////////
  test('should not convert date string to instance when strict is enabled', function (assert) {
    const isDate = Is.date('2015-11-30', true)
    assert.equal(isDate, false)
  })

  // /////////////////
  // test suite 12 //
  // /////////////////
  test('should return true when input is a function', function (assert) {
    const isFunction = Is.function(function () {})
    assert.equal(isFunction, true)
  })

  // /////////////////
  // test suite 13 //
  // /////////////////
  test('should return false when input is a string', function (assert) {
    const isFunction = Is.function('function () {}')
    assert.equal(isFunction, false)
  })

  // /////////////////
  // test suite 14 //
  // /////////////////
  test('should return true when input is a native javascript function', function (assert) {
    const isFunction = Is.function(toString)
    assert.equal(isFunction, true)
  })

  // /////////////////
  // test suite 15 //
  // /////////////////
  test('should return true when input is null', function (assert) {
    const isNull = Is.null(null)
    assert.equal(isNull, true)
  })

  // /////////////////
  // test suite 16 //
  // /////////////////
  test('should return false when input is undefined', function (assert) {
    const isNull = Is.null(undefined)
    assert.equal(isNull, false)
  })

  // /////////////////
  // test suite 17 //
  // /////////////////
  test('should return false when input is empty', function (assert) {
    const isNull = Is.null('')
    assert.equal(isNull, false)
  })

  // /////////////////
  // test suite 18 //
  // /////////////////
  test('should return true when input is a number', function (assert) {
    const isNumber = Is.number(10)
    assert.equal(isNumber, true)
  })

  // /////////////////
  // test suite 19 //
  // /////////////////
  test('should return true when input is constructed using Number method', function (assert) {
    const isNumber = Is.number(Number('10'))
    assert.equal(isNumber, true)
  })

  // /////////////////
  // test suite 20 //
  // /////////////////
  test('should return false when input is a string', function (assert) {
    const isNumber = Is.number('10')
    assert.equal(isNumber, false)
  })

  // /////////////////
  // test suite 21 //
  // /////////////////
  test('should return true when input is an object', function (assert) {
    const isObject = Is.object({name: 'virk'})
    assert.equal(isObject, true)
  })

  // /////////////////
  // test suite 22 //
  // /////////////////
  test('should return false when input is not a stringify object', function (assert) {
    const isObject = Is.object(JSON.stringify({name: 'virk'}))
    assert.equal(isObject, false)
  })

  // /////////////////
  // test suite 23 //
  // /////////////////
  test('should return true when input is json', function (assert) {
    const isJson = Is.json(JSON.stringify({name: 'virk'}))
    assert.equal(isJson, true)
  })

  // /////////////////
  // test suite 24 //
  // /////////////////
  test('should return false when input is an object', function (assert) {
    const isJson = Is.json({name: 'virk'})
    assert.equal(isJson, false)
  })

  // /////////////////
  // test suite 25 //
  // /////////////////
  test('should return true when input is a string', function (assert) {
    const isString = Is.string('hello')
    assert.equal(isString, true)
  })

  // /////////////////
  // test suite 26 //
  // /////////////////
  test('should return true when input is created using string class', function (assert) {
    const isString = Is.string(String(10))
    assert.equal(isString, true)
  })

  // /////////////////
  // test suite 27 //
  // /////////////////
  test('should return false when input is not a string', function (assert) {
    const isString = Is.string(10)
    assert.equal(isString, false)
  })

  // /////////////////
  // test suite 28 //
  // /////////////////
  test('should return true when 2 inputs are of same type', function (assert) {
    const isSameType = Is.sameType(10, 10)
    assert.equal(isSameType, true)
  })
})

test.group('Raw | Presence', function () {
  // /////////////////
  // test suite 29 //
  // /////////////////
  test('should return true when object is empty', function (assert) {
    const isEmpty = Is.empty({})
    assert.equal(isEmpty, true)
  })

  // /////////////////
  // test suite 30 //
  // /////////////////
  test('should return true when array is empty', function (assert) {
    const isEmpty = Is.empty([])
    assert.equal(isEmpty, true)
  })

  // /////////////////
  // test suite 31 //
  // /////////////////
  test('should return true when empty string has been passed', function (assert) {
    const isEmpty = Is.empty('')
    assert.equal(isEmpty, true)
  })

  // /////////////////
  // test suite 32 //
  // /////////////////
  test('should return true when null is passed', function (assert) {
    const isEmpty = Is.empty(null)
    assert.equal(isEmpty, true)
  })

  // /////////////////
  // test suite 33 //
  // /////////////////
  test('should return true when undefined is passed', function (assert) {
    const isEmpty = Is.empty(undefined)
    assert.equal(isEmpty, true)
  })

  // /////////////////
  // test suite 34 //
  // /////////////////
  test('should return false when number is passed', function (assert) {
    const isEmpty = Is.empty(220)
    assert.equal(isEmpty, false)
  })

  // /////////////////
  // test suite 35 //
  // /////////////////
  test('should return false when date is passed', function (assert) {
    const isEmpty = Is.empty(new Date())
    assert.equal(isEmpty, false)
  })

  // /////////////////
  // test suite 36 //
  // /////////////////
  test('should return false when string with value is passed', function (assert) {
    const isEmpty = Is.empty('hello')
    assert.equal(isEmpty, false)
  })

  // /////////////////
  // test suite 37 //
  // /////////////////
  test('should return true when value exists but is an empty object', function (assert) {
    const isExisty = Is.existy({})
    assert.equal(isExisty, true)
  })

  // /////////////////
  // test suite 38 //
  // /////////////////
  test('should return false when value is null', function (assert) {
    const isExisty = Is.existy(null)
    assert.equal(isExisty, false)
  })

  // /////////////////
  // test suite 39 //
  // /////////////////
  test('should return false when value is undefined', function (assert) {
    const isExisty = Is.existy(undefined)
    assert.equal(isExisty, false)
  })

  // /////////////////
  // test suite 40 //
  // /////////////////
  test('should return false when value is empty string', function (assert) {
    const isExisty = Is.existy('')
    assert.equal(isExisty, false)
  })

  // /////////////////
  // test suite 41 //
  // /////////////////
  test('should return true when value is a positive boolean', function (assert) {
    const isTruthy = Is.truthy(true)
    assert.equal(isTruthy, true)
  })

  // /////////////////
  // test suite 42 //
  // /////////////////
  test('should return true when value is a string', function (assert) {
    const isTruthy = Is.truthy('true')
    assert.equal(isTruthy, true)
  })

  // /////////////////
  // test suite 43 //
  // /////////////////
  test('should return false when value is false', function (assert) {
    const isTruthy = Is.truthy(false)
    assert.equal(isTruthy, false)
  })

  // /////////////////
  // test suite 44 //
  // /////////////////
  test('should return false when value is 0', function (assert) {
    const isTruthy = Is.truthy(0)
    assert.equal(isTruthy, false)
  })

  // /////////////////
  // test suite 45 //
  // /////////////////
  test('should return true when value is 0', function (assert) {
    const isFalsy = Is.falsy(0)
    assert.equal(isFalsy, true)
  })

  // /////////////////
  // test suite 46 //
  // /////////////////
  test('should return true when value is false', function (assert) {
    const isFalsy = Is.falsy(false)
    assert.equal(isFalsy, true)
  })

  // /////////////////
  // test suite 47 //
  // /////////////////
  test('should return false when value is a string', function (assert) {
    const isFalsy = Is.falsy('false')
    assert.equal(isFalsy, false)
  })

  // /////////////////
  // test suite 48 //
  // /////////////////
  test('should return true when value is an empty string', function (assert) {
    const isFalsy = Is.falsy('')
    assert.equal(isFalsy, true)
  })
})

test.group('Raw | Regexp', function () {
  // /////////////////
  // test suite 49 //
  // /////////////////
  test('should return false when input is not a valid url', function (assert) {
    const isUrl = Is.url('foo')
    assert.equal(isUrl, false)
  })

  // /////////////////
  // test suite 50 //
  // /////////////////
  test('should return false when input does not contain protocol', function (assert) {
    const isUrl = Is.url('www.foo.com')
    assert.equal(isUrl, false)
  })

  // /////////////////
  // test suite 51 //
  // /////////////////
  test('should return true when input is a valid http url', function (assert) {
    const isUrl = Is.url('http://foo.com')
    assert.equal(isUrl, true)
  })

  // /////////////////
  // test suite 52 //
  // /////////////////
  test('should return true when input is a valid https url', function (assert) {
    const isUrl = Is.url('https://foo.com')
    assert.equal(isUrl, true)
  })

  // /////////////////
  // test suite 53 //
  // /////////////////
  test('should return true when input contains something else than .com', function (assert) {
    const isUrl = Is.url('https://foo.in')
    assert.equal(isUrl, true)
  })

  // /////////////////
  // test suite 54 //
  // /////////////////
  test('should return true when input contains multi level TLD', function (assert) {
    const isUrl = Is.url('https://foo.co.in')
    assert.equal(isUrl, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input contains 63 characters TLD', function (assert) {
    const isUrl = Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk')
    assert.equal(isUrl, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return false when input contains more than 63 characters TLD', function (assert) {
    const isUrl = Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl')
    assert.equal(isUrl, false)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input contains only localhost', function (assert) {
    const isUrl = Is.url('http://localhost')
    assert.equal(isUrl, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input contains localhost with port', function (assert) {
    const isUrl = Is.url('http://localhost:80')
    assert.equal(isUrl, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when domain name part contains 1 character', function (assert) {
    const isUrl = Is.url('https://t.co')
    assert.equal(isUrl, true)
  })

  // /////////////////
  // test suite 55 //
  // /////////////////
  test('should return false when input is not a valid email', function (assert) {
    const isEmail = Is.email('mail')
    assert.equal(isEmail, false)
  })

  // /////////////////
  // test suite 56 //
  // /////////////////
  test('should return false when input is a url instead of email', function (assert) {
    const isEmail = Is.email('http://foo.com')
    assert.equal(isEmail, false)
  })

  // /////////////////
  // test suite 57 //
  // /////////////////
  test('should return true when input is a valid email address', function (assert) {
    const isEmail = Is.email('someone@example.com')
    assert.equal(isEmail, true)
  })

  // /////////////////
  // test suite 58 //
  // /////////////////
  test('should return true when input is a valid email address with different TLD', function (assert) {
    const isEmail = Is.email('someone@example.org')
    assert.equal(isEmail, true)
  })

  // /////////////////
  // test suite 59 //
  // /////////////////
  test('should return true when input is a valid email address with 63 characters TLD', function (assert) {
    const isEmail = Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk')
    assert.equal(isEmail, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return false when input is not a valid email address with more than 63 characters TLD', function (assert) {
    const isEmail = Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl')
    assert.equal(isEmail, false)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input is a valid phone number', function (assert) {
    const isPhone = Is.phone('1235599809')
    assert.equal(isPhone, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input is a valid phone number with hyphens', function (assert) {
    const isPhone = Is.phone('123-559-9809')
    assert.equal(isPhone, true)
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should return true when input is a valid fax phone number ', function (assert) {
    const isPhone = Is.phone('123.559.9809')
    assert.equal(isPhone, true)
  })

  // /////////////////
  // test suite 60 //
  // /////////////////
  test('should return false when input is not a valid credit card number', function (assert) {
    const isCreditCard = Is.creditCard('3685-1600-4490-1023')
    assert.equal(isCreditCard, false)
  })

  // /////////////////
  // test suite 61 //
  // /////////////////
  test('should return true when input is not a valid credit card number', function (assert) {
    const isCreditCard = Is.creditCard('4444-4444-4444-4444')
    assert.equal(isCreditCard, true)
  })

  // /////////////////
  // test suite 62 //
  // /////////////////
  test('should return true when input is not a valid credit card number without hyphens', function (assert) {
    const isCreditCard = Is.creditCard('4444444444444444')
    assert.equal(isCreditCard, true)
  })

  // /////////////////
  // test suite 63 //
  // /////////////////
  test('should return false when input contains special characters', function (assert) {
    const isAlphaNumeric = Is.alphaNumeric('hellowo$ld')
    assert.equal(isAlphaNumeric, false)
  })

  // /////////////////
  // test suite 64 //
  // /////////////////
  test('should return true when input contains letters only', function (assert) {
    const isAlphaNumeric = Is.alphaNumeric('hello')
    assert.equal(isAlphaNumeric, true)
  })

  // /////////////////
  // test suite 65 //
  // /////////////////
  test('should return true when input contains letters and numbers both', function (assert) {
    const isAlphaNumeric = Is.alphaNumeric('hello123')
    assert.equal(isAlphaNumeric, true)
  })

  // /////////////////
  // test suite 66 //
  // /////////////////
  test('should return true when input letters only', function (assert) {
    const isAlphaNumeric = Is.alphaNumeric(123)
    assert.equal(isAlphaNumeric, true)
  })

  // /////////////////
  // test suite 67 //
  // /////////////////
  test('should return true when input is yes', function (assert) {
    const isAffirmative = Is.affirmative('yes')
    assert.equal(isAffirmative, true)
  })

  // /////////////////
  // test suite 68 //
  // /////////////////
  test('should return true when input is ok', function (assert) {
    const isAffirmative = Is.affirmative('ok')
    assert.equal(isAffirmative, true)
  })

  // /////////////////
  // test suite 69 //
  // /////////////////
  test('should return true when input is okay', function (assert) {
    const isAffirmative = Is.affirmative('okay')
    assert.equal(isAffirmative, true)
  })

  // /////////////////
  // test suite 70 //
  // /////////////////
  test('should return true when input is y', function (assert) {
    const isAffirmative = Is.affirmative('y')
    assert.equal(isAffirmative, true)
  })

  // /////////////////
  // test suite 71 //
  // /////////////////
  test('should return true when input is A', function (assert) {
    const isAffirmative = Is.affirmative('A')
    assert.equal(isAffirmative, true)
  })

  // /////////////////
  // test suite 72 //
  // /////////////////
  test('should return false when input is No', function (assert) {
    const isAffirmative = Is.affirmative('no')
    assert.equal(isAffirmative, false)
  })

  // /////////////////
  // test suite 73 //
  // /////////////////
  test('should return true when is a valid ip address ', function (assert) {
    const isIp = Is.ip('127.0.0.1')
    assert.equal(isIp, true)
  })

  // /////////////////
  // test suite 74 //
  // /////////////////
  test('should return true when is a valid ipv6 ip address ', function (assert) {
    const isIp = Is.ip('1:2:3:4:5:6:7:8')
    assert.equal(isIp, true)
  })
})

test.group('Raw | Arthmetic', function () {
  // /////////////////
  // test suite 75 //
  // /////////////////
  test('should return true when 2 numeric values are same', function (assert) {
    const isSame = Is.same(42, 40 + 2)
    assert.equal(isSame, true)
  })

  // /////////////////
  // test suite 76 //
  // /////////////////
  test('should return true when 2 string values are same', function (assert) {
    const isSame = Is.same('yeah', 'yeah')
    assert.equal(isSame, true)
  })

  // /////////////////
  // test suite 77 //
  // /////////////////
  test('should return true when 2 boolean values are same', function (assert) {
    const isSame = Is.same(true, true)
    assert.equal(isSame, true)
  })

  // /////////////////
  // test suite 78 //
  // /////////////////
  test('should return true when input is a even number', function (assert) {
    const isEven = Is.even(4)
    assert.equal(isEven, true)
  })

  // /////////////////
  // test suite 79 //
  // /////////////////
  test('should return false when input is not a even number', function (assert) {
    const isEven = Is.even(5)
    assert.equal(isEven, false)
  })

  // /////////////////
  // test suite 80 //
  // /////////////////
  test('should return false when input is not a number', function (assert) {
    const isEven = Is.even('hello')
    assert.equal(isEven, false)
  })

  // /////////////////
  // test suite 81 //
  // /////////////////
  test('should return false when input is not a odd number', function (assert) {
    const isOdd = Is.odd(4)
    assert.equal(isOdd, false)
  })

  // /////////////////
  // test suite 82 //
  // /////////////////
  test('should return true when input is a odd number', function (assert) {
    const isOdd = Is.odd(5)
    assert.equal(isOdd, true)
  })

  // /////////////////
  // test suite 83 //
  // /////////////////
  test('should return true when input is greater than 0', function (assert) {
    const isPositive = Is.positive(1)
    assert.equal(isPositive, true)
  })

  // /////////////////
  // test suite 84 //
  // /////////////////
  test('should return false when input is less than 0', function (assert) {
    const isPositive = Is.positive(-42)
    assert.equal(isPositive, false)
  })

  // /////////////////
  // test suite 85 //
  // /////////////////
  test('should return true when input is less than 0', function (assert) {
    const isNegative = Is.negative(-42)
    assert.equal(isNegative, true)
  })

  // /////////////////
  // test suite 86 //
  // /////////////////
  test('should return false when input is greater than 0', function (assert) {
    const isNegative = Is.negative(42)
    assert.equal(isNegative, false)
  })

  // /////////////////
  // test suite 87 //
  // /////////////////
  test('should return true when input is greater than comparison input', function (assert) {
    const isAbove = Is.above(42, 40)
    assert.equal(isAbove, true)
  })

  // /////////////////
  // test suite 88 //
  // /////////////////
  test('should return false when input is less than comparison input', function (assert) {
    const isAbove = Is.above(42, 45)
    assert.equal(isAbove, false)
  })

  // /////////////////
  // test suite 89 //
  // /////////////////
  test('should return false when input is greater than comparison input', function (assert) {
    const isUnder = Is.under(42, 40)
    assert.equal(isUnder, false)
  })

  // /////////////////
  // test suite 90 //
  // /////////////////
  test('should return true when input is less than comparison input', function (assert) {
    const isUnder = Is.under(30, 40)
    assert.equal(isUnder, true)
  })

  // /////////////////
  // test suite 91 //
  // /////////////////
  test('should return true when input value is between comparison inputs', function (assert) {
    const isBetween = Is.between(30, 20, 40)
    assert.equal(isBetween, true)
  })

  // /////////////////
  // test suite 92 //
  // /////////////////
  test('should return false when input value is not between comparison inputs', function (assert) {
    const isBetween = Is.between(30, 35, 40)
    assert.equal(isBetween, false)
  })
})

test.group('Raw | Array', function () {
  // /////////////////
  // test suite 93 //
  // /////////////////
  test('should return true when value falls in an array', function (assert) {
    const isInArray = Is.inArray(2, [1, 2, 3])
    assert.equal(isInArray, true)
  })

  // /////////////////
  // test suite 94 //
  // /////////////////
  test('should return false when comparison array is not an array', function (assert) {
    const isInArray = Is.inArray(2, 3)
    assert.equal(isInArray, false)
  })

  // /////////////////
  // test suite 95 //
  // /////////////////
  test('should return false when value does not fall in an array', function (assert) {
    const isInArray = Is.inArray(2, [1, 3, 5])
    assert.equal(isInArray, false)
  })

  // /////////////////
  // test suite 96 //
  // /////////////////
  test('should return false when array is not sorted', function (assert) {
    const isSorted = Is.sorted([1, 2, 4, 1])
    assert.equal(isSorted, false)
  })

  // /////////////////
  // test suite 97 //
  // /////////////////
  test('should return false when input is not an array', function (assert) {
    const isSorted = Is.sorted(1)
    assert.equal(isSorted, false)
  })

  // /////////////////
  // test suite 98 //
  // /////////////////
  test('should return true when array is sorted', function (assert) {
    const isSorted = Is.sorted([1, 2, 4, 5])
    assert.equal(isSorted, true)
  })
})

test.group('Raw | Dates', function () {
  // /////////////////
  // test suite 99 //
  // /////////////////
  test('should return true when date is today', function (assert) {
    const isToday = Is.today(new Date())
    assert.equal(isToday, true)
  })

  // //////////////////
  // test suite 100 //
  // //////////////////
  test('should return true when date is today and represented as string', function (assert) {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month
    const todayString = `${year}-${month}-${day}`
    const isToday = Is.today(todayString)
    assert.equal(isToday, true)
  })

  // //////////////////
  // test suite 101 //
  // //////////////////
  test('should return true when date is yesterday and represented as string', function (assert) {
    const date = new Date(new Date().setDate(new Date().getDate() - 1))
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month
    const yesterdayString = `${year}-${month}-${day}`
    const isYesterday = Is.yesterday(yesterdayString)
    assert.equal(isYesterday, true)
  })

  // //////////////////
  // test suite 102 //
  // //////////////////
  test('should return false when date is not yesterday', function (assert) {
    const isYesterday = Is.yesterday('2001-11-02')
    assert.equal(isYesterday, false)
  })

  // //////////////////
  // test suite 103 //
  // //////////////////
  test('should return true when date is tomorrow and represented as string', function (assert) {
    const date = new Date(new Date().setDate(new Date().getDate() + 1))
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month
    const tomorrowString = `${year}-${month}-${day}`
    const isTomorrow = Is.tomorrow(tomorrowString)
    assert.equal(isTomorrow, true)
  })

  // //////////////////
  // test suite 104 //
  // //////////////////
  test('should return false when date is not tomorrow', function (assert) {
    const isTomorrow = Is.tomorrow('2001-11-04')
    assert.equal(isTomorrow, false)
  })

  // //////////////////
  // test suite 105 //
  // //////////////////
  test('should return false when date is not in past', function (assert) {
    const isPast = Is.past('2200-11-05')
    assert.equal(isPast, false)
  })

  // //////////////////
  // test suite 106 //
  // //////////////////
  test('should return true when date is in past', function (assert) {
    const isPast = Is.past('2001-11-01')
    assert.equal(isPast, true)
  })

  // //////////////////
  // test suite 107 //
  // //////////////////
  test('should return false when date is in past', function (assert) {
    const isFuture = Is.future('2001-11-01')
    assert.equal(isFuture, false)
  })

  // //////////////////
  // test suite 108 //
  // //////////////////
  test('should return true when date is in future', function (assert) {
    const isFuture = Is.future('2200-11-01')
    assert.equal(isFuture, true)
  })

  // //////////////////
  // test suite 109 //
  // //////////////////
  test('should return true when date between 2 dates', function (assert) {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-30')
    assert.equal(isInDateRange, true)
  })

  // //////////////////
  // test suite 110 //
  // //////////////////
  test('should return false when min date expectation failed', function (assert) {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-22', '2015-11-30')
    assert.equal(isInDateRange, false)
  })

  // //////////////////
  // test suite 110 //
  // //////////////////
  test('should return false when max date expectation failed', function (assert) {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-15')
    assert.equal(isInDateRange, false)
  })
})

test.group('Raw | Array', function () {
  // //////////////////
  // test suite 111 //
  // //////////////////
  test('should return false when input array values are not in targeted array', function (assert) {
    const doesIntersectAny = Is.intersectAny([10, 20], [30, 40, 50])
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 112 //
  // //////////////////
  test('should return true when if of the values falls in targerted array', function (assert) {
    const doesIntersectAny = Is.intersectAny([10, 20], [30, 10, 50])
    assert.equal(doesIntersectAny, true)
  })

  // //////////////////
  // test suite 113 //
  // //////////////////
  test('should return false when input value is not an array', function (assert) {
    const doesIntersectAny = Is.intersectAny(10, [30, 10, 50])
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 114 //
  // //////////////////
  test('should return false when target value is not an array', function (assert) {
    const doesIntersectAny = Is.intersectAny([10, 20], 10)
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 115 //
  // //////////////////
  test('should return false when input array values are not in targeted array', function (assert) {
    const doesIntersectAny = Is.intersectAll([10, 20], [30, 40, 50])
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 116 //
  // //////////////////
  test('should return false when any one value falls in targeted array', function (assert) {
    const doesIntersectAny = Is.intersectAll([10, 20], [10, 40, 50])
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 117 //
  // //////////////////
  test('should return true when all values falls in targeted array', function (assert) {
    const doesIntersectAny = Is.intersectAll([10, 20], [10, 20, 50])
    assert.equal(doesIntersectAny, true)
  })

  // //////////////////
  // test suite 118 //
  // //////////////////
  test('should return false when input value is not an array', function (assert) {
    const doesIntersectAny = Is.intersectAll(10, [30, 10, 50])
    assert.equal(doesIntersectAny, false)
  })

  // //////////////////
  // test suite 119 //
  // //////////////////
  test('should return false when target value is not an array', function (assert) {
    const doesIntersectAny = Is.intersectAll([10, 20], 10)
    assert.equal(doesIntersectAny, false)
  })
})

test.group('Raw | Dates', function () {
  // //////////////////
  // test suite 120 //
  // //////////////////
  test('should make return false when date is not after defined offset', function (assert) {
    const isAfterOffset = Is.afterOffsetOf(new Date(), 12, 'months')
    assert.equal(isAfterOffset, false)
  })

  // //////////////////
  // test suite 121 //
  // //////////////////
  test('should make return true when date is after defined offset', function (assert) {
    const isAfterOffset = Is.afterOffsetOf(addMonths(new Date(), 13), 12, 'months')
    assert.equal(isAfterOffset, true)
  })

  // //////////////////
  // test suite 122 //
  // //////////////////
  test('should make return false when date is not before defined offset', function (assert) {
    const isBeforeOffset = Is.beforeOffsetOf(new Date(), 12, 'months')
    assert.equal(isBeforeOffset, false)
  })

  // //////////////////
  // test suite 123 //
  // //////////////////
  test('should make return true when date is after defined offset', function (assert) {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 13), 12, 'months')
    assert.equal(isBeforeOffset, true)
  })
})
