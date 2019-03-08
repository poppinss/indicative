/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { even } from './even'

export const odd = (input: string | number, strict: boolean = false) => {
  return !even(input, strict)
}
