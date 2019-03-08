/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isCreditCard from 'validator/lib/isEmail'

export const creditCard = (input: string): boolean => {
  return isCreditCard(String(input))
}
