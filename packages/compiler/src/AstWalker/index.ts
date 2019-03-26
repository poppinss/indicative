/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedSchema, SchemaNodeLiteral, SchemaNodeObject, SchemaNodeArray } from 'indicative-parser'
import { NodeConsumer, ArrayChildWrapper } from '../Contracts/AstWalker'

/**
 * Process the literal node inside the tree.
 */
function literalNodeConsumer<Output extends any, NodeArgs extends any[]> (
  node: SchemaNodeLiteral,
  field: string,
  nodeArgs: NodeArgs,
  nodeConsumer: NodeConsumer<NodeArgs, Output>,
  dotPath: string[],
  resetPaths: string[],
): Output[] {
  return node.rules.map((rule) => nodeConsumer(rule, field, 'literal', nodeArgs, dotPath, resetPaths))
}

/**
 * Process the object node inside the tree.
 */
function objectNodeConsumer<Output extends any, NodeArgs extends any[]> (
  node: SchemaNodeObject,
  field: string,
  nodeArgs: NodeArgs,
  nodeConsumer: NodeConsumer<NodeArgs, Output>,
  arrayChildWrapper: any,
  dotPath: string[],
  resetPaths: string[],
): Output[] {
  let executors: Output[] = []

  /**
   * Consume all rules on the object node itself
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => {
      return nodeConsumer(rule, field, 'object', nodeArgs, dotPath, resetPaths)
    })
  }

  dotPath = dotPath.concat(field)

  /**
   * Recursively process child
   */
  const childExecutors = astWalker<Output, NodeArgs>(
    node.children,
    nodeArgs,
    nodeConsumer,
    arrayChildWrapper,
    dotPath,
    resetPaths,
  )

  executors = executors.concat(childExecutors)
  return executors
}

/**
 * Process the array node inside the tree.
 */
function arrayNodeConsumer<Output extends any, NodeArgs extends any[]> (
  node: SchemaNodeArray,
  field: string,
  nodeArgs: NodeArgs,
  nodeConsumer: NodeConsumer<NodeArgs, Output>,
  arrayChildWrapper: any,
  dotPath: string[],
  resetPaths: string[],
): Output[] {
  let executors: Output[] = []

  /**
   * Consume all rules on the array node itself
   */
  if (node.rules.length) {
    executors = node.rules.map((rule) => nodeConsumer(rule, field, 'array', nodeArgs, dotPath, resetPaths))
  }

  dotPath = dotPath.concat(field)

  const wrappedExecutors = Object.keys(node.each)
    .reduce((result: Output[], index: string) => {
      let rulesExecutor: Output[] = []

      /**
       * Handling literal values inside the array
       */
      if (node.each[index].rules.length) {
        rulesExecutor = astWalker(
          { 'arr:literal': { type: 'literal', rules: node.each[index].rules } },
          nodeArgs,
          nodeConsumer,
          arrayChildWrapper,
          [],
          resetPaths.concat(dotPath).concat(index),
        )
      }

      /**
       * Handling objects inside the array
       */
      const eachExecutors = astWalker(
        node.each[index].children,
        nodeArgs,
        nodeConsumer,
        arrayChildWrapper,
        [],
        resetPaths.concat(dotPath).concat(index),
      )

      result.push(arrayChildWrapper(rulesExecutor.concat(eachExecutors), dotPath, index))
      return result
    }, [])

  executors = executors.concat(wrappedExecutors)
  return executors
}

/**
 * AST walkers recursively loop throughs all the nodes inside the `parsedSchema`
 * tree and executes the `nodeConsumer` defined by the consumer of this
 * module.
 *
 * The `nodeConsumer` can decide how to consume the nodes and the collection of
 * return value from the consumer is returned as an array.
 *
 * 1. `nodeConsumer`: A function that consumes a single node from the parsed tree.
 * 2. `nodeArgs`: Custom array of arguments to be passed to `nodeConsumer`.
 * 3. `arrayChildWrapper`: Array child wrapper is used to wrap the child nodes of a array.
 *
 * The last arguments of this function are optional and used internally with recursion in
 * play.
 */
export function astWalker <Output extends any, NodeArgs extends any[]> (
  tree: ParsedSchema,
  nodeArgs: NodeArgs,
  nodeConsumer: NodeConsumer<NodeArgs, Output>,
  arrayChildWrapper: ArrayChildWrapper<Output>,
  nodePath: string[] = [],
  resetPaths: string[] = [],
): Output[] {
  return Object
    .keys(tree)
    .reduce((result: Output[], field: string) => {
      const node = tree[field]

      if (node.type === 'literal') {
        result = result.concat(
          literalNodeConsumer(node, field, nodeArgs, nodeConsumer, nodePath, resetPaths),
        )
      }

      if (node.type === 'object') {
        result = result.concat(
          objectNodeConsumer(node, field, nodeArgs, nodeConsumer, arrayChildWrapper, nodePath, resetPaths),
        )
      }

      if (node.type === 'array') {
        result = result.concat(
          arrayNodeConsumer(node, field, nodeArgs, nodeConsumer, arrayChildWrapper, nodePath, resetPaths),
        )
      }

      return result
    }, [])
}
