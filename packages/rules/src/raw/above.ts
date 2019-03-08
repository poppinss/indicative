/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Tells if `input` is greator than `comparsionInput`. If strings are
 * passed, they will be converted to number.
 */
export const above = (input: string | number, comparsionInput: string | number, strict = false): boolean => {
  if (!strict) {
    input = Number(input)
    comparsionInput = Number(comparsionInput)
  }

  return input > comparsionInput
}
