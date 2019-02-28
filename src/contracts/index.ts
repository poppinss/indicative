/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export type GetFn<T extends any> = ((data: DataNode, field: string) => T)

export type ValidationFn = ((
  data: DataNode,
  field: string,
  message: string,
  args: any[],
  get: GetFn<any>,
) => Promise<any>)

export type CalcKeys = 'years'
| 'quarters'
| 'months'
| 'weeks'
| 'days'
| 'hours'
| 'minutes'
| 'seconds'
| 'milliseconds'

export type ValidationsNode = {
  [field: string]: ValidationFn,
}

export type RulesNode = {
  [field: string]: string | ParsedRuleNode[],
}

export type ParsedRuleNode = {
  name: string,
  args: any[],
}

export type LazyPromiseResultNode = {
  fullFilled: boolean,
  rejected: boolean,
  value?: any,
  reason?: Error | string,
}

export type ParsedRulesNode = {
  [field: string]: ParsedRuleNode[],
}

export type DataNode = {
  [field: string]: any,
}

export type MessagesNode = {
  [field: string]: string | ((field: string, validation: string, args: string[]) => string),
}

export type VanillaErrorNode = {
  message: string,
  field: string,
  validation: string,
}

export type JsonapiErrorNode = {
  title: string,
  detail: string,
  source: {
    pointer: string,
  },
}

export interface IndicativeFormatterConstructor {
  new (): IndicativeFormatter,
}

export interface IndicativeFormatter {
  errors: unknown[],
  addError (error: string | Error, field: String, validation: String, args: string[]): void
  toJSON (): unknown,
}

export type IndicativeConfig = {
  EXISTY_STRICT: boolean,
  FORMATTER: IndicativeFormatterConstructor,
}
