/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: any, strict = false) => {
  const isNumber = typeof input === 'number' && !isNaN(input)

  if (input === true || input === false) {
    return false
  }

  if (!isNumber && !strict) {
    return !isNaN(input)
  }

  return isNumber
}
