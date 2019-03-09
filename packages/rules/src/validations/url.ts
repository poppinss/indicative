import { skippable } from '../utils'
import { url } from '../raw/url'
import { ValidationNode } from 'indicative-compiler'

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
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || url(fieldValue)
  },
}

export { validation as default }
