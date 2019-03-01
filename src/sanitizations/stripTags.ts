/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as striptags from 'striptags'

/**
 * Strips HTML tags from a string. If value is not a string, it will be returned
 * as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_tags'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_tags')
 *   ]
 * }
 * ----
 *
 * Also you can pass an array of whitelisted tags.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_tags:a,img'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_tags', ['a', 'img'])
 *   ]
 * }
 * ----
 */
export default<T extends any> (value: T, args?: string[]): T | string => {
  if (typeof (value) !== 'string') {
    return value
  }

  return striptags(value, args)
}
