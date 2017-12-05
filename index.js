'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import validator from './src/core/validator'
import * as validations from './src/validations'
import * as raw from './src/raw'

const validatorInstance = validator(validations)

export default {
  validate: validatorInstance.validate,
  validateAll: validatorInstance.validateAll,
  is: raw
}
