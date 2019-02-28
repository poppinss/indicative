import * as slug from '@slynova/slug'

/**
 * Converts a string to URL friendly slug. If value is not a string, it will be
 * returned as it is.
 *
 * Also it will handle ascii charmaps and converts to their utf-8 counter parts.
 *
 * [source, text]
 * ----
 * I am > than you
 * ----
 *
 * will become
 *
 * [source, text]
 * ----
 * i-am-greater-than-you
 * ----
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   slug: 'slug'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   slug: [
 *     rule('slug')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (typeof (value) !== 'string') {
    return value
  }
  return slug(value)
}
