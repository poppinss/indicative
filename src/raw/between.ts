/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns a boolean telling, if the given value is between `min` and `max`
 * or not. Values will be casted to `Number`.
 */
export default (input: string | number, min: string | number, max: string | number): boolean => {
  input = Number(input)
  return (input > Number(min)) && (input < Number(max))
}
