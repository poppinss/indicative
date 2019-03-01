/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isEmail from 'validator/lib/isEmail'

type EmailOptions = {
  allow_display_name: boolean,
  require_display_name: boolean,
  allow_utf8_local_part: boolean,
  require_tld: boolean,
  allow_ip_domain: boolean,
  domain_specific_validation: boolean,
}

export default (input: string, options?: Partial<EmailOptions>): boolean => {
  return isEmail(String(input), options)
}
