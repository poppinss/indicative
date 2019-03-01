/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as slug from '@slynova/slug'

/**
 * Converts a string to URL friendly slug. If value is not a string, it will be
 * returned as it is.
 *
 * Also it will handle ascii charmaps and converts to their utf-8 counter parts.
 *
 * [source, text]
 * ----
 * I am > than you
 * ----
 *
 * will become
 *
 * [source, text]
 * ----
 * i-am-greater-than-you
 * ----
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   slug: 'slug'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   slug: [
 *     rule('slug')
 *   ]
 * }
 * ----
 */
export default<T extends any> (value: T): T => {
  if (typeof (value) !== 'string') {
    return value
  }

  return slug(value)
}
