import * as pluralize from 'pluralize'

/**
 * Converts a value to it's singular version. If value is not a string
 * then it will return as it is.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   modelName: 'singular'
 * }
 *
 * // or
 * const sanitizationRules = {
 *   modelName: [
 *     rule('singular')
 *   ]
 * }
 * ----
 */
export default (value) => {
  if (typeof (value) !== 'string') {
    return value
  }
  return pluralize.singular(value)
}
