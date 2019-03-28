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

## Utils
Handy utility functions used by other Indicative packages. If you are extending Indicative to add your own rules, then you may find some handy utilities in this package.

## Usage
Install the package from npm

```sh
npm i indicative-utils
```

and then import the functions you need

```js
import { cast, ensureLength, skippable, patchValue } from 'indicative-utils'
```

## API
Following is the usage for individual methods

#### `cast(value: any, toType: string, errorMessage?: string): output`
Casts value to a given data type. Returns `null` when unable to cast value.

```js
cast('10', 'number', 'Optional error message to raise exception')
```

- **value**: The value to cast
- **toType**: One of the available types. `'number' | 'date' | 'string' | 'integer' | 'boolean'`
- **errorMessage (optional)**: Raises an exception when `errorMessage` is defined and unable to cast value.

---

#### `ensureLength (args: any[], errorMessage: string, minLength = 1): void`
Raise an exception when the length of `args` is less than the defined `minLength`.

```js
ensureLength(['foo', 'bar'], 'Array must have minimum of 3 items', 3)
```

- **args**: Array to test length
- **errorMessage**: Message for exception, when array length is less than the desired length.
- **minLength (default = 1)**: Minimum desired length.

---

#### `patchValue (data: any, field: string, fieldValue: any, root: DataRoot)`
This method is used by validation functions that wants to mutate/cast the input value and set it back on the source object. It is recommended to use this method vs doing it manually, since it handles edge cases.

The `DataRoot` value is available inside all validation functions, you must pass it as it is.

```js
patchValue({ age: '10' }, 'age', 10, {})
```

#### `skippable(value: any, fieldName: string, config: { existyStrict: boolean })`
Again, this method is used by validation functions to know if the value of field must be skipped from validation or not.

Indicative by default assumes all fields as optional and one must use `required` rule for required fields. Which means that validation rules like `email`, `date` and so on must skip `undefined` or `null` values based upon the user config. This method does that check for you.

```js
// read field value inside validation function
const fieldValue = data[field]
skippable(fieldValue, field, config)
```
