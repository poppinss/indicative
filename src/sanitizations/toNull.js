import existy from '../raw/existy'

/**
 * Converts emptry strings and `undefineds` to `null`. It is super
 * helpful to keep data normalized at database level.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   bio: 'to_null'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   bio: [
 *     rule('to_null')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (!existy(value)) {
    return null
  }
  return value
}
