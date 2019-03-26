/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { astWalker } from '../src/AstWalker'
import { NodeConsumer, ArrayChildWrapper } from '../src/Contracts/AstWalker'
import { rulesParser } from 'indicative-parser'

const consumer: NodeConsumer<any[], any> = (
  rule,
  field,
  type,
  args,
  dotPath,
  resetPaths,
) => {
  let messageField = field
  const initialPaths = resetPaths.concat(dotPath)

  if (initialPaths.length) {
    messageField = field === 'arr:literal' ? initialPaths.join('.') : `${initialPaths.join('.')}.${field}`
  }

  return { rule, field, dotPath, type, message: args[0][messageField][rule.name] }
}

const arrayWrapper: ArrayChildWrapper<any> = (
  child,
  dotPath,
  index,
) => {
  return child.map((node) => {
    return {
      child: node,
      dotPath,
      index,
    }
  })
}

test.group('Ast walker', () => {
  test('return array of top level functions for each literal leaf', (assert) => {
    const parsedRules = rulesParser({
      username: 'required',
      email: 'required',
    })

    const args = [
      {
        username: { required: 'username is required' },
        email: { required: 'email is required' },
      },
    ]
    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'username',
        dotPath: [],
        type: 'literal',
        message: 'username is required',
      },
      {
        rule: { name: 'required', args: [] },
        field: 'email',
        dotPath: [],
        type: 'literal',
        message: 'email is required',
      },
    ])
  })

  test('return array of top level functions for object leaf', (assert) => {
    const parsedRules = rulesParser({
      'profile': 'required',
      'profile.username': 'required',
    })

    const args = [
      {
        profile: { required: 'profile is required' },
        'profile.username': { required: 'profile username is required' },
      },
    ]
    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profile',
        dotPath: [],
        type: 'object',
        message: 'profile is required',
      },
      {
        rule: { name: 'required', args: [] },
        field: 'username',
        dotPath: ['profile'],
        type: 'literal',
        message: 'profile username is required',
      },
    ])
  })

  test('return array of top level functions for nested object leaf', (assert) => {
    const parsedRules = rulesParser({
      'profile': 'required',
      'profile.social': 'required',
      'profile.social.type': 'enum:facebook,twitter',
    })

    const args = [
      {
        profile: { required: 'profile is required' },
        'profile.social': { required: 'social profile is required' },
        'profile.social.type': { enum: 'one of facebook or twitter' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)
    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profile',
        dotPath: [],
        type: 'object',
        message: 'profile is required',
      },
      {
        rule: { name: 'required', args: [] },
        field: 'social',
        dotPath: ['profile'],
        type: 'object',
        message: 'social profile is required',
      },
      {
        rule: { name: 'enum', args: ['facebook', 'twitter'] },
        field: 'type',
        dotPath: ['profile', 'social'],
        type: 'literal',
        message: 'one of facebook or twitter',
      },
    ])
  })

  test('return array of top level functions for indexed array leaf', (assert) => {
    const parsedRules = rulesParser({
      'profiles': 'required',
      'profiles.0.username': 'required',
    })

    const args = [
      {
        profiles: { required: 'profiles are required' },
        'profiles.0.username': { required: 'primary profile must have username' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profiles',
        dotPath: [],
        type: 'array',
        message: 'profiles are required',
      },
      [
        {
          child: {
            rule: { name: 'required', args: [] },
            field: 'username',
            dotPath: [],
            type: 'literal',
            message: 'primary profile must have username',
          },
          dotPath: ['profiles'],
          index: '0',
        },
      ],
    ])
  })

  test('return array of top level functions for wildcard array leaf', (assert) => {
    const parsedRules = rulesParser({
      'profiles': 'required',
      'profiles.*.username': 'required',
    })

    const args = [
      {
        profiles: { required: 'profiles are required' },
        'profiles.*.username': { required: 'all profiles must have username' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profiles',
        dotPath: [],
        type: 'array',
        message: 'profiles are required',
      },
      [
        {
          child: {
            rule: { name: 'required', args: [] },
            field: 'username',
            dotPath: [],
            type: 'literal',
            message: 'all profiles must have username',
          },
          dotPath: ['profiles'],
          index: '*',
        },
      ],
    ])
  })

  test('return array of top level functions for nested object inside array', (assert) => {
    const parsedRules = rulesParser({
      'profiles': 'required',
      'profiles.*.social': 'required',
      'profiles.*.social.username': 'required',
    })

    const args = [
      {
        profiles: { required: 'profiles are required' },
        'profiles.*.social': { required: 'all profiles must have social account' },
        'profiles.*.social.username': { required: 'username for social profile is required' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profiles',
        dotPath: [],
        type: 'array',
        message: 'profiles are required',
      },
      [
        {
          child: {
            rule: { name: 'required', args: [] },
            field: 'social',
            dotPath: [],
            type: 'object',
            message: 'all profiles must have social account',
          },
          dotPath: ['profiles'],
          index: '*',
        },
        {
          child: {
            rule: { name: 'required', args: [] },
            field: 'username',
            dotPath: ['social'],
            type: 'literal',
            message: 'username for social profile is required',
          },
          dotPath: ['profiles'],
          index: '*',
        },
      ],
    ])
  })

  test('return array of top level functions for deeply nested array', (assert) => {
    const parsedRules = rulesParser({
      'profiles': 'required',
      'profiles.*.social': 'required',
      'profiles.*.social.*.username': 'required',
    })

    const args = [
      {
        profiles: { required: 'profiles are required' },
        'profiles.*.social': { required: 'all profiles must have social account' },
        'profiles.*.social.*.username': { required: 'username for social profile is required' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)

    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'profiles',
        dotPath: [],
        type: 'array',
        message: 'profiles are required',
      },
      [
        {
          child: {
            rule: { name: 'required', args: [] },
            field: 'social',
            dotPath: [],
            type: 'array',
            message: 'all profiles must have social account',
          },
          dotPath: ['profiles'],
          index: '*',
        },
        {
          child: [
            {
              child: {
                rule: { name: 'required', args: [] },
                field: 'username',
                dotPath: [],
                type: 'literal',
                message: 'username for social profile is required',
              },
              dotPath: ['social'],
              index: '*',
            },
          ],
          dotPath: ['profiles'],
          index: '*',
        },
      ],
    ])
  })

  test('return array of top level functions first literal inside array', (assert) => {
    const parsedRules = rulesParser({
      'codes': 'required',
      'codes.*': 'number',
    })

    const args = [
      {
        codes: { required: 'codes are required' },
        'codes.*': { number: 'each item inside code must be number' },
      },
    ]

    const output = astWalker(parsedRules, args, consumer, arrayWrapper).map((node) => node)
    assert.deepEqual(output, [
      {
        rule: { name: 'required', args: [] },
        field: 'codes',
        dotPath: [],
        type: 'array',
        message: 'codes are required',
      },
      [
        {
          child: {
            rule: { name: 'number', args: [] },
            field: 'arr:literal',
            dotPath: [],
            type: 'literal',
            message: 'each item inside code must be number',
          },
          dotPath: ['codes'],
          index: '*',
        },
      ],
    ])
  })
})
