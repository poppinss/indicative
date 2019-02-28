/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { IndicativeConfig } from '../contracts'
import { VanillaFormatter } from '../formatters/Vanilla'

/**
 * Configure indicative validator with following
 * validation options
*/
export const config: IndicativeConfig = {
  /**
   * When existy strict is set to `true`, then `undefined` values will be
   * considered as non-existy.
   *
   * Otherwise `empty strings`, `null` and `undefined` all are
   * considered non-existy.
   */
  EXISTY_STRICT: false,

  /**
   * The formatter to be used for formatting errors.
   */
  FORMATTER: VanillaFormatter,
}
