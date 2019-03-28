/**
 * indicative-formatters
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FormatterContract } from 'indicative-compiler'

export type VanillaErrorNode = {
  error: string,
  validation: string,
  field: string,
}

export class VanillaFormatter implements FormatterContract {
  public errors: VanillaErrorNode[] = []

  public addError (error: Error | string, field: string, rule: string) {
    let message = ''

    if (error instanceof Error) {
      message = error.message
      rule = 'ENGINE_EXCEPTION'
    } else {
      message = error
    }

    this.errors.push({ error: message, validation: rule, field: field })
  }

  public toJSON (): VanillaErrorNode[] | null {
    return this.errors.length ? this.errors : null
  }
}
