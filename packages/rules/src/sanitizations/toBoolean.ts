/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Converts value to a boolean. If value is an `empty string`, `'false'` or `'0'`, it
 * will be converted to `false`, otherwise to `true`.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   is_admin: 'boolean'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   is_admin: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
export const toBoolean = (value: any): boolean => {
  if (!value || value === 'false' || value === '0') {
    return false
  }

  return true
}
