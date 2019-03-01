import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isUrl from '../raw/url'
import { ValidationFn } from '../contracts'

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
const url: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isUrl(fieldValue)) {
      return message
    }
  })
}

export { url as default }
