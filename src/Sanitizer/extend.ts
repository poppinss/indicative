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

import { sanitizations } from 'indicative-rules'
import { SanitizationDefination } from 'indicative-compiler'
import { sanitizations as sanitizationsList } from './sanitizations'

/**
 * Extend validator by adding new rules
 */
export function extend (name: string, definition: SanitizationDefination) {
  sanitizations[name] = definition

  /**
   * Also adding it to the sanitizations list used to define
   * schema rules
   */
  sanitizationsList[name] = function rule (args) {
    return { name, args: args || [] }
  }
}
