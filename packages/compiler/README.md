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

## Compiler
The compiler package takes the `parser` input and creates a highly performant function that can be cached to run validations with runtime data. Below are some [benchmarks](benchmarks/index.js) ran on the output function of compiler with dummy rules.

- **Macbook Pro (2.2 GHz Intel Core i7)**: `2,281,616 ops/sec`

## Usage
Install the package from npm

```sh
npm i indicative-compiler

# yarn user
yarn add indicative-compiler
```

and then use it as follows

```js
const { validationCompiler } = require('indicative-compiler')

const rulesSchema = {
  username: 'required'
}

const validations = {
  required: {
    async: false,
    validate () {
      return true
    }
  }
}

const messagesSchema = {
  'username.required': 'Username is required'
}

const validate = validationCompiler(rulesSchema, validations, messagesSchema)
```

The above code will output a **pre-compiled function**, that can be used to run validations using `runtime` data.

```js
const { vanilla } = require('indicative-formatters')
const config = {}

/**
 * Bail true means stop on first validation error
 */
const bail = true

validate(data, vanilla, config, bail)
  .then(console.log)
  .catch(console.error)
```
