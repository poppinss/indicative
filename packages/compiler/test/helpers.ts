/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DataNode, DataRoot, FormatterContract } from '../src/Contracts/ValidationCompiler'

type VanillaError = {
  message: string,
  field: string,
  validation: string,
}

export function validationThatFails (_data: DataNode, _field: string, _args: any[]) {
  return false
}

export async function asyncValidationThatFails (_data: DataNode, _field: string, _args: any[]) {
  return false
}

export class Stack {
  public stack: {
    data: DataNode,
    field: string,
    args: any[],
    type: string,
    root: DataRoot,
  }[] = []

  public fn (data: DataNode, field: string, args: any[], type: string, root: DataRoot) {
    this.stack.push({ data, field, args, type, root })
    return true
  }

  public async asyncFn (data: DataNode, field: string, args: any[], type: string, root: DataRoot) {
    this.stack.push({ data, field, args, type, root })
    return true
  }
}

export function getValidations (list: string[], fn: any) {
  return list.reduce((result, item) => {
    result[item] = { async: false, validate: fn }
    return result
  }, {})
}

export function getAsyncValidations (list: string[], fn: any) {
  return list.reduce((result, item) => {
    result[item] = { async: true, validate: fn }
    return result
  }, {})
}

export class VanillaFormatter implements FormatterContract {
  public errors: VanillaError[] = []

  /**
   * Add a new error to the errors stack
   */
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

  /**
   * Returns an array of errors or null, when there are no errors
   */
  public toJSON (): VanillaError[] | null {
    return this.errors.length ? this.errors : null
  }
}
