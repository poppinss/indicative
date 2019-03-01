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
 * Converts a value to it's plural version. If value is not a string
 * then it will return as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   controllerName: 'plural'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   controllerName: [
 *     rule('plural')
 *   ]
 * }
 * ----
 */
export default<T extends any> (value: T): T => {
  if (typeof (value) !== 'string') {
    return value
  }

  return pluralize(value)
}
