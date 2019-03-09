/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Converts value to a date. If value is already an instance of `Date`, then it
 * is returned as it is.
 *
 * Otherwise, the value will be wrapped under `new Date()` and instance of it is
 * returned. In case `wrapped date` is invalid, `null` will be returned.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   created_at: 'date'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   created_at: [
 *     rule('date')
 *   ]
 * }
 * ----
 */
export const toDate = (value: any): Date | null => {
  if (value instanceof Date) {
    return value
  }

  const toDate = new Date(value)
  return (toDate.toString() === 'Invalid Date') ? null : toDate
}
