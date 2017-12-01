'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const _ = require('lodash')
const slug = require('@slynova/slug')
const pluralize = require('pluralize')

const domains = /^hotmail\.com|gmail\.com|live\.com$/
const linksRegex = /<a\b[^>]*>(.*?)<\/a>/ig
const tagsRegex = /<\/?[^>]+(>|$)/g

let SanitizationFilters = exports = module.exports = {}

/**
 * @description tells whether domain falls in one of the
 * normalized providers or not
 * @method _isNormalizeableProvider
 * @param  {String}                 domain
 * @return {Boolean}
 */
function _isNormalizeableProvider (domain) {
  return domains.test(domain)
}

/**
 * @description tells whether email is hotmail or not
 * @method _isHotmail
 * @param  {String}   domain
 * @return {Boolean}
 * @private
 */
function _isHotmail (domain) {
  return /hotmail\.com$/.test(domain)
}

/**
 * @description replaces a pattern with a substitue
 * only if value is a string
 * @method _replace
 * @param  {Mixed} value
 * @param  {Regex} pattern
 * @param  {String|Function} subsitute
 * @return {Mixed}
 * @private
 */
function _replace (value, pattern, subsitute) {
  if (typeof (value) !== 'string') {
    return value
  }
  return value.replace(pattern, subsitute)
}

/**
 * @description removes blacklisted values from string
 * @method blacklist
 * @param  {String}  value
 * @param  {Array}  args
 * @return {String}
 * @public
 */
SanitizationFilters.blacklist = function (value, args) {
  const blacklistRegex = new RegExp(`[${args[0]}]`, 'g')
  return _replace(value, blacklistRegex, '')
}

/**
 * @description escapes an input if it's string
 * @method escape
 * @param  {String} value
 * @return {String}
 * @public
 */
SanitizationFilters.escape = function (value) {
  if (typeof (value) !== 'string') {
    return value
  }

  return (
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F;')
    .replace(/\//g, '&#96;')
  )
}

/**
 * @description normalizes an email by removing all unncessary
 * characters from it
 * @method normalizeEmail
 * @param  {String}       value
 * @param  {Array}       args
 * @return {String}
 * @public
 */
SanitizationFilters.normalizeEmail = function (value, args) {
  const options = {
    lowercase: true,
    removeDots: true,
    removeExtension: true
  }

  if (args instanceof Array) {
    args.forEach(function (option) {
      if (option === '!lc') {
        options.lowercase = false
      }
      if (option === '!rd') {
        options.removeDots = false
      }
      if (option === '!re') {
        options.removeExtension = false
      }
    })
  }

  if (typeof (value) !== 'string') {
    return value
  }

  const splitValue = value.split('@')

  if (!splitValue[1]) {
    return value
  }

  let username = options.lowercase ? splitValue[0].toLowerCase() : splitValue[0]
  const domain = splitValue[1] === 'googlemail.com' ? 'gmail.com' : splitValue[1].toLowerCase()

  if (options.removeExtension && _isNormalizeableProvider(domain)) {
    username = username.split('+')[0]
  }

  if (options.removeDots && !_isHotmail(domain)) {
    username = username.replace(/\./g, '')
  }

  return `${username}@${domain}`
}

/**
 * @description coverts a value to boolean all values
 * with positive inputs yields to true
 * @method toBoolean
 * @param  {Mixed}  value
 * @return {Boolean}
 * @public
 */
SanitizationFilters.toBoolean = function (value) {
  if (!value || value === 'false' || value === '0') {
    return false
  }
  return true
}

/**
 * @description converts a value to float or returns
 * NaN when unable to make it a flat
 * @method toFloat
 * @param  {Mixed} value
 * @return {Float}
 * @public
 */
SanitizationFilters.toFloat = function (value) {
  return parseFloat(value)
}

/**
 * @description coverts a value to integer or returns
 * NaN
 * @method toInt
 * @param  {Mixed} value
 * @param  {Array} args
 * @return {Integer}
 * @public
 */
SanitizationFilters.toInt = function (value, args) {
  const radix = _.isNumber(_.get(args, '0')) ? args[0] : 10
  return parseInt(value, radix)
}

/**
 * @desription converts a date to a date object or
 * return null when invalid date
 * @method toDate
 * @param  {Mixed} value
 * @return {String}
 */
SanitizationFilters.toDate = function (value) {
  const dateValue = new Date(value)
  return (dateValue.toString() === 'Invalid Date') ? null : dateValue
}

/**
 * @description strips a tags from string
 * @method stripLinks
 * @param  {String}   value
 * @return {String}
 * @public
 */
SanitizationFilters.stripLinks = function (value) {
  return _replace(value, linksRegex, function (index, group) {
    return group.trim()
  })
}

/**
 * @description strips html tags from a give value
 * and also removes unwanted spaces if trim is
 * set to true
 * @method stripTags
 * @param  {String}  value
 * @param  {Array}  args
 * @return {String}
 * @public
 */
SanitizationFilters.stripTags = function (value, args) {
  const strict = _.get(args, '0') === 'trim'
  value = _replace(value, tagsRegex, '')
  if (strict) {
    value = _replace(value, /\s+/g, ' ')
  }
  return typeof (value) === 'string' ? value.trim() : value
}

SanitizationFilters.plural = function (value) {
  return pluralize(value)
}

SanitizationFilters.singular = function (value) {
  return pluralize.singular(value)
}

SanitizationFilters.camelCase = function (value) {
  return _.camelCase(value)
}

SanitizationFilters.capitalize = function (value) {
  return _.capitalize(value)
}

SanitizationFilters.decapitalize = function (value) {
  return _.lowerFirst(value)
}

SanitizationFilters.title = function (value) {
  return _.startCase(value)
}

SanitizationFilters.underscore = function (value) {
  return _.snakeCase(value)
}

SanitizationFilters.toDash = function (value) {
  return _.kebabCase(value)
}

SanitizationFilters.slug = function (value) {
  return slug(value)
}

SanitizationFilters.humanize = function (value) {
  return _.upperFirst(_.lowerCase(value))
}
