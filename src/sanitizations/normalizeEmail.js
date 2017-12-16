import normalizeEmail from 'validator/lib/normalizeEmail'

/**
 * Normalizes the email address by removing unwanted characters from it. For example
 * `foo+bar@gmai.com` will become `foobar@gmail.com` and also it will normalize
 * the characters case too.
 *
 * If value is not a string, it will be returned as it is, otherwise it is passed to
 * link:https://github.com/chriso/validator.js[validator.js@normalizeEmail] method.
 *
 * [source, js]
 * ----
 * const sanitizationRules = {
 *   email: [
 *     rule('normalize_email')
 *   ]
 * }
 *
 * // pass options
 * const sanitizationRules = {
 *   email: [
 *     rule('normalize_email', {
 *       all_lowercase: true,
 *       icloud_remove_subaddress: true
 *     })
 *   ]
 * }
 * ----
 */
export default (email, args) => {
  if (typeof (email) === 'string') {
    const options = args && args.length ? args[0] : {}
    return normalizeEmail(email, options)
  }
  return email
}
