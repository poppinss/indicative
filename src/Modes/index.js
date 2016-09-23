'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const availableModes = ['normal', 'strict']
let currentMode = 'normal'

const Modes = exports = module.exports = {}

Modes.set = function (mode) {
  if (availableModes.indexOf(mode) <= -1) {
    console.log(`indicative: ${mode} is not a valid mode, switching back to normal mode`)
    return
  }
  currentMode = mode
}

Modes.get = function () {
  return currentMode
}
