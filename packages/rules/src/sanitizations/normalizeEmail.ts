/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { default as normalizer } from 'validator/lib/normalizeEmail'

type EmailOptions = {
  all_lowercase: boolean,
  gmail_lowercase: boolean,
  gmail_remove_dots: boolean,
  gmail_remove_subaddress: boolean,
  gmail_convert_googlemaildotcom: boolean,
  outlookdotcom_lowercase: boolean,
  outlookdotcom_remove_subaddress: boolean,
  yahoo_lowercase: boolean,
  yahoo_remove_subaddress: boolean,
  icloud_lowercase: boolean,
  icloud_remove_subaddress: boolean,
}

/**
 * Normalizes the email address by removing unwanted characters from it. For example
 * `foo+bar@gmail.com` will become `foobar@gmail.com` and also it will normalize
 * the characters case too.
 *
 * If value is not a string, it will be returned as it is, otherwise it is passed to
 * link:https://github.com/chriso/validator.js[validator.js] normalizeEmail method.
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
export const normalizeEmail = (email: string, [options]: [Partial<EmailOptions>] = [{}]): string => {
  if (typeof (email) === 'string') {
    return normalizer(email, options)
  }

  return email
}
