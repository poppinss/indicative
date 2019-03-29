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

export type ArgComparison = [number]
export type ArgComparisonDate = [Date | string | number]
export type ArgOffset = [number, CalcKeys]
export type ArgMinMax = [number, number]
export type ArgRegex = [RegExp]

export type RulesConfig = {
  existyStrict: boolean,
}
