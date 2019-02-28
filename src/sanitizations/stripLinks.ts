const linksRegex = /<a\b[^>]*>(.*?)<\/a>/g

/**
 * Strips `a` tags from a given string.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   message: 'strip_links'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   message: [
 *     rule('strip_links')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (typeof (value) !== 'string') {
    return value
  }
  return value.replace(linksRegex, (_match, group) => group.trim())
}
