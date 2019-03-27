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
export const between = (
  input: number,
  min: number,
  max: number,
): boolean => {
  return (input > min) && (input < max)
}
