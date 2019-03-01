/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const bools = [true, false, 0, 1]
const boolsString = ['true', 'false', '0', '1']

/**
 * Returns a boolean telling if value is boolean like
 * string or not. If input is a string, it will be
 * casted to their counterpart booleans.
 */
export default (input: any, strict = false) => {
  if (strict) {
    return typeof(input) === 'boolean' && bools.indexOf(input) > -1
  }

  return boolsString.indexOf(String(input)) > -1
}
