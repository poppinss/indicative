/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedRule } from 'indicative-parser'

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

export interface RulesContract {
  above ([minValue]: ArgComparison): ParsedRule,
  accepted (): ParsedRule,
  alpha (): ParsedRule,
  alphaNumeric (): ParsedRule,
  array (): ParsedRule,
  boolean (): ParsedRule,
  confirmed (): ParsedRule,
  different ([targetField]: [string]): ParsedRule,
  email (): ParsedRule,
  endsWith ([substring]: [string]): ParsedRule,
  equals ([comparisonValue]: [any]): ParsedRule,
  in (args: any[]): ParsedRule,
  includes ([substring]: [string]): ParsedRule,
  integer (): ParsedRule,
  ip (): ParsedRule,
  ipv4 (): ParsedRule,
  ipv6 (): ParsedRule,
  json (): ParsedRule,
  max ([maxLength]: ArgComparison): ParsedRule,
  min ([minLength]: ArgComparison): ParsedRule,
  notEquals ([comparisonValue]: [any]): ParsedRule,
  notIn (args: any[]): ParsedRule,
  number (): ParsedRule,
  object (): ParsedRule,
  range ([min, max]: ArgMinMax): ParsedRule,
  regex (): ParsedRule,
  required (): ParsedRule,
  requiredIf ([targetField]: [string]): ParsedRule,
  requiredWhen ([targetField, expectedValue]: [string, any]): ParsedRule,
  requiredWithAll (args: string[]): ParsedRule,
  requiredWithAny (args: string[]): ParsedRule,
  requiredWithoutAll (args: string[]): ParsedRule,
  requiredWithoutAny (args: string[]): ParsedRule,
  same ([targetField]: [string]): ParsedRule,
  startsWith ([substring]: [string]): ParsedRule,
  string (): ParsedRule,
  subset (args: any[]): ParsedRule,
  under ([maxValue]: ArgComparison): ParsedRule,
  url (): ParsedRule,
  after ([comparisonDate]: ArgComparisonDate): ParsedRule,
  before ([comparisonDate]: ArgComparisonDate): ParsedRule,
  date (): ParsedRule,
  dateFormat (args: string[]): ParsedRule,
  beforeOffsetOf ([diffUnit, key]: ArgOffset): ParsedRule,
  afterOffsetOf ([diffUnit, key]: ArgOffset): ParsedRule,
}
