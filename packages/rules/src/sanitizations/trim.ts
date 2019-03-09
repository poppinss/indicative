/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Remove whitespace from both sides of a given string.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   username: 'trim'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   username: [
 *     rule('trim')
 *   ]
 * }
 * ----
 */
export const trim = (value: string): string => {
  if (typeof (value) !== 'string') {
    return value
  }

  return value.trim()
}
