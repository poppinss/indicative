/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedRule } from 'indicative-parser'

/**
 * Schema leaf consumer consumes the leaf on a tree and is tree to
 * return any value out of it.
 */
export type NodeConsumer<NodeArgs extends any[], Output extends any> = ((
  rule: ParsedRule,
  field: string,
  type: 'object' | 'literal' | 'array',
  executorArgs: NodeArgs,
  dotPath: string[],
  resetPaths: string[],
) => Output)

/**
 * Wraps an array of childs for a given array node. The job of the child wrapper
 * is to execute child output
 */
export type ArrayChildWrapper<Output extends any> = ((
  child: Output[],
  dotPath: string[],
  index: string,
) => Output)
