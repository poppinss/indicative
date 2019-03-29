/**
 * indicative-rules
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import * as validations from '../src/validations'
const root = { original: {} }

const dataPackets = {
  endsWith: {
    missing: {
      name: undefined,
    },
    empty: {
      name: null,
    },
    field: 'name',
    args: ['rk'],
  },
  startsWith: {
    missing: {
      name: undefined,
    },
    empty: {
      name: null,
    },
    field: 'name',
    args: ['vi'],
  },
  equals: {
    missing: {
      name: undefined,
    },
    empty: {
      name: null,
    },
    field: 'name',
    args: ['virk'],
  },
  notIn: {
    missing: {
      type: undefined,
    },
    empty: {
      type: null,
    },
    field: 'type',
    args: [null],
  },
  regex: {
    missing: {
      age: undefined,
    },
    empty: {
      age: null,
    },
    field: 'age',
    args: [new RegExp('^0-9')],
  },
  '*': {
    missing: {
      age: undefined,
    },
    empty: {
      age: null,
    },
    field: 'age',
    args: [],
  },
}

const skip = [
  'different',
  'same',
  'required',
  'requiredIf',
  'requiredWhen',
  'requiredWithAny',
  'requiredWithAll',
  'requiredWithoutAny',
  'requiredWithoutAll',
]

test.group('Validations | skippable', () => {
  Object.keys(validations).filter((rule) => !skip.includes(rule)).forEach((rule) => {
    test(`only skip undefined values when existyStrict is true | ${rule}`, (assert) => {
      const validation = validations[rule]
      const config = { existyStrict: true }

      const { missing, empty, field, args } = dataPackets[rule] || dataPackets['*']
      assert.isTrue(validation.validate(missing, field, args, 'literal', root, config))
      assert.isFalse(validation.validate(empty, field, args, 'literal', root, config))
    })
  })
})
