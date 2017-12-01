'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const addYears = require('date-fns/add_years')
const addQuarters = require('date-fns/add_quarters')
const addMonths = require('date-fns/add_months')
const addDays = require('date-fns/add_days')
const addWeeks = require('date-fns/add_weeks')
const addHours = require('date-fns/add_hours')
const addMinutes = require('date-fns/add_minutes')
const addSeconds = require('date-fns/add_seconds')
const addMilliseconds = require('date-fns/add_milliseconds')
const subYears = require('date-fns/sub_years')
const subQuarters = require('date-fns/sub_quarters')
const subMonths = require('date-fns/sub_months')
const subDays = require('date-fns/sub_days')
const subWeeks = require('date-fns/sub_weeks')
const subHours = require('date-fns/sub_hours')
const subMinutes = require('date-fns/sub_minutes')
const subSeconds = require('date-fns/sub_seconds')
const subMilliseconds = require('date-fns/sub_milliseconds')
const format = require('date-fns/format')
const isAfter = require('date-fns/is_after')
const isBefore = require('date-fns/is_before')
const isPast = require('date-fns/is_past')
const isToday = require('date-fns/is_today')
const isTomorrow = require('date-fns/is_tomorrow')
const isValid = require('date-fns/is_valid')
const isWithinRange = require('date-fns/is_within_range')
const isYesterday = require('date-fns/is_yesterday')
const parseDate = require('date-fns/parse')

/**
 * list of creepy regex, no they work nice
 */
const urlRegex = /https?:\/\/(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}|localhost)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
const emailRegex = /^([\w-]+(?:\.[\w-]+)*)(\+[\w.-]+)?@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,63}(?:\.[a-z]{2})?)$/i
const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/
const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/
const alphaNumericRegex = /^[a-z0-9]+$/i
const alphaRegex = /^[a-z]+$/i
const ipv4Regex = /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}$/
const ipv6Regex = /^(?:(?:[0-9a-fA-F:]){1,4}(?:(?::(?:[0-9a-fA-F]){1,4}|:)){2,7})+$/

let Raw = exports = module.exports = {}

/**
 * @description tells whether input is a valid
 * array or not
 * @method array
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.array = function (input) {
  return input instanceof Array
}

/**
 * @description tells whether input is a valid
 * boolean or not
 * @method boolean
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.boolean = function (input) {
  if (input === 0) {
    input = false
  } else if (input === 1) {
    input = true
  }
  return typeof (input) === 'boolean'
}

/**
 * @description tells whether input is a valid
 * date or not
 * @method date
 * @param  {Mixed} input
 * @param  {Boolean} strict
 * @return {Boolean}
 * @example
 *   date(new Date())
 *   date("2015-11-30") strict needs to be disabled
 * @public
 */
Raw.date = function (input, strict) {
  const isDateInstance = input instanceof Date
  if (!isDateInstance && !strict) {
    return new Date(input).toString() !== 'Invalid Date'
  }
  return isDateInstance
}

/**
 * @description tells whether input is a valid function
 * or not
 * @method function
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw['function'] = function (input) {
  return typeof (input) === 'function'
}

/**
 * @description tells whether input is null
 * or not
 * @method null
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.null = function (input) {
  return input === null
}

/**
 * @description tells type of input is
 * a valid number or not
 * @method number
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.number = function (input) {
  return typeof (input) === 'number'
}

/**
 * @description tells whether input is a valid
 * object or not
 * @method object
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.object = function (input) {
  return input instanceof Object && !Raw.array(input)
}

/**
 * @description tells whether input is a valid
 * JSON string or not
 * @method json
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.json = function (input) {
  try {
    JSON.parse(input)
    return true
  } catch (e) {
    return false
  }
}

/**
 * @description tells whether input is of type
 * string or not
 * @method string
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.string = function (input) {
  return typeof (input) === 'string'
}

/**
 * @description matches 2 input are of same type or
 * not
 * @method sameType
 * @param  {Mixed} input
 * @param  {Mixed} comparsionInput
 * @return {Boolean}
 * @public
 */
Raw.sameType = function (input, comparsionInput) {
  return typeof (input) === typeof (comparsionInput)
}

/**
 * @description tells whether input exists or not
 * @method existy
 * @param  {Mixed} input
 * @return {Boolean}
 * @example
 *   Following returns to false
 *   null
 *   undefined
 *   Empty string
 *  @public
 */
Raw.existy = function (input) {
  if (typeof (input) === 'string') {
    return input.length > 0
  }
  return (input !== null && input !== undefined)
}

/**
 * @description tells whether input is truthy or
 * not
 * @method truthy
 * @param  {Mixed} input
 * @return {Boolean}
 * @example
 *   exists need to true
 *   not false
 *   not 0
 *  @public
 */
Raw.truthy = function (input) {
  return Raw.existy(input) && input !== false && input !== 0
}

/**
 * @description tells whether input is falsy or not, opposite
 * of truthy
 * @method falsy
 * @param  {Mixed} input
 * @return {Boolean}
 * @public
 */
Raw.falsy = function (input) {
  return !Raw.truthy(input)
}

/**
 * @description tells whether input is empty or not
 * @method empty
 * @param  {Mixed} input
 * @return {Boolean}
 * @example
 *   Following yield to true
 *    empty({})
 *    empty([])
 *    empty('')
 *    empty(null)
 *    empty(undefined)
 */
Raw.empty = function (input) {
  if (!Raw.existy(input)) {
    return true
  }

  if (Raw.date(input)) {
    return false
  }

  const type = typeof (input)

  switch (type) {
    case 'object' :
      return Object.keys(input).length === 0
    case 'string' :
      return input.length === 0
  }
}

/**
 * @description executes a given regex on a given input
 * @method regex
 * @param  {String} input
 * @param  {Regex} regex
 * @return {Boolean}
 * @public
 */
Raw.regex = function (input, regex) {
  return regex.test(input)
}

/**
 * @description tells whether given input is a valid url
 * or not
 * @method url
 * @param  {String} input
 * @return {Boolean}
 * @example
 *   Following yields to true
 *   http://foo.com
 *   https://foo.com
 *   http://foo.co.in
 *  @public
 */
Raw.url = function (input) {
  return Raw.regex(input, urlRegex)
}

/**
 * @description tells whether given input is a valid email
 * address or not
 * @method email
 * @param  {String} input
 * @return {Boolean}
 * @public
 */
Raw.email = function (input) {
  return Raw.regex(input, emailRegex)
}

/**
 * @description tells whether given input is a valid phone
 * number or not
 * @method phone
 * @param  {Number} input
 * @return {Boolean}
 * @example
 *   Following yield to true
 *   1235554567
 *   444-555-1234
 *   246.555.8888
 * @public
 */
Raw.phone = function (input) {
  return Raw.regex(input, phoneRegex)
}

/**
 * @description tells whether input is a valid credit card
 * number or not
 * @method creditCard
 * @param  {String}   input
 * @return {Boolean}
 * @example
 *   Works for
 *   Visa
 *   MasterCard
 *   American Express
 *   Diners Club
 *   Discover
 *   JCB
 *  @public
 */
Raw.creditCard = function (input) {
  input = input.replace(/-/g, '')
  return Raw.regex(input, creditCardRegex)
}

/**
 * @description makes sure given field contains
 * letters only
 * @method alpha
 * @param  {String} input
 * @return {Boolean}
 * @public
 */
Raw.alpha = function (input) {
  return Raw.regex(input, alphaRegex)
}

/**
 * @description tells whether input is a valid alpha numeric
 * string or not
 * @method alphaNumeric
 * @param  {String|Number}     input
 * @return {Boolean}
 * @public
 */
Raw.alphaNumeric = function (input) {
  return Raw.regex(input, alphaNumericRegex)
}

/**
 * @description tells whether input is affirmative or
 * not
 * @method affirmative
 * @param  {String}    input
 * @return {Boolean}
 * @example
 *   Following yields true
 *   yes, true, y, ok, okay, A
 *  @public
 */
Raw.affirmative = function (input) {
  const affirmativeArray = ['yes', 'true', 'y', 'ok', 'okay']
  if (input === 'A') {
    return true
  }
  return affirmativeArray.indexOf(input.toLowerCase()) > -1
}

/**
 * @description tells whether ip address is a valid ipv4 ip
 * address
 * @method ipv4
 * @param  {String} input
 * @return {Boolean}
 * @public
 */
Raw.ipv4 = function (input) {
  return Raw.regex(input, ipv4Regex)
}

/**
 * @description tells whether ip address is a valid ipv6 ip
 * address
 * @method ipv6
 * @param  {String} input
 * @return {Boolean}
 * @public
 */
Raw.ipv6 = function (input) {
  return Raw.regex(input, ipv6Regex)
}

/**
 * @description tells whether ip address is a valid ipv4 or
 * ipv6 ip address
 * @method ip
 * @param  {String} input
 * @return {Boolean}
 * @public
 */
Raw.ip = function (input) {
  return Raw.ipv4(input) || Raw.ipv6(input)
}

/**
 * @description tells whether 2 values are identically same
 * @method same
 * @param  {Mixed} input
 * @param  {Mixed} comparsionInput
 * @return {Boolean}
 * @public
 */
Raw.same = function (input, comparsionInput) {
  return input === comparsionInput
}

/**
 * @description tells whether input is a even number or
 * not
 * @method even
 * @param  {Number} input
 * @return {Boolean}
 * @public
 */
Raw.even = function (input) {
  return Number(input) % 2 === 0
}

/**
 * @description tells whether input is a odd number or
 * not
 * @method odd
 * @param  {Number} input
 * @return {Boolean}
 * @public
 */
Raw.odd = function (input) {
  return !Raw.even(input)
}

/**
 * @description tells whether input is a positive number or not
 * @method positive
 * @param  {Number} input
 * @return {Boolean}
 * @public
 */
Raw.positive = function (input) {
  return Number(input) >= 0
}

/**
 * @description tells whether input is a negative number or not
 * @method negative
 * @param  {Number} input
 * @return {Boolean}
 * @public
 */
Raw.negative = function (input) {
  return !Raw.positive(input)
}

/**
 * @description tells whether input is above comparison
 * input
 * @method above
 * @param  {Number} input
 * @param  {Number} comparsionInput
 * @return {Boolean}
 * @public
 */
Raw.above = function (input, comparsionInput) {
  return Number(input) > Number(comparsionInput)
}

/**
 * @description tells whether input is under comparison
 * input
 * @method under
 * @param  {Number} input
 * @param  {Number} comparsionInput
 * @return {Boolean}
 * @public
 */
Raw.under = function (input, comparsionInput) {
  return !Raw.above(input, comparsionInput)
}

/**
 * @description tells whether a value lies between 2 values
 * or not
 * @method between
 * @param  {Number} input
 * @param  {Number} min
 * @param  {Number} max
 * @return {Boolean}
 * @public
 */
Raw.between = function (input, min, max) {
  input = Number(input)
  return (input > Number(min)) && (input < Number(max))
}

/**
 * @description tells whether a value lies in an array or
 * not
 * @method inArray
 * @param  {String} input
 * @param  {Array} comparsionArray
 * @return {Boolean}
 * @public
 */
Raw.inArray = function (input, comparsionArray) {
  const isArrayInstance = comparsionArray instanceof Array
  if (!isArrayInstance) {
    return false
  }
  return comparsionArray.indexOf(input) > -1
}

/**
 * @description tells whether an array is sorted or not
 * @method sorted
 * @param  {Array} input
 * @return {Boolean}
 * @public
 */
Raw.sorted = function (input) {
  const isArrayInstance = input instanceof Array
  let downScale = 0
  if (!isArrayInstance) {
    return false
  }
  input.sort(function (a, b) {
    if (a > b) {
      downScale++
    }
  })
  return downScale === 0
}

/**
 * @description tells whether input date is today or not
 * @method today
 * @param  {String|Object} input
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.today = function (input) {
  return isToday(input)
}

/**
 * @description tells whether input date is a valid date
 * from yesterday or not
 * @method yesterday
 * @param  {String|Object}  input
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.yesterday = function (input) {
  return isYesterday(input)
}

/**
 * @description tells whether input date is a valid date
 * to tomorrow or not
 * @method tomorrow
 * @param  {String|Object}  input
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.tomorrow = function (input) {
  return isTomorrow(input)
}

/**
 * @description tells whether input date is in past or not
 * @method past
 * @param  {String|Object}  input
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.past = function (input) {
  return isPast(input)
}

/**
 * @description tells whether input date is in future or not
 * @method future
 * @param  {String|Object}  input
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.future = function (input) {
  return !Raw.past(input)
}

/**
 * @description tells whether input is after given date
 * @method after
 * @param  {String|Object} input
 * @param  {String|Object} afterDate
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.after = function (input, afterDate) {
  return isAfter(input, afterDate)
}

/**
 * @description tells whether input is after certain
 * offset from current date
 * @method afterOffsetOf
 * @param  {String}      input
 * @param  {Number}      number
 * @param  {String}      key
 * @return {Boolean}
 * @example
 *   key can be - years | quarters | months | weeks | days | hours | minutes | seconds | milliseconds
 * @public
 */
Raw.afterOffsetOf = function (input, number, key) {
  const add = {
    years: addYears,
    quarters: addQuarters,
    months: addMonths,
    weeks: addDays,
    days: addWeeks,
    hours: addHours,
    minutes: addMinutes,
    seconds: addSeconds,
    milliseconds: addMilliseconds
  }[key]

  const afterDate = add(new Date(), number)
  return isAfter(input, afterDate)
}

/**
 * @description tells whether input is before certain
 * offset from current date
 * @method beforeOffsetOf
 * @param  {String}      input
 * @param  {Number}      number
 * @param  {String}      key
 * @return {Boolean}
 * @example
 *   key can be - years | quarters | months | weeks | days | hours | minutes | seconds | milliseconds
 * @public
 */
Raw.beforeOffsetOf = function (input, number, key) {
  const sub = {
    years: subYears,
    quarters: subQuarters,
    months: subMonths,
    weeks: subDays,
    days: subWeeks,
    hours: subHours,
    minutes: subMinutes,
    seconds: subSeconds,
    milliseconds: subMilliseconds
  }[key]

  const beforeDate = sub(new Date(), number)
  return isBefore(input, beforeDate)
}

/**
 * @description tells whether input is before a given date
 * @method before
 * @param  {String|Object} input
 * @param  {String|Object} beforeDate
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.before = function (input, beforeDate) {
  return isBefore(input, beforeDate)
}

/**
 * @description tells whether input is a valid date for a given
 * format or not
 * @method dateFormat
 * @param  {String}  input
 * @param  {Array}  formats
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 * @public
 */
Raw.dateFormat = function (input, formats) {
  const formatsArray = Array.isArray(formats) ? formats : [formats]
  return formatsArray.some(pattern => {
    return isValid(parseDate(input)) && format(input, pattern) === input
  })
}

/**
 * @description tells whether a given date is between 2 dates or not
 * @method inDateRange
 * @param  {String}    input
 * @param  {String}    minDate
 * @param  {String}    maxDate
 * @return {Boolean}
 * @example
 *   accepts
 *   2015-11-30
 *   new Date()
 * @public
 */
Raw.inDateRange = function (input, minDate, maxDate) {
  return isWithinRange(input, minDate, maxDate)
}

/**
 * @description makes sure any one value of one array
 * is present in another array
 * @method intersectAny
 * @param  {Array}     input
 * @param  {Array}     intersectionArray
 * @return {Boolean}
 */
Raw.intersectAny = function (input, intersectionArray) {
  const isArrayInstance = input instanceof Array
  const isIntersectionArrayInstance = intersectionArray instanceof Array
  let matchesCount = 0

  if (!isArrayInstance || !isIntersectionArrayInstance) {
    return false
  }

  input.filter(function (n) {
    if (intersectionArray.indexOf(n) > -1) {
      matchesCount++
    }
  })
  return matchesCount > 0
}

/**
 * @description makes sure all values of one array are
 * present in another array
 * @method intersectAll
 * @param  {Array}     input
 * @param  {Array}     intersectionArray
 * @return {Boolean}
 */
Raw.intersectAll = function (input, intersectionArray) {
  const isArrayInstance = input instanceof Array
  const isIntersectionArrayInstance = intersectionArray instanceof Array
  let matchesCount = 0

  if (!isArrayInstance || !isIntersectionArrayInstance) {
    return false
  }

  input.filter(function (n) {
    if (intersectionArray.indexOf(n) > -1) {
      matchesCount++
    }
  })

  return matchesCount === input.length
}
