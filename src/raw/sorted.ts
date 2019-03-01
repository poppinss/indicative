/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default (input: number[] | string[]) => {
  if (!Array.isArray(input)) {
    return false
  }

  let scaledDown = false

  let i = 0
  while (i < input.length) {
    const b = Number(input[i++])
    const a = Number(input[i - 2])
    if (a && a > b) {
      scaledDown = true
      break
    }
  }

  return !scaledDown
}
