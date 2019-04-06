/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ParsedRule } from 'indicative-parser'
import { ArgComparison, ArgMinMax, ArgComparisonDate, ArgOffset, RulesContract } from './Contracts'

/**
 * Shortcut to precompiled rules
 */
export const rules: RulesContract = {
  above ([minValue]: ArgComparison): ParsedRule {
    return { name: 'above', args: [minValue] }
  },
  accepted (): ParsedRule {
    return { name: 'accepted', args: [] }
  },
  alpha (): ParsedRule {
    return { name: 'alpha', args: [] }
  },
  alphaNumeric (): ParsedRule {
    return { name: 'alphaNumeric', args: [] }
  },
  array (): ParsedRule {
    return { name: 'array', args: [] }
  },
  boolean (): ParsedRule {
    return { name: 'boolean', args: [] }
  },
  confirmed (): ParsedRule {
    return { name: 'confirmed', args: [] }
  },
  different ([targetField]: [string]): ParsedRule {
    return { name: 'different', args: [targetField] }
  },
  email (): ParsedRule {
    return { name: 'email', args: [] }
  },
  endsWith ([substring]: [string]): ParsedRule {
    return { name: 'endsWith', args: [substring] }
  },
  equals ([comparisonValue]: [any]): ParsedRule {
    return { name: 'equals', args: [comparisonValue] }
  },
  in (args: any[]): ParsedRule {
    return { name: 'in', args }
  },
  includes ([substring]: [string]): ParsedRule {
    return { name: 'includes', args: [substring] }
  },
  integer (): ParsedRule {
    return { name: 'integer', args: [] }
  },
  float (): ParsedRule {
    return { name: 'float', args: [] }
  },
  ip (): ParsedRule {
    return { name: 'ip', args: [] }
  },
  ipv4 (): ParsedRule {
    return { name: 'ipv4', args: [] }
  },
  ipv6 (): ParsedRule {
    return { name: 'ipv6', args: [] }
  },
  json (): ParsedRule {
    return { name: 'json', args: [] }
  },
  max ([maxLength]: ArgComparison): ParsedRule {
    return { name: 'max', args: [maxLength] }
  },
  min ([minLength]: ArgComparison): ParsedRule {
    return { name: 'min', args: [minLength] }
  },
  notEquals ([comparisonValue]: [any]): ParsedRule {
    return { name: 'notEquals', args: [comparisonValue] }
  },
  notIn (args: any[]): ParsedRule {
    return { name: 'notIn', args }
  },
  number (): ParsedRule {
    return { name: 'number', args: [] }
  },
  object (): ParsedRule {
    return { name: 'object', args: [] }
  },
  range ([min, max]: ArgMinMax): ParsedRule {
    return { name: 'range', args: [min, max] }
  },
  regex (): ParsedRule {
    return { name: 'regex', args: [] }
  },
  required (): ParsedRule {
    return { name: 'required', args: [] }
  },
  requiredIf ([targetField]: [string]): ParsedRule {
    return { name: 'requiredIf', args: [targetField] }
  },
  requiredWhen ([targetField, expectedValue]: [string, any]): ParsedRule {
    return { name: 'requiredWhen', args: [targetField, expectedValue] }
  },
  requiredWithAll (args: string[]): ParsedRule {
    return { name: 'requiredWithAll', args }
  },
  requiredWithAny (args: string[]): ParsedRule {
    return { name: 'requiredWithAny', args }
  },
  requiredWithoutAll (args: string[]): ParsedRule {
    return { name: 'requiredWithoutAll', args }
  },
  requiredWithoutAny (args: string[]): ParsedRule {
    return { name: 'requiredWithoutAny', args }
  },
  same ([targetField]: [string]): ParsedRule {
    return { name: 'same', args: [targetField] }
  },
  startsWith ([substring]: [string]): ParsedRule {
    return { name: 'startsWith', args: [substring] }
  },
  string (): ParsedRule {
    return { name: 'string', args: [] }
  },
  subset (args: any[]): ParsedRule {
    return { name: 'subset', args }
  },
  under ([maxValue]: ArgComparison): ParsedRule {
    return { name: 'under', args: [maxValue] }
  },
  url (): ParsedRule {
    return { name: 'url', args: [] }
  },
  after ([comparisonDate]: ArgComparisonDate): ParsedRule {
    return { name: 'after', args: [comparisonDate] }
  },
  before ([comparisonDate]: ArgComparisonDate): ParsedRule {
    return { name: 'before', args: [comparisonDate] }
  },
  date (): ParsedRule {
    return { name: 'date', args: [] }
  },
  dateFormat (args: string[]): ParsedRule {
    return { name: 'dateFormat', args }
  },
  beforeOffsetOf ([diffUnit, key]: ArgOffset): ParsedRule {
    return { name: 'beforeOffsetOf', args: [diffUnit, key] }
  },
  afterOffsetOf ([diffUnit, key]: ArgOffset): ParsedRule {
    return { name: 'afterOffsetOf', args: [diffUnit, key] }
  },
}
