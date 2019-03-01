/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import existy from '../raw/existy'

/**
 * Converts empty strings and `undefined` to `null`. It is
 * handy to keep data normalized at database level.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   bio: 'to_null'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   bio: [
 *     rule('to_null')
 *   ]
 * }
 * ----
 */
export default<T extends any> (value: T): T | null => {
  if (!existy(value)) {
    return null
  }

  return value
}
