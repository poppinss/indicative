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
import * as Is from '../src/raw'

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
    assert.isTrue(Is.array(['22', '12']))
  })

  test('return false when input is an object', (assert) => {
    assert.isFalse(Is.array({age: 22}))
  })

  test('return false when input is a string', (assert) => {
    assert.isFalse(Is.array('input'))
  })

  test('return true when input is a boolean', (assert) => {
    assert.isTrue(Is.boolean(true))
  })

  test('return true when input is a negative boolean', (assert) => {
    assert.isTrue(Is.boolean(false))
  })

  test('return true when input is a numeric true/false state', (assert) => {
    assert.isTrue(Is.boolean(1))
    assert.isTrue(Is.boolean(0))
  })

  test('return false when input is a string and strict is true', (assert) => {
    assert.isFalse(Is.boolean('true', true))
    assert.isFalse(Is.boolean('false', true))
    assert.isFalse(Is.boolean('0', true))
    assert.isFalse(Is.boolean('1', true))
  })

  test('return false when input is a string and strict is false', (assert) => {
    assert.isTrue(Is.boolean('true', false))
    assert.isTrue(Is.boolean('false', false))
    assert.isTrue(Is.boolean('0', false))
    assert.isTrue(Is.boolean('1', false))
  })

  test('return false when input is a string and not a valid boolean string', (assert) => {
    assert.isFalse(Is.boolean('virk', false))
  })

  test('return true when input is a date', (assert) => {
    assert.isTrue(Is.date(new Date()))
  })

  test('return true when input is string representation of date @nonstrict', (assert) => {
    assert.isTrue(Is.date('2015-11-30', false))
  })

  test('return false when input is invalid string representation of date', (assert) => {
    assert.isFalse(Is.date('2015-11-40'))
  })

  test('should not convert date string to instance when strict is enabled', (assert) => {
    assert.isFalse(Is.date('2015-11-30', true))
  })

  test('return true when input is a function', (assert) => {
    assert.isTrue(Is.isFunction(function foo () {}))
  })

  test('return false when input is a string', (assert) => {
    assert.isFalse(Is.isFunction('function () {}'))
  })

  test('return true when input is a native javascript function', (assert) => {
    assert.isTrue(Is.isFunction(global.toString))
  })

  test('return true when input is null', (assert) => {
    assert.isTrue(Is.isNull(null))
  })

  test('return false when input is undefined', (assert) => {
    assert.isFalse(Is.isNull(undefined))
  })

  test('return false when input is empty', (assert) => {
    assert.isFalse(Is.isNull(''))
  })

  test('return true when input is a number', (assert) => {
    assert.isTrue(Is.isNumber(10, true))
  })

  test('return false when input is NaN', (assert) => {
    assert.isFalse(Is.isNumber(NaN, true))
  })

  test('return true when input is constructed using Number method', (assert) => {
    assert.isTrue(Is.isNumber(Number('10'), true))
  })

  test('return false when input is a string and strict is enabled', (assert) => {
    assert.isFalse(Is.isNumber('10', true))
  })

  test('return true when input is a string representation of a number', (assert) => {
    assert.isTrue(Is.isNumber('10', false))
  })

  test('return false when input is not a string representation of a number', (assert) => {
    assert.isFalse(Is.isNumber('virk', false))
  })

  test('return false when input is not a string or number', (assert) => {
    assert.isFalse(Is.isNumber(true))
    assert.isFalse(Is.isNumber(false))
    assert.isFalse(Is.isNumber([]))
    assert.isFalse(Is.isNumber({}))
  })

  test('return true when input is an object', (assert) => {
    assert.isTrue(Is.isObject({name: 'virk'}))
  })

  test('return false when input is not a stringify object', (assert) => {
    assert.isFalse(Is.isObject(JSON.stringify({name: 'virk'})))
  })

  test('return true when input is json', (assert) => {
    assert.isTrue(Is.json(JSON.stringify({name: 'virk'})))
  })

  test('return false when input is an object', (assert) => {
    assert.isFalse(Is.json({name: 'virk'}))
  })

  test('return true when input is null', (assert) => {
    assert.isTrue(Is.json(null))
  })

  test('return true when input is a string', (assert) => {
    assert.isTrue(Is.isString('hello'))
  })

  test('return true when input is created using string class', (assert) => {
    assert.isTrue(Is.isString(String(10)))
  })

  test('return false when input is not a string', (assert) => {
    assert.isFalse(Is.isString(10))
  })

  test('return true when 2 inputs are of same type', (assert) => {
    assert.isTrue(Is.sameType(10, 10))
  })

  test('return true false when inputs are not of same type', (assert) => {
    assert.isFalse(Is.sameType('10', 10))
  })
})

test.group('Raw | Presence', () => {
  test('return true when object is empty', (assert) => {
    assert.isTrue(Is.empty({}))
  })

  test('return true when array is empty', (assert) => {
    assert.isTrue(Is.empty([]))
  })

  test('return true when empty string has been passed', (assert) => {
    assert.isTrue(Is.empty(''))
  })

  test('return true when null is passed', (assert) => {
    assert.isTrue(Is.empty(null))
  })

  test('return true when undefined is passed', (assert) => {
    assert.isTrue(Is.empty(undefined))
  })

  test('return false when number is passed', (assert) => {
    assert.isFalse(Is.empty(220))
  })

  test('return false when date is passed', (assert) => {
    assert.isFalse(Is.empty(new Date()))
  })

  test('return false when string with value is passed', (assert) => {
    assert.isFalse(Is.empty('hello'))
  })

  test('return true when value exists but is an empty object', (assert) => {
    assert.isTrue(Is.existy({}))
  })

  test('return false when value is null', (assert) => {
    assert.isFalse(Is.existy(null))
  })

  test('return false when value is undefined', (assert) => {
    assert.isFalse(Is.existy(undefined))
  })

  test('return false when value is empty string', (assert) => {
    assert.isFalse(Is.existy(''))
  })

  test('return true when value is a positive boolean', (assert) => {
    assert.isTrue(Is.truthy(true))
  })

  test('return true when value is a string', (assert) => {
    assert.isTrue(Is.truthy('true'))
  })

  test('return false when value is false', (assert) => {
    assert.isFalse(Is.truthy(false))
  })

  test('return false when value is 0', (assert) => {
    assert.isFalse(Is.truthy(0))
  })

  test('return true when value is 0', (assert) => {
    assert.isTrue(Is.falsy(0))
  })

  test('return true when value is false', (assert) => {
    assert.isTrue(Is.falsy(false))
  })

  test('return false when value is a string', (assert) => {
    assert.isFalse(Is.falsy('false'))
  })

  test('return true when value is an empty string', (assert) => {
    assert.isTrue(Is.falsy(''))
  })
})

test.group('Raw | Regexp', () => {
  test('execute custom regex', (assert) => {
    assert.isTrue(Is.regex('virk', /[a-z]/))
  })

  test('throw exception when 2argument is not regex', (assert) => {
    const fn = () => (Is.regex as any)(/[a-z]/, 'virk')
    assert.throw(fn, 'You must pass regex as the 2nd argument')
  })

  test('return false when input is not a valid url', (assert) => {
    assert.isFalse(Is.url('foo'))
  })

  test('return false when input does not contain protocol', (assert) => {
    assert.isFalse(Is.url('www.foo.com'))
  })

  test('return true when input is a valid http url', (assert) => {
    assert.isTrue(Is.url('http://foo.com'))
  })

  test('return true when input is a valid https url', (assert) => {
    assert.isTrue(Is.url('https://foo.com'))
  })

  test('return true when input contains something else than .com', (assert) => {
    assert.isTrue(Is.url('https://foo.in'))
  })

  test('return true when input contains multi level TLD', (assert) => {
    assert.isTrue(Is.url('https://foo.co.in'))
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
    assert.isTrue(Is.url('http://localhost'))
  })

  test('return true when input contains localhost with port', (assert) => {
    assert.isTrue(Is.url('http://localhost:80'))
  })

  test('return true when domain name part contains 1 character', (assert) => {
    assert.isTrue(Is.url('https://t.co'))
  })

  test('return false when input is not a valid email', (assert) => {
    assert.isFalse(Is.email('mail'))
  })

  test('return false when input is a url instead of email', (assert) => {
    assert.isFalse(Is.email('http://foo.com'))
  })

  test('return true when input is a valid email address', (assert) => {
    assert.isTrue(Is.email('someone@example.com'))
  })

  test('return true when input is a valid email address with different TLD', (assert) => {
    assert.isTrue(Is.email('someone@example.org'))
  })

  test('return true when input is a valid email address with 63 characters TLD', (assert) => {
    assert.isTrue(Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'))
  })

  test('return true when input is a valid phone number', (assert) => {
    assert.isTrue(Is.phone('1235599809'))
  })

  test('return true when input is a valid phone number with hyphens', (assert) => {
    assert.isTrue(Is.phone('123-559-9809'))
  })

  test('return true when input is a valid fax phone number ', (assert) => {
    assert.isTrue(Is.phone('123.559.9809'))
  })

  test('return false when input is not a valid credit card number', (assert) => {
    assert.isFalse(Is.creditCard('3685-1600-4490-1023'))
  })

  test('return false when input is not a valid credit card number', (assert) => {
    assert.isFalse(Is.creditCard('4444-4444-4444-4444'))
  })

  test('return false when input is not a valid credit card number without hyphens', (assert) => {
    assert.isFalse(Is.creditCard('4444444444444444'))
  })

  test('return true when value is alpha', (assert) => {
    assert.isTrue(Is.alpha('hello'))
  })

  test('return true when value is not alpha', (assert) => {
    assert.isFalse(Is.alpha('he1llo'))
  })

  test('return false when input contains special characters', (assert) => {
    assert.isFalse(Is.alphaNumeric('hellowo$ld'))
  })

  test('return true when input contains letters only', (assert) => {
    assert.isTrue(Is.alphaNumeric('hello'))
  })

  test('return true when input contains letters and numbers both', (assert) => {
    assert.isTrue(Is.alphaNumeric('hello123'))
  })

  test('return true when input are numbers only', (assert) => {
    assert.isTrue(Is.alphaNumeric('123'))
  })

  test('return true when input is yes', (assert) => {
    assert.isTrue(Is.affirmative('yes'))
  })

  test('return true when input is ok', (assert) => {
    assert.isTrue(Is.affirmative('ok'))
  })

  test('return true when input is okay', (assert) => {
    assert.isTrue(Is.affirmative('okay'))
  })

  test('return true when input is y', (assert) => {
    assert.isTrue(Is.affirmative('y'))
  })

  test('return true when input is A', (assert) => {
    assert.isTrue(Is.affirmative('A'))
  })

  test('return false when input is No', (assert) => {
    assert.isFalse(Is.affirmative('no'))
  })

  test('return true when is a valid ip address ', (assert) => {
    assert.isTrue(Is.ip('127.0.0.1'))
  })

  test('return true when is a valid ipv6 ip address ', (assert) => {
    assert.isTrue(Is.ip('1:2:3:4:5:6:7:8'))
  })
})

test.group('Raw | Arthmetic', () => {
  test('return true when 2 numeric values are same', (assert) => {
    assert.isTrue(Is.same(42, 40 + 2))
  })

  test('return true when 2 string values are same', (assert) => {
    assert.isTrue(Is.same('yeah', 'yeah'))
  })

  test('return true when 2 boolean values are same', (assert) => {
    assert.isTrue(Is.same(true, true))
  })

  test('return true when input is a even number', (assert) => {
    assert.isTrue(Is.even(4))
  })

  test('return false when input is not a even number', (assert) => {
    assert.isFalse(Is.even(5))
  })

  test('return false when input is not a number', (assert) => {
    assert.isFalse(Is.even('hello'))
  })

  test('return true when is a number like string and strict is false', (assert) => {
    assert.isTrue(Is.even('10'))
  })

  test('return false when is a number like string and strict is true', (assert) => {
    assert.isFalse(Is.even('10', true))
  })

  test('return false when input is not a odd number', (assert) => {
    assert.isFalse(Is.odd(4))
  })

  test('return true when input is a odd number', (assert) => {
    assert.isTrue(Is.odd(5))
  })

  test('return true when input is greater than 0', (assert) => {
    assert.isTrue(Is.positive(1))
  })

  test('return false when input is less than 0', (assert) => {
    assert.isFalse(Is.positive(-42))
  })

  test('return true when input is less than 0', (assert) => {
    assert.isTrue(Is.negative(-42))
  })

  test('return false when input is greater than 0', (assert) => {
    assert.isFalse(Is.negative(42))
  })

  test('return true when input is greater than comparison input', (assert) => {
    assert.isTrue(Is.above(42, 40))
  })

  test('return false when input is less than comparison input', (assert) => {
    assert.isFalse(Is.above(42, 45))
  })

  test('return false when input is greater than comparison input', (assert) => {
    assert.isFalse(Is.under(42, 40))
  })

  test('return true when input is less than comparison input', (assert) => {
    assert.isTrue(Is.under(30, 40))
  })

  test('return true when input value is between comparison inputs', (assert) => {
    assert.isTrue(Is.between(30, 20, 40))
  })

  test('return false when input value is not between comparison inputs', (assert) => {
    assert.isFalse(Is.between(30, 35, 40))
  })
})

test.group('Raw | Array', () => {
  test('return true when value falls in an array', (assert) => {
    assert.isTrue(Is.inArray(2, [1, 2, 3]))
  })

  test('return false when value does not fall in an array', (assert) => {
    assert.isFalse(Is.inArray(2, [1, 3, 5]))
  })

  test('return false when comparison value is not an array', (assert) => {
    assert.isFalse(Is.inArray(2, {} as any))
  })

  test('return false when array is not sorted', (assert) => {
    assert.isFalse(Is.sorted([1, 2, 4, 1]))
  })

  test('return false when array has negative values', (assert) => {
    assert.isFalse(Is.sorted([3, 9, -3, 10]))
  })

  test('should true when there is only one value inside the array', (assert) => {
    assert.isTrue(Is.sorted([3]))
  })

  test('return false when input is not an array', (assert) => {
    assert.isFalse((Is.sorted as any)(1))
  })

  test('return true when array is sorted', (assert) => {
    assert.isTrue(Is.sorted([1, 2, 4, 5]))
  })

  test('return false when input array values are not in targeted array', (assert) => {
    assert.isFalse(Is.intersectAny([10, 20], [30, 40, 50]))
  })

  test('return true when if of the values falls in targerted array', (assert) => {
    assert.isTrue(Is.intersectAny([10, 20], [30, 10, 50]))
  })

  test('return false when input value is not an array', (assert) => {
    assert.isFalse((Is.intersectAny as any)(10, [30, 10, 50]))
  })

  test('return false when target value is not an array', (assert) => {
    assert.isFalse((Is.intersectAny as any)([10, 20], 10))
  })

  test('return false when input array values are not in targeted array', (assert) => {
    assert.isFalse(Is.intersectAll([10, 20], [30, 40, 50]))
  })

  test('return false when any one value falls in targeted array', (assert) => {
    assert.isFalse(Is.intersectAll([10, 20], [10, 40, 50]))
  })

  test('return true when all values falls in targeted array', (assert) => {
    assert.isTrue(Is.intersectAll([10, 20], [10, 20, 50]))
  })

  test('return false when input value is not an array', (assert) => {
    assert.isFalse((Is.intersectAll as any)(10, [30, 10, 50]))
  })

  test('return false when target value is not an array', (assert) => {
    assert.isFalse((Is.intersectAll as any)([10, 20], 10))
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

  test('return false when any of inputs are not array', (assert) => {
    assert.isFalse(Is.subset(({} as any), ['foo', 'bar', 'baz']))
    assert.isFalse(Is.subset(['foo'], {} as any))
  })
})

test.group('Raw | Dates', () => {
  test('return true when date is today', (assert) => {
    const isToday = Is.today(new Date())
    assert.isTrue(isToday)
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
    assert.isTrue(isToday)
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
    assert.isTrue(isYesterday)
  })

  test('return false when date is not yesterday', (assert) => {
    const isYesterday = Is.yesterday('2001-11-02')
    assert.isFalse(isYesterday)
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
    assert.isTrue(isTomorrow)
  })

  test('return false when date is not tomorrow', (assert) => {
    const isTomorrow = Is.tomorrow('2001-11-04')
    assert.isFalse(isTomorrow)
  })

  test('return false when date is not in past', (assert) => {
    const isPast = Is.past('2200-11-05')
    assert.isFalse(isPast)
  })

  test('return true when date is in past', (assert) => {
    const isPast = Is.past('2001-11-01')
    assert.isTrue(isPast)
  })

  test('return false when date is in past', (assert) => {
    const isFuture = Is.future('2001-11-01')
    assert.isFalse(isFuture)
  })

  test('return true when date is in future', (assert) => {
    const isFuture = Is.future('2200-11-01')
    assert.isTrue(isFuture)
  })

  test('return true when date between 2 dates', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-30')
    assert.isTrue(isInDateRange)
  })

  test('return false when min date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-22', '2015-11-30')
    assert.isFalse(isInDateRange)
  })

  test('return false when max date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-15')
    assert.isFalse(isInDateRange)
  })

  test('return false when date is not after defined offset', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(new Date(), 12, 'months')
    assert.isFalse(isAfterOffset)
  })

  test('return true when date is after defined offset months', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addMonths(new Date(), 13), 12, 'months')
    assert.isTrue(isAfterOffset)
  })

  test('return true when date is after defined offset days', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addDays(new Date(), 2), 1, 'days')
    assert.isTrue(isAfterOffset)
  })

  test('return true when date is after defined offset minutes', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addMinutes(new Date(), 30), 20, 'minutes')
    assert.isTrue(isAfterOffset)
  })

  test('return true when date is after defined offset seconds', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addSeconds(new Date(), 30), 20, 'seconds')
    assert.isTrue(isAfterOffset)
  })

  test('return true when date is after defined offset hours', (assert) => {
    const isAfterOffset = Is.afterOffsetOf(addHours(new Date(), 10), 9, 'hours')
    assert.isTrue(isAfterOffset)
  })

  test('return false when calc unit is invalid', (assert) => {
    const calcUnit = 'foo' as any
    const isAfterOffset = Is.afterOffsetOf(addHours(new Date(), 10), 9, calcUnit)
    assert.isFalse(isAfterOffset)
  })

  test('return false when date is not before defined offset', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(new Date(), 12, 'months')
    assert.isFalse(isBeforeOffset)
  })

  test('return true when date is before defined offset', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 13), 12, 'months')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset milliseconds', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMilliseconds(new Date(), 40), 12, 'milliseconds')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset weeks', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subWeeks(new Date(), 2), 1, 'weeks')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset quaters', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subQuarters(new Date(), 2), 1, 'quarters')
    assert.isTrue(isBeforeOffset)
  })

  test('return true when date is before defined offset years', (assert) => {
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 16), 1, 'years')
    assert.isTrue(isBeforeOffset)
  })

  test('return false when calc unit is invalid', (assert) => {
    const calcUnit = 'foo' as any
    const isBeforeOffset = Is.beforeOffsetOf(subMonths(new Date(), 16), 1, calcUnit)
    assert.isFalse(isBeforeOffset)
  })

  test('return true when valid format is valid as per allowed format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), 'YYYY-MM-DD')
    assert.isTrue(isFormatted)
  })

  test('return false when date is invalid', (assert) => {
    const isFormatted = Is.dateFormat('hello', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return false when date is set to string Invalid date', (assert) => {
    const isFormatted = Is.dateFormat('Invalid Date', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return true when date is valid as per any given format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD'])
    assert.isTrue(isFormatted)
  })

  test('ignore timezones when matching date formats', (assert) => {
    assert.isTrue(Is.dateFormat(format(new Date(), 'YYYY-MM-DD ZZ'), ['YYYY/MM/DD', 'YYYY-MM-DD ZZ']))
    assert.isTrue(Is.dateFormat(format(new Date(), 'YYYY-MM-DD Z'), ['YYYY/MM/DD', 'YYYY-MM-DD Z']))
  })

  test('return false when original input is missing format', (assert) => {
    assert.isFalse(Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD ZZ']))
    assert.isFalse(Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD Z']))
  })
})
