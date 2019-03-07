/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { pope } from 'pope'
import { MessageBucketContract, MessageBuilderContract } from '../contracts'
import { ParsedMessages, MessagesRulesMap, ParsedRule, MessageNode } from 'indicative-parser'

class MessageBucket implements MessageBucketContract {
  constructor (
    private _fullPath: string,
    private _named: MessagesRulesMap,
    private _generic: MessagesRulesMap,
  ) {
  }

  public get (rule: ParsedRule): MessageNode {
    const message =
      this._named[rule.name]
      || this._generic[rule.name]
      || '{{ validation }} validation failed on {{ field }}'

    if (typeof (message) === 'function') {
      return message
    }

    return pope(message, { validation: rule.name, args: rule.args, field: this._fullPath })
  }
}

export class MessageBuilder implements MessageBuilderContract {
  constructor (private _messages: ParsedMessages, private _baseDotPath?: string[]) {}

  private _buildPath (dotPath: string[]): string[] {
    if (!this._baseDotPath) {
      return dotPath
    }

    return this._baseDotPath.concat(dotPath)
  }

  public getBucket (field: string, dotPath: string[]): MessageBucket {
    const fullPath = this._buildPath(dotPath).concat(field).join('.')
    const named = this._messages.named[fullPath] || {}
    return new MessageBucket(fullPath, named, this._messages.rules)
  }

  public child (dotPath: string[]): MessageBuilder {
    return new MessageBuilder(this._messages, this._buildPath(dotPath))
  }
}
