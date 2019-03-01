/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Get fn is passed to rule implementation to read nested values
 * form an object.
 */
export type GetFn<T extends any> = ((data: DataNode, field: string) => T)

/**
 * Shape of validation function
 */
export type ValidationFn = ((
  data: DataNode,
  field: string,
  message: string,
  args: any[],
  get: GetFn<any>,
) => Promise<any>)

export type SanitizationFn = ((value: any, args?: any[]) => unknown)

/**
 * Shape of validations object.
 */
export type ValidationsNode = {
  [field: string]: ValidationFn,
}

/**
 * Shape of rules node. Rules are defined by the
 * end user
 */
export type RulesNode = {
  [field: string]: string | ParsedRuleNode[],
}

/**
 * Parsed rule node is used internally to run the
 * validation.
 */
export type ParsedRuleNode = {
  name: string,
  args: any[],
}

/**
 * Shape of parsed rules node. [[RulesNode]] will be
 * transformed to [[ParsedRulesNode]]
 */
export type ParsedRulesNode = {
  [field: string]: ParsedRuleNode[],
}

/**
 * Shape of validation promises.
 */
export type PromiseResultNode = {
  fullFilled: boolean,
  rejected: boolean,
  value?: any,
  reason?: Error | string,
}

/**
 * Shape of data against which validations
 * are executed
 */
export type DataNode = {
  [field: string]: any,
}

/**
 * Shape of custom messages.
 */
export type MessagesNode = {
  [field: string]: string | ((field: string, validation: string, args: any[]) => string),
}

/**
 * Shape of error returned by Vanilla formatter
 */
export type VanillaErrorNode = {
  message: string,
  field: string,
  validation: string,
}

/**
 * Shape of the error returned by JsonApi formatter
 */
export type JsonapiErrorNode = {
  title: string,
  detail: string,
  source: {
    pointer: string,
  },
}

/**
 * Formatter consturctor, since instance of formatters
 * are created during validation
 */
export interface IndicativeFormatterConstructor {
  new (): IndicativeFormatter,
}

/**
 * Formatter interface
 */
export interface IndicativeFormatter {
  errors: unknown[],
  addError (error: string | Error, field: String, validation: String, args: string[]): void
  toJSON (): unknown,
}

/**
 * Public config shape
 */
export type IndicativeConfig = {
  EXISTY_STRICT: boolean,
  FORMATTER: IndicativeFormatterConstructor,
}

/**
 * Keys used for calculating day and time differences
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

/**
 * An interface with all the rules. We need this to have
 * support for autocomplete when users wants to use
 * explicit mode.
 */
export interface IndicativeRules {
  above (args: ArgComparison): ParsedRuleNode,
  accepted (): ParsedRuleNode,
  after (args: ArgComparisonDate): ParsedRuleNode,
  afterOffsetOf (args: ArgOffset): ParsedRuleNode,
  alpha (): ParsedRuleNode,
  alphaNumeric (): ParsedRuleNode,
  array (): ParsedRuleNode,
  before (args: ArgComparisonDate): ParsedRuleNode,
  beforeOffsetOf (args: ArgOffset): ParsedRuleNode,
  boolean (): ParsedRuleNode,
  confirmed (): ParsedRuleNode,
  date (): ParsedRuleNode,
  dateFormat (args: string[]): ParsedRuleNode,
  different (args: [string]): ParsedRuleNode,
  email (): ParsedRuleNode,
  endsWith (): ParsedRuleNode,
  equals (args: [string]): ParsedRuleNode,
  in (args: any[]): ParsedRuleNode,
  includes (args: [string]): ParsedRuleNode,
  integer (): ParsedRuleNode,
  ip (): ParsedRuleNode,
  ipv4 (): ParsedRuleNode,
  ipv6 (): ParsedRuleNode,
  json (): ParsedRuleNode,
  max (args: ArgComparison): ParsedRuleNode,
  min (args: ArgComparison): ParsedRuleNode,
  notEquals (args: [any]): ParsedRuleNode,
  notIn (args: any[]): ParsedRuleNode,
  number (): ParsedRuleNode,
  object (): ParsedRuleNode,
  range (args: ArgMinMax): ParsedRuleNode,
  regex (args: ArgRegex): ParsedRuleNode,
  required (): ParsedRuleNode,
  requiredIf (args: [string]): ParsedRuleNode,
  requiredWhen (args: [string, any]): ParsedRuleNode,
  requiredWithAll (args: string[]): ParsedRuleNode,
  requiredWithAny (args: string[]): ParsedRuleNode,
  requiredWithoutAll (args: string[]): ParsedRuleNode,
  requiredWithoutAny (args: string[]): ParsedRuleNode,
  same (args: [string]): ParsedRuleNode,
  startsWith (args: [string]): ParsedRuleNode,
  string (args: [string]): ParsedRuleNode,
  subset (args: any[]): ParsedRuleNode,
  under (args: [string | number]): ParsedRuleNode,
  url (): ParsedRuleNode,
}
