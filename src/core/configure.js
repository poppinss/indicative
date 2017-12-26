'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import config from './config'

/**
 * Override configuration values
 *
 * @method setConfig
 *
 * @param {Object}
 */
function setConfig (options) {
  Object.keys(options).forEach((option) => {
    if (config[option] !== undefined) {
      config[option] = options[option]
    }
  })
}

/**
 * Copy config to `DEFAULTS` for reference.
 */
setConfig.DEFAULTS = Object.keys(config).reduce((result, key) => {
  result[key] = config[key]
  return result
}, {})

export default setConfig
