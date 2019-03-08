/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isEmail from 'validator/lib/isEmail'
import { EmailValidationOptions } from '../Contracts'

export const email = (input: string, options?: Partial<EmailValidationOptions>): boolean => {
  return isEmail(String(input), options)
}
