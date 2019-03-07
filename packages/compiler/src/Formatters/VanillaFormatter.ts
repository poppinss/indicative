/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { IndicativeFormatter, VanillaErrorNode } from '../Contracts'

/**
 * Indicative allows error formatters, which can format the
 * validation or core exceptions into a proper error object.
 *
 * You can add more formatters, but VanillaFormatter is
 * used when no custom formatter is used.
 *
 * @example
 * ```
 * const formatter = new VanillaFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('error message', 'username', 'required')
 *
 * // get errors
 * formatter.toJSON()
 * ```
 */
export class VanillaFormatter implements IndicativeFormatter {
  public errors: VanillaErrorNode[] = []

  public addError (error: Error | string, field: string, validation: string, _args: any[]): void {
    let message: string = ''

    if (error instanceof Error) {
      validation = 'ENGINE_EXCEPTION'
      message = error.message
    } else {
      message = error
    }

    this.errors.push({ message, field, validation })
  }

  public toJSON (): VanillaErrorNode[] | null {
    return this.errors.length ? this.errors : null
  }
}
