/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { IndicativeFormatter, JsonapiErrorNode } from '../contracts'

export class JsonApiFormatter implements IndicativeFormatter {
  public errors: JsonapiErrorNode[] = []

  public addError (error: string | Error, field: string, validation: string, _args: any[]): void {
    let message: string = ''

    if (error instanceof Error) {
      validation = 'ENGINE_EXCEPTION'
      message = error.message
    } else {
      message = error
    }

    this.errors.push({
      title: validation,
      detail: message,
      source: {
        pointer: field,
      },
    })
  }

  public toJSON (): { errors: JsonapiErrorNode[] } | null {
    return this.errors.length ? { errors: this.errors } : null
  }
}
