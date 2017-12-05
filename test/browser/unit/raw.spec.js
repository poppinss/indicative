'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as Is from '../../../src/raw'

group('Raw | Types', function () {
  test('should return true when input is an array', function (assert) {
    assert.equal(Is.array(['22', '12']), true)
  })

  test('should return false when input is an object', function (assert) {
    assert.equal(Is.array({age: 22}), false)
  })

  test('should return false when input is a string', function (assert) {
    assert.equal(Is.array('input'), false)
  })

  test('should return true when input is a boolean', function (assert) {
    assert.equal(Is.boolean(true), true)
  })

  test('should return true when input is a negative boolean', function (assert) {
    assert.equal(Is.boolean(false), true)
  })

  test('should return true when input is a numeric true/false state', function (assert) {
    assert.equal(Is.boolean(1), true)
  })

  test('should return false when input is a string', function (assert) {
    assert.equal(Is.boolean('true'), false)
  })

  test('should return true when input is a date', function (assert) {
    assert.equal(Is.date(new Date()), true)
  })

  test('should return true when input is string representation of date', function (assert) {
    assert.equal(Is.date('2015-11-30'), true)
  })

  test('should return false when input is invalid string representation of date', function (assert) {
    assert.equal(Is.date('2015-11-40'), false)
  })

  test('should not convert date string to instance when strict is enabled', function (assert) {
    assert.equal(Is.date('2015-11-30', true), false)
  })

  test('should return true when input is a function', function (assert) {
    assert.equal(Is.isFunction(function () {}), true)
  })

  test('should return false when input is a string', function (assert) {
    assert.equal(Is.isFunction('function () {}'), false)
  })

  test('should return true when input is a native javascript function', function (assert) {
    assert.equal(Is.isFunction(toString), true)
  })

  test('should return true when input is null', function (assert) {
    assert.equal(Is.isNull(null), true)
  })

  test('should return false when input is undefined', function (assert) {
    assert.equal(Is.isNull(undefined), false)
  })

  test('should return false when input is empty', function (assert) {
    assert.equal(Is.isNull(''), false)
  })

  test('should return true when input is a number', function (assert) {
    assert.equal(Is.isNumber(10), true)
  })

  test('should return true when input is constructed using Number method', function (assert) {
    assert.equal(Is.isNumber(Number('10')), true)
  })

  test('should return false when input is a string', function (assert) {
    assert.equal(Is.isNumber('10'), false)
  })

  test('should return true when input is an object', function (assert) {
    assert.equal(Is.isObject({name: 'virk'}), true)
  })

  test('should return false when input is not a stringify object', function (assert) {
    assert.equal(Is.isObject(JSON.stringify({name: 'virk'})), false)
  })

  test('should return true when input is json', function (assert) {
    assert.equal(Is.json(JSON.stringify({name: 'virk'})), true)
  })

  test('should return false when input is an object', function (assert) {
    assert.equal(Is.json({name: 'virk'}), false)
  })

  test('should return true when input is a string', function (assert) {
    assert.equal(Is.isString('hello'), true)
  })

  test('should return true when input is created using string class', function (assert) {
    assert.equal(Is.isString(String(10)), true)
  })

  test('should return false when input is not a string', function (assert) {
    assert.equal(Is.isString(10), false)
  })

  test('should return true when 2 inputs are of same type', function (assert) {
    assert.equal(Is.sameType(10, 10), true)
  })
})

group('Raw | Presence', function () {
  test('should return true when object is empty', function (assert) {
    assert.equal(Is.empty({}), true)
  })

  test('should return true when array is empty', function (assert) {
    assert.equal(Is.empty([]), true)
  })

  test('should return true when empty string has been passed', function (assert) {
    assert.equal(Is.empty(''), true)
  })

  test('should return true when null is passed', function (assert) {
    assert.equal(Is.empty(null), true)
  })

  test('should return true when undefined is passed', function (assert) {
    assert.equal(Is.empty(undefined), true)
  })

  test('should return false when number is passed', function (assert) {
    assert.equal(Is.empty(220), false)
  })

  test('should return false when date is passed', function (assert) {
    assert.equal(Is.empty(new Date()), false)
  })

  test('should return false when string with value is passed', function (assert) {
    assert.equal(Is.empty('hello'), false)
  })

  test('should return true when value exists but is an empty object', function (assert) {
    assert.equal(Is.existy({}), true)
  })

  test('should return false when value is null', function (assert) {
    assert.equal(Is.existy(null), false)
  })

  test('should return false when value is undefined', function (assert) {
    assert.equal(Is.existy(undefined), false)
  })

  test('should return false when value is empty string', function (assert) {
    assert.equal(Is.existy(''), false)
  })

  test('should return true when value is a positive boolean', function (assert) {
    assert.equal(Is.truthy(true), true)
  })

  test('should return true when value is a string', function (assert) {
    assert.equal(Is.truthy('true'), true)
  })

  test('should return false when value is false', function (assert) {
    assert.equal(Is.truthy(false), false)
  })

  test('should return false when value is 0', function (assert) {
    assert.equal(Is.truthy(0), false)
  })

  test('should return true when value is 0', function (assert) {
    assert.equal(Is.falsy(0), true)
  })

  test('should return true when value is false', function (assert) {
    assert.equal(Is.falsy(false), true)
  })

  test('should return false when value is a string', function (assert) {
    assert.equal(Is.falsy('false'), false)
  })

  test('should return true when value is an empty string', function (assert) {
    assert.equal(Is.falsy(''), true)
  })
})

group('Raw | Regexp', function () {
  test('should return false when input is not a valid url', function (assert) {
    assert.equal(Is.url('foo'), false)
  })

  test('should return false when input does not contain protocol', function (assert) {
    assert.equal(Is.url('www.foo.com'), false)
  })

  test('should return true when input is a valid http url', function (assert) {
    assert.equal(Is.url('http://foo.com'), true)
  })

  test('should return true when input is a valid https url', function (assert) {
    assert.equal(Is.url('https://foo.com'), true)
  })

  test('should return true when input contains something else than .com', function (assert) {
    assert.equal(Is.url('https://foo.in'), true)
  })

  test('should return true when input contains multi level TLD', function (assert) {
    assert.equal(Is.url('https://foo.co.in'), true)
  })

  test('should return true when input contains 63 characters TLD', function (assert) {
    assert.equal(
      Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'),
      true
    )
  })

  test('should return false when input contains more than 63 characters TLD', function (assert) {
    assert.equal(
      Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl'),
      false
    )
  })

  test('should return true when input contains only localhost', function (assert) {
    assert.equal(Is.url('http://localhost'), true)
  })

  test('should return true when input contains localhost with port', function (assert) {
    assert.equal(Is.url('http://localhost:80'), true)
  })

  test('should return true when domain name part contains 1 character', function (assert) {
    assert.equal(Is.url('https://t.co'), true)
  })

  test('should return false when input is not a valid email', function (assert) {
    assert.equal(Is.email('mail'), false)
  })

  test('should return false when input is a url instead of email', function (assert) {
    assert.equal(Is.email('http://foo.com'), false)
  })

  test('should return true when input is a valid email address', function (assert) {
    assert.equal(Is.email('someone@example.com'), true)
  })

  test('should return true when input is a valid email address with different TLD', function (assert) {
    assert.equal(Is.email('someone@example.org'), true)
  })

  test('should return true when input is a valid email address with 63 characters TLD', function (assert) {
    assert.equal(Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'), true)
  })

  test('should return false when input is not a valid email address with more than 63 characters TLD', function (assert) {
    assert.equal(Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl'), false)
  })

  test('should return true when input is a valid phone number', function (assert) {
    assert.equal(Is.phone('1235599809'), true)
  })

  test('should return true when input is a valid phone number with hyphens', function (assert) {
    assert.equal(Is.phone('123-559-9809'), true)
  })

  test('should return true when input is a valid fax phone number ', function (assert) {
    assert.equal(Is.phone('123.559.9809'), true)
  })

  test('should return false when input is not a valid credit card number', function (assert) {
    assert.equal(Is.creditCard('3685-1600-4490-1023'), false)
  })

  test('should return true when input is not a valid credit card number', function (assert) {
    assert.equal(Is.creditCard('4444-4444-4444-4444'), true)
  })

  test('should return true when input is not a valid credit card number without hyphens', function (assert) {
    assert.equal(Is.creditCard('4444444444444444'), true)
  })

  test('should return false when input contains special characters', function (assert) {
    assert.equal(Is.alphaNumeric('hellowo$ld'), false)
  })

  test('should return true when input contains letters only', function (assert) {
    assert.equal(Is.alphaNumeric('hello'), true)
  })

  test('should return true when input contains letters and numbers both', function (assert) {
    assert.equal(Is.alphaNumeric('hello123'), true)
  })

  test('should return true when input letters only', function (assert) {
    assert.equal(Is.alphaNumeric(123), true)
  })

  test('should return true when input is yes', function (assert) {
    assert.equal(Is.affirmative('yes'), true)
  })

  test('should return true when input is ok', function (assert) {
    assert.equal(Is.affirmative('ok'), true)
  })

  test('should return true when input is okay', function (assert) {
    assert.equal(Is.affirmative('okay'), true)
  })

  test('should return true when input is y', function (assert) {
    assert.equal(Is.affirmative('y'), true)
  })

  test('should return true when input is A', function (assert) {
    assert.equal(Is.affirmative('A'), true)
  })

  test('should return false when input is No', function (assert) {
    assert.equal(Is.affirmative('no'), false)
  })

  test('should return true when is a valid ip address ', function (assert) {
    assert.equal(Is.ip('127.0.0.1'), true)
  })

  test('should return true when is a valid ipv6 ip address ', function (assert) {
    assert.equal(Is.ip('1:2:3:4:5:6:7:8'), true)
  })
})

group('Raw | Arthmetic', function () {
  test('should return true when 2 numeric values are same', function (assert) {
    assert.equal(Is.same(42, 40 + 2), true)
  })

  test('should return true when 2 string values are same', function (assert) {
    assert.equal(Is.same('yeah', 'yeah'), true)
  })

  test('should return true when 2 boolean values are same', function (assert) {
    assert.equal(Is.same(true, true), true)
  })

  test('should return true when input is a even number', function (assert) {
    assert.equal(Is.even(4), true)
  })

  test('should return false when input is not a even number', function (assert) {
    assert.equal(Is.even(5), false)
  })

  test('should return false when input is not a number', function (assert) {
    assert.equal(Is.even('hello'), false)
  })

  test('should return false when input is not a odd number', function (assert) {
    assert.equal(Is.odd(4), false)
  })

  test('should return true when input is a odd number', function (assert) {
    assert.equal(Is.odd(5), true)
  })

  test('should return true when input is greater than 0', function (assert) {
    assert.equal(Is.positive(1), true)
  })

  test('should return false when input is less than 0', function (assert) {
    assert.equal(Is.positive(-42), false)
  })

  test('should return true when input is less than 0', function (assert) {
    assert.equal(Is.negative(-42), true)
  })

  test('should return false when input is greater than 0', function (assert) {
    assert.equal(Is.negative(42), false)
  })

  test('should return true when input is greater than comparison input', function (assert) {
    assert.equal(Is.above(42, 40), true)
  })

  test('should return false when input is less than comparison input', function (assert) {
    assert.equal(Is.above(42, 45), false)
  })

  test('should return false when input is greater than comparison input', function (assert) {
    assert.equal(Is.under(42, 40), false)
  })

  test('should return true when input is less than comparison input', function (assert) {
    assert.equal(Is.under(30, 40), true)
  })

  test('should return true when input value is between comparison inputs', function (assert) {
    assert.equal(Is.between(30, 20, 40), true)
  })

  test('should return false when input value is not between comparison inputs', function (assert) {
    assert.equal(Is.between(30, 35, 40), false)
  })
})

group('Raw | Array', function () {
  test('should return true when value falls in an array', function (assert) {
    assert.equal(Is.inArray(2, [1, 2, 3]), true)
  })

  test('should return false when comparison array is not an array', function (assert) {
    assert.equal(Is.inArray(2, 3), false)
  })

  test('should return false when value does not fall in an array', function (assert) {
    assert.equal(Is.inArray(2, [1, 3, 5]), false)
  })

  test('should return false when array is not sorted', function (assert) {
    assert.equal(Is.sorted([1, 2, 4, 1]), false)
  })

  test('should return false when array has negative values', function (assert) {
    assert.equal(Is.sorted([3, 9, -3, 10]), false)
  })

  test('should true when there is only one value inside the array', function (assert) {
    assert.equal(Is.sorted([3]), true)
  })

  test('should return false when input is not an array', function (assert) {
    assert.equal(Is.sorted(1), false)
  })

  test('should return true when array is sorted', function (assert) {
    assert.equal(Is.sorted([1, 2, 4, 5]), true)
  })
})

group('Raw | Array', function () {
  test('should return false when input array values are not in targeted array', function (assert) {
    assert.equal(Is.intersectAny([10, 20], [30, 40, 50]), false)
  })

  test('should return true when if of the values falls in targerted array', function (assert) {
    assert.equal(Is.intersectAny([10, 20], [30, 10, 50]), true)
  })

  test('should return false when input value is not an array', function (assert) {
    assert.equal(Is.intersectAny(10, [30, 10, 50]), false)
  })

  test('should return false when target value is not an array', function (assert) {
    assert.equal(Is.intersectAny([10, 20], 10), false)
  })

  test('should return false when input array values are not in targeted array', function (assert) {
    assert.equal(Is.intersectAll([10, 20], [30, 40, 50]), false)
  })

  test('should return false when any one value falls in targeted array', function (assert) {
    assert.equal(Is.intersectAll([10, 20], [10, 40, 50]), false)
  })

  test('should return true when all values falls in targeted array', function (assert) {
    assert.equal(Is.intersectAll([10, 20], [10, 20, 50]), true)
  })

  test('should return false when input value is not an array', function (assert) {
    assert.equal(Is.intersectAll(10, [30, 10, 50]), false)
  })

  test('should return false when target value is not an array', function (assert) {
    assert.equal(Is.intersectAll([10, 20], 10), false)
  })
})
