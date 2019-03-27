/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling if value is boolean like
 * string or not. If input is a string, it will be
 * casted to their counterpart booleans.
 */
export const isBoolean = (input: boolean): boolean => {
  return typeof (input) === 'boolean'
}
