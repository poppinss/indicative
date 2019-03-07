/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DataNode, DataRoot } from '../src/Contracts'

export function validationThatFails (_data, _field, _args) {
  return false
}

export async function asyncValidationThatFails (_data, _field, _args) {
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

  public fn (data, field, args, type, root) {
    this.stack.push({ data, field, args, type, root })
    return true
  }

  public async asyncFn (data, field, args, type, root) {
    this.stack.push({ data, field, args, type, root })
    return true
  }
}

export function getValidations (list: string[], fn: any) {
  return list.reduce((result, item) => {
    result[item] = { async: false, fn }
    return result
  }, {})
}

export function getAsyncValidations (list: string[], fn: any) {
  return list.reduce((result, item) => {
    result[item] = { async: true, fn }
    return result
  }, {})
}
