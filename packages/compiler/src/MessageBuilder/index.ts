/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { pope } from 'pope'
import { ParsedMessages, MessagesRulesMap, ParsedRule, MessageNode } from 'indicative-parser'
import { MessageBucketContract, MessageBuilderContract } from '../contracts'
import { defaultMessage } from '../utils'

/**
 * Message bucket stores a list of messages for a given field
 * inside the schema tree. You must pull an instance of this
 * class from [[MessagesBuilder.getBucket]] method.
*/
class MessageBucket implements MessageBucketContract {
  constructor (
    private _fullPath: string,
    private _named: MessagesRulesMap,
    private _generic: MessagesRulesMap,
  ) {}

  /**
   * Builds message for a given rule from the list of messages inside a
   * bucket.
   */
  public get (rule: ParsedRule): MessageNode {
    const message = this._named[rule.name] || this._generic[rule.name] || defaultMessage

    if (typeof (message) === 'function') {
      return message
    }

    return pope(message, { validation: rule.name, args: rule.args, field: this._fullPath })
  }
}

/**
 * Message builder builds the messages for a given field and `dotPath` as
 * compiler scans through the [[ParsedSchema]] tree.
 */
export class MessageBuilder implements MessageBuilderContract {
  constructor (private _messages: ParsedMessages, private _baseDotPath?: string[]) {}

  /**
   * Builds the complete `dotPath` by optionally concatenating
   * the `baseDotPath` (if any).
   */
  private _buildPath (dotPath: string[]): string[] {
    if (!this._baseDotPath) {
      return dotPath
    }

    return this._baseDotPath.concat(dotPath)
  }

  /**
   * Returns bucket for a given field and `dotPath`. Dot Path is actually
   * the complete path to a node inside the schema tree that compiler
   * retains when building schema
   */
  public getBucket (field: string, dotPath: string[]): MessageBucket {
    const fullPath = this._buildPath(dotPath).concat(field).join('.')
    const named = this._messages.named[fullPath] || {}
    return new MessageBucket(fullPath, named, this._messages.generic)
  }

  /**
   * Returns a child message builder. Used by the array nodes inside the
   * tree, since [[SchemaNodeArray]] resets the `dotPath` for upcoming
   * childs.
   */
  public child (dotPath: string[]): MessageBuilder {
    return new MessageBuilder(this._messages, this._buildPath(dotPath))
  }
}
