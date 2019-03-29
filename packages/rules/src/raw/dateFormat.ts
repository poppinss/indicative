/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { format } from 'date-fns'

/**
 * Returns a boolean telling if value is valid as per the given date format
 * or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.dateFormat('2010-11-20', ['YYYY-MM-DD'])) {
 * }
 *
 * // You can also check against multiple format to see if it matches any one or not
 * if (is.dateFormat('2010-11-20', ['YYYY-MM-DD', 'YYYY/MM/DD'])) {
 * }
 * ```
 */
export const dateFormat = (input: string, formats: string | string[]): boolean => {
  return (Array.isArray(formats) ? formats : [formats]).some(pattern => {
    let sanitizedInput = input
    let hasTimeZone = false

    // Following https://www.w3.org/TR/NOTE-datetime
    if (pattern.endsWith('ZZ')) {
      sanitizedInput = input.replace(/(\+|-)\d{4}$/, '')
      pattern = pattern.replace(/ZZ$/, '')
      hasTimeZone = true
    } else if (pattern.endsWith('Z')) {
      sanitizedInput = input.replace(/Z$/, '').replace(/(\+|-)\d{2}:\d{2}$/, '')
      pattern = pattern.replace(/Z$/, '')
      hasTimeZone = true
    }

    const formattedInput = format(sanitizedInput, pattern)

    return formattedInput !== 'Invalid Date' &&
      formattedInput === sanitizedInput &&
      (!hasTimeZone || sanitizedInput !== input)
  })
}
