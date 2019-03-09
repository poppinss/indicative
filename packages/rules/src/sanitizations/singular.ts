/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as pluralize from 'pluralize'

/**
 * Converts a value to it's singular version. If value is not a string
 * then it will return as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   modelName: 'singular'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   modelName: [
 *     rule('singular')
 *   ]
 * }
 * ----
 */
export const singular = (value: string): string => {
  if (typeof (value) !== 'string') {
    return value
  }

  return pluralize.singular(value)
}
