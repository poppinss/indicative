/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: Date | string, strict = true) => {
  if (input instanceof Date === true) {
    return true
  }

  if (strict) {
    return false
  }

  return new Date(input).toString() !== 'Invalid Date'
}
