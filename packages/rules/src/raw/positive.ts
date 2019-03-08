/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export const positive = (input: string | number, strict: boolean = false) => {
  if (!strict) {
    input = Number(input)
  }

  return input >= 0
}
