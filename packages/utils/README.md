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

## Utils
Handy utility functions used by other Indicative packages. If you are extending Indicative to add your own rules, then you may find some handy utilities in the package

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

#### `cast(value, toType, errorMessage?): output`
Casts value to a given data type
