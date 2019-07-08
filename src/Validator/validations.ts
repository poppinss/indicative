/**
 * @module indicative
 */

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationRulesContract } from 'indicative-rules'

/**
 * Collection of validations, that can be used to
 * define validation rules.
 */
export const validations: ValidationRulesContract = {
  above ([minValue]) {
    return { name: 'above', args: [minValue] }
  },
  accepted () {
    return { name: 'accepted', args: [] }
  },
  alpha () {
    return { name: 'alpha', args: [] }
  },
  alphaNumeric () {
    return { name: 'alphaNumeric', args: [] }
  },
  array () {
    return { name: 'array', args: [] }
  },
  boolean () {
    return { name: 'boolean', args: [] }
  },
  confirmed () {
    return { name: 'confirmed', args: [] }
  },
  different (args) {
    return { name: 'different', args: args || [] }
  },
  email () {
    return { name: 'email', args: [] }
  },
  endsWith (args) {
    return { name: 'endsWith', args: args || [] }
  },
  equals (args) {
    return { name: 'equals', args: args || [] }
  },
  in (args: any[]) {
    return { name: 'in', args: args || [] }
  },
  includes (args) {
    return { name: 'includes', args: args || [] }
  },
  integer () {
    return { name: 'integer', args: [] }
  },
  float () {
    return { name: 'float', args: [] }
  },
  ip () {
    return { name: 'ip', args: [] }
  },
  ipv4 () {
    return { name: 'ipv4', args: [] }
  },
  ipv6 () {
    return { name: 'ipv6', args: [] }
  },
  json () {
    return { name: 'json', args: [] }
  },
  max (args) {
    return { name: 'max', args: args || [] }
  },
  min (args) {
    return { name: 'min', args: args || [] }
  },
  notEquals (args) {
    return { name: 'notEquals', args: args || [] }
  },
  notIn (args) {
    return { name: 'notIn', args: args || [] }
  },
  number () {
    return { name: 'number', args: [] }
  },
  object () {
    return { name: 'object', args: [] }
  },
  range (args) {
    return { name: 'range', args: args || [] }
  },
  regex (args) {
    return { name: 'regex', args: args || [] }
  },
  required () {
    return { name: 'required', args: [] }
  },
  requiredIf (args) {
    return { name: 'requiredIf', args: args || [] }
  },
  requiredWhen (args) {
    return { name: 'requiredWhen', args: args || [] }
  },
  requiredWithAll (args) {
    return { name: 'requiredWithAll', args: args || [] }
  },
  requiredWithAny (args) {
    return { name: 'requiredWithAny', args: args || [] }
  },
  requiredWithoutAll (args) {
    return { name: 'requiredWithoutAll', args: args || [] }
  },
  requiredWithoutAny (args) {
    return { name: 'requiredWithoutAny', args: args || [] }
  },
  same (args) {
    return { name: 'same', args: args || [] }
  },
  startsWith (args) {
    return { name: 'startsWith', args: args || [] }
  },
  string () {
    return { name: 'string', args: [] }
  },
  subset (args) {
    return { name: 'subset', args: args || [] }
  },
  under (args) {
    return { name: 'under', args: args || [] }
  },
  url () {
    return { name: 'url', args: [] }
  },
  after (args) {
    return { name: 'after', args: args || [] }
  },
  before (args) {
    return { name: 'before', args: args || [] }
  },
  date () {
    return { name: 'date', args: [] }
  },
  dateFormat (args) {
    return { name: 'dateFormat', args: args || [] }
  },
  beforeOffsetOf (args) {
    return { name: 'beforeOffsetOf', args: args || [] }
  },
  afterOffsetOf (args) {
    return { name: 'afterOffsetOf', args: args || [] }
  },
}
