/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: string | Date, strict = false): boolean => {
  const isDateInstance = input instanceof Date
  if (!isDateInstance && !strict) {
    return new Date(input).toString() !== 'Invalid Date'
  }
  return isDateInstance
}
