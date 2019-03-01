'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import * as Is from '../../src/raw'
import {
  addMonths,
  addDays,
  addMinutes,
  addSeconds,
  addHours,
  subMonths,
  format,
  subMilliseconds,
  subWeeks,
  subQuarters,
} from 'date-fns'

test.group('Raw | Types', () => {
  test('return true when input is an array', (assert) => {
    assert.equal(Is.array(['22', '12']), true)
  })

  test('return false when input is an object', (assert) => {
    assert.equal(Is.array({age: 22}), false)
  })

  test('return false when input is a string', (assert) => {
    assert.equal(Is.array('input'), false)
  })

  test('return true when input is a boolean', (assert) => {
    assert.equal(Is.boolean(true), true)
  })

  test('return true when input is a negative boolean', (assert) => {
    assert.equal(Is.boolean(false), true)
  })

  test('return true when input is a numeric true/false state', (assert) => {
    assert.equal(Is.boolean(1), true)
  })

  test('return false when input is a string', (assert) => {
    assert.equal(Is.boolean('true', true), false)
  })

  test('return true when input is a date', (assert) => {
    assert.equal(Is.date(new Date()), true)
  })

  test('return true when input is string representation of date @nonstrict', (assert) => {
    assert.equal(Is.date('2015-11-30', false), true)
  })

  test('return false when input is invalid string representation of date', (assert) => {
    assert.equal(Is.date('2015-11-40'), false)
  })

  test('should not convert date string to instance when strict is enabled', (assert) => {
    assert.equal(Is.date('2015-11-30', true), false)
  })

  test('return true when input is a function', (assert) => {
    assert.equal(Is.isFunction(function foo () {}), true)
  })

  test('return false when input is a string', (assert) => {
    assert.equal(Is.isFunction('function () {}'), false)
  })

  test('return true when input is a native javascript function', (assert) => {
    assert.equal(Is.isFunction(global.toString), true)
  })

  test('return true when input is null', (assert) => {
    assert.equal(Is.isNull(null), true)
  })

  test('return false when input is undefined', (assert) => {
    assert.equal(Is.isNull(undefined), false)
  })

  test('return false when input is empty', (assert) => {
    assert.equal(Is.isNull(''), false)
  })

  test('return true when input is a number', (assert) => {
    assert.equal(Is.isNumber(10), true)
  })

  test('return false when input is NaN', (assert) => {
    assert.equal(Is.isNumber(NaN), false)
  })

  test('return true when input is constructed using Number method', (assert) => {
    assert.equal(Is.isNumber(Number('10')), true)
  })

  test('return false when input is a string and strict is enabled', (assert) => {
    assert.equal(Is.isNumber('10', true), false)
  })

  test('return true when input is a string representation of a number', (assert) => {
    assert.equal(Is.isNumber('10'), true)
  })

  test('return false when input is not a string representation of a number', (assert) => {
    assert.equal(Is.isNumber('virk'), false)
  })

  test('return true when input is an object', (assert) => {
    assert.equal(Is.isObject({name: 'virk'}), true)
  })

  test('return false when input is not a stringify object', (assert) => {
    assert.equal(Is.isObject(JSON.stringify({name: 'virk'})), false)
  })

  test('return true when input is json', (assert) => {
    assert.equal(Is.json(JSON.stringify({name: 'virk'})), true)
  })

  test('return false when input is an object', (assert) => {
    assert.equal(Is.json({name: 'virk'}), false)
  })

  test('return true when input is null', (assert) => {
    assert.equal(Is.json(null), true)
  })

  test('return true when input is a string', (assert) => {
    assert.equal(Is.isString('hello'), true)
  })

  test('return true when input is created using string class', (assert) => {
    assert.equal(Is.isString(String(10)), true)
  })

  test('return false when input is not a string', (assert) => {
    assert.equal(Is.isString(10), false)
  })

  test('return true when 2 inputs are of same type', (assert) => {
    assert.equal(Is.sameType(10, 10), true)
  })

  test('return true false when inputs are not of same type', (assert) => {
    assert.equal(Is.sameType('10', 10), false)
  })
})

test.group('Raw | Presence', () => {
  test('return true when object is empty', (assert) => {
    assert.equal(Is.empty({}), true)
  })

  test('return true when array is empty', (assert) => {
    assert.equal(Is.empty([]), true)
  })

  test('return true when empty string has been passed', (assert) => {
    assert.equal(Is.empty(''), true)
  })

  test('return true when null is passed', (assert) => {
    assert.equal(Is.empty(null), true)
  })

  test('return true when undefined is passed', (assert) => {
    assert.equal(Is.empty(undefined), true)
  })

  test('return false when number is passed', (assert) => {
    assert.equal(Is.empty(220), false)
  })

  test('return false when date is passed', (assert) => {
    assert.equal(Is.empty(new Date()), false)
  })

  test('return false when string with value is passed', (assert) => {
    assert.equal(Is.empty('hello'), false)
  })

  test('return true when value exists but is an empty object', (assert) => {
    assert.equal(Is.existy({}), true)
  })

  test('return false when value is null', (assert) => {
    assert.equal(Is.existy(null), false)
  })

  test('return false when value is undefined', (assert) => {
    assert.equal(Is.existy(undefined), false)
  })

  test('return false when value is empty string', (assert) => {
    assert.equal(Is.existy(''), false)
  })

  test('return true when value is a positive boolean', (assert) => {
    assert.equal(Is.truthy(true), true)
  })

  test('return true when value is a string', (assert) => {
    assert.equal(Is.truthy('true'), true)
  })

  test('return false when value is false', (assert) => {
    assert.equal(Is.truthy(false), false)
  })

  test('return false when value is 0', (assert) => {
    assert.equal(Is.truthy(0), false)
  })

  test('return true when value is 0', (assert) => {
    assert.equal(Is.falsy(0), true)
  })

  test('return true when value is false', (assert) => {
    assert.equal(Is.falsy(false), true)
  })

  test('return false when value is a string', (assert) => {
    assert.equal(Is.falsy('false'), false)
  })

  test('return true when value is an empty string', (assert) => {
    assert.equal(Is.falsy(''), true)
  })
})

test.group('Raw | Regexp', () => {
  test('execute custom regex', (assert) => {
    assert.equal(Is.regex('virk', /[a-z]/), true)
  })

  test('throw exception when 2argument is not regex', (assert) => {
    const fn = () => (Is.regex as any)(/[a-z]/, 'virk')
    assert.throw(fn, 'You must pass regex as the 2nd argument')
  })

  test('return false when input is not a valid url', (assert) => {
    assert.equal(Is.url('foo'), false)
  })

  test('return false when input does not contain protocol', (assert) => {
    assert.equal(Is.url('www.foo.com'), false)
  })

  test('return true when input is a valid http url', (assert) => {
    assert.equal(Is.url('http://foo.com'), true)
  })

  test('return true when input is a valid https url', (assert) => {
    assert.equal(Is.url('https://foo.com'), true)
  })

  test('return true when input contains something else than .com', (assert) => {
    assert.equal(Is.url('https://foo.in'), true)
  })

  test('return true when input contains multi level TLD', (assert) => {
    assert.equal(Is.url('https://foo.co.in'), true)
  })

  test('return true when input contains 63 characters TLD', (assert) => {
    assert.equal(
      Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'),
      true,
    )
  })

  test('return false when input contains more than 63 characters TLD', (assert) => {
    assert.equal(
      Is.url('https://example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl'),
      false,
    )
  })

  test('return true when input contains only localhost', (assert) => {
    assert.equal(Is.url('http://localhost'), true)
  })

  test('return true when input contains localhost with port', (assert) => {
    assert.equal(Is.url('http://localhost:80'), true)
  })

  test('return true when domain name part contains 1 character', (assert) => {
    assert.equal(Is.url('https://t.co'), true)
  })

  test('return false when input is not a valid email', (assert) => {
    assert.equal(Is.email('mail'), false)
  })

  test('return false when input is a url instead of email', (assert) => {
    assert.equal(Is.email('http://foo.com'), false)
  })

  test('return true when input is a valid email address', (assert) => {
    assert.equal(Is.email('someone@example.com'), true)
  })

  test('return true when input is a valid email address with different TLD', (assert) => {
    assert.equal(Is.email('someone@example.org'), true)
  })

  test('return true when input is a valid email address with 63 characters TLD', (assert) => {
    assert.equal(Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'), true)
  })

  test('return true when input is a valid phone number', (assert) => {
    assert.equal(Is.phone('1235599809'), true)
  })

  test('return true when input is a valid phone number with hyphens', (assert) => {
    assert.equal(Is.phone('123-559-9809'), true)
  })

  test('return true when input is a valid fax phone number ', (assert) => {
    assert.equal(Is.phone('123.559.9809'), true)
  })

  test('return false when input is not a valid credit card number', (assert) => {
    assert.equal(Is.creditCard('3685-1600-4490-1023'), false)
  })

  test('return false when input is not a valid credit card number', (assert) => {
    assert.equal(Is.creditCard('4444-4444-4444-4444'), false)
  })

  test('return false when input is not a valid credit card number without hyphens', (assert) => {
    assert.equal(Is.creditCard('4444444444444444'), false)
  })

  test('return false when input contains special characters', (assert) => {
    assert.equal(Is.alphaNumeric('hellowo$ld'), false)
  })

  test('return true when input contains letters only', (assert) => {
    assert.equal(Is.alphaNumeric('hello'), true)
  })

  test('return true when input contains letters and numbers both', (assert) => {
    assert.equal(Is.alphaNumeric('hello123'), true)
  })

  test('return true when input are numbers only', (assert) => {
    assert.equal(Is.alphaNumeric('123'), true)
  })

  test('return true when input is yes', (assert) => {
    assert.equal(Is.affirmative('yes'), true)
  })

  test('return true when input is ok', (assert) => {
    assert.equal(Is.affirmative('ok'), true)
  })

  test('return true when input is okay', (assert) => {
    assert.equal(Is.affirmative('okay'), true)
  })

  test('return true when input is y', (assert) => {
    assert.equal(Is.affirmative('y'), true)
  })

  test('return true when input is A', (assert) => {
    assert.equal(Is.affirmative('A'), true)
  })

  test('return false when input is No', (assert) => {
    assert.equal(Is.affirmative('no'), false)
  })

  test('return true when is a valid ip address ', (assert) => {
    assert.equal(Is.ip('127.0.0.1'), true)
  })

  test('return true when is a valid ipv6 ip address ', (assert) => {
    assert.equal(Is.ip('1:2:3:4:5:6:7:8'), true)
  })
})

test.group('Raw | Arthmetic', () => {
  test('return true when 2 numeric values are same', (assert) => {
    assert.equal(Is.same(42, 40 + 2), true)
  })

  test('return true when 2 string values are same', (assert) => {
    assert.equal(Is.same('yeah', 'yeah'), true)
  })

  test('return true when 2 boolean values are same', (assert) => {
    assert.equal(Is.same(true, true), true)
  })

  test('return true when input is a even number', (assert) => {
    assert.equal(Is.even(4), true)
  })

  test('return false when input is not a even number', (assert) => {
    assert.equal(Is.even(5), false)
  })

  test('return false when input is not a number', (assert) => {
    assert.equal(Is.even('hello'), false)
  })

  test('return false when input is not a odd number', (assert) => {
    assert.equal(Is.odd(4), false)
  })

  test('return true when input is a odd number', (assert) => {
    assert.equal(Is.odd(5), true)
  })

  test('return true when input is greater than 0', (assert) => {
    assert.equal(Is.positive(1), true)
  })

  test('return false when input is less than 0', (assert) => {
    assert.equal(Is.positive(-42), false)
  })

  test('return true when input is less than 0', (assert) => {
    assert.equal(Is.negative(-42), true)
  })

  test('return false when input is greater than 0', (assert) => {
    assert.equal(Is.negative(42), false)
  })

  test('return true when input is greater than comparison input', (assert) => {
    assert.equal(Is.above(42, 40), true)
  })

  test('return false when input is less than comparison input', (assert) => {
    assert.equal(Is.above(42, 45), false)
  })

  test('return false when input is greater than comparison input', (assert) => {
    assert.equal(Is.under(42, 40), false)
  })

  test('return true when input is less than comparison input', (assert) => {
    assert.equal(Is.under(30, 40), true)
  })

  test('return true when input value is between comparison inputs', (assert) => {
    assert.equal(Is.between(30, 20, 40), true)
  })

  test('return false when input value is not between comparison inputs', (assert) => {
    assert.equal(Is.between(30, 35, 40), false)
  })
})

test.group('Raw | Array', () => {
  test('return true when value falls in an array', (assert) => {
    assert.equal(Is.inArray(2, [1, 2, 3]), true)
  })

  test('return false when value does not fall in an array', (assert) => {
    assert.equal(Is.inArray(2, [1, 3, 5]), false)
  })

  test('return false when array is not sorted', (assert) => {
    assert.equal(Is.sorted([1, 2, 4, 1]), false)
  })

  test('return false when array has negative values', (assert) => {
    assert.equal(Is.sorted([3, 9, -3, 10]), false)
  })

  test('should true when there is only one value inside the array', (assert) => {
    assert.equal(Is.sorted([3]), true)
  })

  test('return false when input is not an array', (assert) => {
    assert.equal((Is.sorted as any)(1), false)
  })

  test('return true when array is sorted', (assert) => {
    assert.equal(Is.sorted([1, 2, 4, 5]), true)
  })

  test('return false when input array values are not in targeted array', (assert) => {
    assert.equal(Is.intersectAny([10, 20], [30, 40, 50]), false)
  })

  test('return true when if of the values falls in targerted array', (assert) => {
    assert.equal(Is.intersectAny([10, 20], [30, 10, 50]), true)
  })

  test('return false when input value is not an array', (assert) => {
    assert.equal((Is.intersectAny as any)(10, [30, 10, 50]), false)
  })

  test('return false when target value is not an array', (assert) => {
    assert.equal((Is.intersectAny as any)([10, 20], 10), false)
  })

  test('return false when input array values are not in targeted array', (assert) => {
    assert.equal(Is.intersectAll([10, 20], [30, 40, 50]), false)
  })

  test('return false when any one value falls in targeted array', (assert) => {
    assert.equal(Is.intersectAll([10, 20], [10, 40, 50]), false)
  })

  test('return true when all values falls in targeted array', (assert) => {
    assert.equal(Is.intersectAll([10, 20], [10, 20, 50]), true)
  })

  test('return false when input value is not an array', (assert) => {
    assert.equal((Is.intersectAll as any)(10, [30, 10, 50]), false)
  })

  test('return false when target value is not an array', (assert) => {
    assert.equal((Is.intersectAll as any)([10, 20], 10), false)
  })

  test('return true when input is a subset of another array', (assert) => {
    assert.isTrue(Is.subset(['foo', 'qux', 'baz'], ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']))
  })

  test('return false when input is not a subset of another array', (assert) => {
    assert.isFalse(Is.subset(['foo', 'wubba', 'lubba', 'dub'], ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']))
  })

  test('return true when input is an empty array', (assert) => {
    assert.isTrue(Is.subset([], ['foo', 'bar', 'baz']))
  })
})

test.group('Raw | Dates', () => {
  test('return true when date is today', (assert) => {
    const isToday = Is.today(new Date())
    assert.equal(isToday, true)
  })

  test('return true when date is today and represented as string', (assert) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const todayString = `${year}-${castedMonth}-${castedDay}`

    const isToday = Is.today(todayString)
    assert.equal(isToday, true)
  })

  test('return true when date is yesterday and represented as string', (assert) => {
    const date = new Date(new Date().setDate(new Date().getDate() - 1))
    const year = date.getFullYear()

    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const yesterdayString = `${year}-${castedMonth}-${castedDay}`
    const isYesterday = Is.yesterday(yesterdayString)
    assert.equal(isYesterday, true)
  })

  test('return false when date is not yesterday', (assert) => {
    const isYesterday = Is.yesterday('2001-11-02')
    assert.equal(isYesterday, false)
  })

  test('return true when date is tomorrow and represented as string', (assert) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const castedDay = day < 10 ? `0${day}` : day
    const castedMonth = month < 10 ? `0${month}` : month

    const tomorrowString = `${year}-${castedMonth}-${castedDay}`
    const isTomorrow = Is.tomorrow(tomorrowString)
    assert.equal(isTomorrow, true)
  })

  test('return false when date is not tomorrow', (assert) => {
    const isTomorrow = Is.tomorrow('2001-11-04')
    assert.equal(isTomorrow, false)
  })

  test('return false when date is not in past', (assert) => {
    const isPast = Is.past('2200-11-05')
    assert.equal(isPast, false)
  })

  test('return true when date is in past', (assert) => {
    const isPast = Is.past('2001-11-01')
    assert.equal(isPast, true)
  })

  test('return false when date is in past', (assert) => {
    const isFuture = Is.future('2001-11-01')
    assert.equal(isFuture, false)
  })

  test('return true when date is in future', (assert) => {
    const isFuture = Is.future('2200-11-01')
    assert.equal(isFuture, true)
  })

  test('return true when date between 2 dates', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-30')
    assert.equal(isInDateRange, true)
  })

  test('return false when min date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-22', '2015-11-30')
    assert.equal(isInDateRange, false)
  })

  test('return false when max date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-15')
    assert.equal(isInDateRange, false)
  })

  test('return false when date is not after defined offset', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(new Date(), 12, 'months')
    assert.equal(isAfterOffset, false)
  })

  test('return true when date is after defined offset months', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addMonths(new Date(), 13), 12, 'months')
    assert.equal(isAfterOffset, true)
  })

  test('return true when date is after defined offset days', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addDays(new Date(), 2), 1, 'days')
    assert.equal(isAfterOffset, true)
  })

  test('return true when date is after defined offset minutes', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addMinutes(new Date(), 30), 20, 'minutes')
    assert.equal(isAfterOffset, true)
  })

  test('return true when date is after defined offset seconds', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addSeconds(new Date(), 30), 20, 'seconds')
    assert.equal(isAfterOffset, true)
  })

  test('return true when date is after defined offset hours', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addHours(new Date(), 10), 9, 'hours')
    assert.equal(isAfterOffset, true)
  })

  test('return false when date is not before defined offset', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(new Date(), 12, 'months')
    assert.equal(isBeforeOffset, false)
  })

  test('return true when date is before defined offset', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 13), 12, 'months')
    assert.equal(isBeforeOffset, true)
  })

  test('return true when date is before defined offset milliseconds', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMilliseconds(new Date(), 40), 12, 'milliseconds')
    assert.equal(isBeforeOffset, true)
  })

  test('return true when date is before defined offset weeks', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subWeeks(new Date(), 2), 1, 'weeks')
    assert.equal(isBeforeOffset, true)
  })

  test('return true when date is before defined offset quaters', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subQuarters(new Date(), 2), 1, 'quarters')
    assert.equal(isBeforeOffset, true)
  })

  test('return true when date is before defined offset years', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 16), 1, 'years')
    assert.equal(isBeforeOffset, true)
  })

  test('return true when valid format is valid as per allowed format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), 'YYYY-MM-DD')
    assert.equal(isFormatted, true)
  })

  test('return false when date is invalid', (assert) => {
    const isFormatted = Is.dateFormat('hello', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return false when date is set to invalid date', (assert) => {
    const isFormatted = Is.dateFormat('Invalid Date', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return true when date is valid as per any given format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD'])
    assert.isTrue(isFormatted)
  })

  test('should return true when input is a date', (assert) => {
    assert.equal(Is.isDate(new Date()), true)
  })

  test('should return true when input is string representation of date', (assert) => {
    assert.equal(Is.isDate('2015-11-30'), true)
  })

  test('should return false when input is invalid string representation of date', (assert) => {
    assert.equal(Is.isDate('2015-11-40'), false)
  })

  test('should not convert date string to instance when strict is enabled', (assert) => {
    assert.equal(Is.isDate('2015-11-30', true), false)
  })
})
