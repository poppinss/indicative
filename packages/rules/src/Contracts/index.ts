/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export type CalcKeys =
| 'years'
| 'quarters'
| 'months'
| 'weeks'
| 'days'
| 'hours'
| 'minutes'
| 'seconds'
| 'milliseconds'

export type ArgComparison = [ string | number ]
export type ArgComparisonDate = [ Date | string | number ]
export type ArgOffset = [ string | number, CalcKeys ]
export type ArgMinMax = [ string | number, string | number ]
export type ArgRegex = [ string | RegExp, string? ]

export type EmailValidationOptions = {
  allow_display_name: boolean,
  require_display_name: boolean,
  allow_utf8_local_part: boolean,
  require_tld: boolean,
  allow_ip_domain: boolean,
  domain_specific_validation: boolean,
}
