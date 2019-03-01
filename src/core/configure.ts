/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { config } from './config'
import { IndicativeConfig } from '../contracts'

/**
 * Configure indicative to use user defined config values. You
 * can access original defaults using `configure.DEFAULTS`
 */
export function configure (options: Partial<IndicativeConfig>) {
  Object.assign(config, options)
}

/**
 * Copy config to `DEFAULTS` for reference.
 */
configure.DEFAULTS = Object.assign({}, config)
