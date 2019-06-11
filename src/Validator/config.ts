/**
 * @module indicative
 */

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { VanillaFormatter } from 'indicative-formatters'
import { ValidatorConfig } from '../Contracts'

/**
 * Base validator config
 */
export const config: ValidatorConfig = {
  existyStrict: false,
  formatter: VanillaFormatter,
  removeAdditional: false,
}
