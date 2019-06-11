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

import { SanitizationRulesContract } from 'indicative-rules'

/**
 * Collection of sanitizations, that can be used to
 * define sanitization rules.
 */
export const sanitizations: SanitizationRulesContract = {
  escape () {
    return { name: 'escape', args: [] }
  },
  lowerCase (args?) {
    return { name: 'lowerCase', args: args || [] }
  },
  normalizeEmail (args) {
    return { name: 'normalizeEmail', args: args || [] }
  },
  plural () {
    return { name: 'plural', args: [] }
  },
  singular () {
    return { name: 'singular', args: [] }
  },
  slug () {
    return { name: 'slug', args: [] }
  },
  stripLinks () {
    return { name: 'stripLinks', args: [] }
  },
  stripTags (args?) {
    return { name: 'stripTags', args: args || [] }
  },
  trim () {
    return { name: 'trim', args: [] }
  },
  upperCase (args?) {
    return { name: 'upperCase', args: args || [] }
  },
}
