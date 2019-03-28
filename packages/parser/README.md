<p align="center">
  <a href="#">
    <img src="https://res.cloudinary.com/adonisjs/image/upload/v1553759989/indicative-banner_lh27zs.png" width="600px;" />
  </a>
</p>

<p align="center">
  <a href="https://indicative.adonisjs.com/quick-start">Usage</a> •
  <a href="https://indicative.adonisjs.com/why">Why?</a> •
  <a href="https://indicative.adonisjs.com/features">Features</a> •
  <a href="https://indicative.adonisjs.com/examples">Examples</a> •
  <a href="https://indicative.adonisjs.com/docs">Documentation</a>
</p>

<br/>

<p align="center">
  <a href="https://travis-ci.org/poppinss/indicative">
    <img src="https://img.shields.io/travis/poppinss/indicative.svg?style=flat-square" alt="">
  </a>

  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/uses-typescript-blue.svg?style=flat-square" alt="">
  </a>
</p>

## Parser
Indicative parser parses the user defined **schema object** to a **tree of nodes**. Using this, the end user can always define their rules as a flat object and it's the job of the parser to expand it to a nested object.

## Usage
Install the package from npm

```sh
npm i indicative-parser

# yarn user
yarn add indicative-parser
```

and then usage it as follows

```js
const { rulesParser, messagesParser } = require('indicative-parser')

console.log(rulesParser({
  'client_id': 'required',
  'settings.key': 'required',
  'users.*.email': 'required|email'
}))

// messages parser
console.log(messagesParser({
  'users.*.email.required': 'Email is required',
  'users.*.email.email': 'Invalid email address'
}))
```

The parser tree emits three types of nodes, which are explained below:

## Literal type
The `literal` type is the reference to the final property or leaf in the tree. A literal node doesn't have any children.

```js
{
  username: 'required'
}
```

Output

```js
{
  username: {
    type: 'literal',
    rules: [{
      name: 'required',
      args: [],
    }],
  },
}
```

| Property | Description | 
|----------|-------------|
| `type` | The type of the node |
| `rules` | An array of parsed rules |

## Object type
The `object` type defines an object, which will always have one or more children.

Following is an example of `object` node.

```js
{
  'user.profile': 'required'
}
```

Output

```js
{
  user: {
    type: 'object',
    rules: [],
    children: {
      profile: {
        rules: [
          {
            name: 'required',
            args: [],
          },
        ],
        type: 'literal',
      },
    },
  },
}
```

In the above code example, you can see that the properties before the dot `.` notation is marked as `type = object` and last property `username` is considered a literal. There is no limit to the depth of the object.

| Property | Description | 
|----------|-------------|
| `type` | The type of the node |
| `rules` | An array of parsed rules on the object node itself |
| `children` | An object of nested named children |

## Array type
The `array` type detects the array expressions as shown below.

```js
{
  'users.*.username': 'required'
}
```

Output

```js
{
  users: {
    type: 'array',
    rules: [],
    each: {
      '*': {
        rules: [],
        children: {
          username: {
            type: 'literal',
            rules: [
              {
                name: 'required',
                args: [],
              },
            ],
          },
        },
      },
    },
  },
}
```

A node is considered as an array when it has `*` or `numeric` expressions. The `each` property contains a sub object for each defined `index` with nested children.

| Property | Description | 
|----------|-------------|
| `type` | The type of the node |
| `rules` | An array of parsed rules on the object node itself |
| `each` | Set of children for each defined index. |


## What's next?
The output of `parser` is used by [compiler](https://github.com/poppinss/indicative/tree/master/packages/compiler.git) to create a top level function, which executes the validations on runtime data object.
