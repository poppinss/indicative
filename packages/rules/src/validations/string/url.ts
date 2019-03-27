/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { skippable } from 'indicative-utils'
import { Validation } from 'indicative-compiler'

import { url } from '../../raw/url'
import { RulesConfig } from '../../Contracts'

/**
 * Ensures the value is a valid URL format.
 *
 * [source, js]
 * ----
 * const rules = {
 *   gh_profile: 'url'
 * }
 *
 * // or
 * const rules = {
 *   gh_profile: [
 *     rule('url')
 *   ]
 * }
 * ----
 */
const validation: Validation = {
  async: false,

  validate: (data, field, _args, _type, _root, config: RulesConfig) => {
    const fieldValue = data[field]
    return skippable(fieldValue, field, config) || url(fieldValue)
  },
}

export { validation as default }
