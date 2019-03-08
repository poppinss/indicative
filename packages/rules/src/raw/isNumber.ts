/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export const isNumber = (input: any, strict = false) => {
  if (strict) {
    return typeof (input) === 'number' && !isNaN(input)
  }

  return ['string', 'number'].indexOf(typeof (input)) > -1 && !isNaN(input)
}
