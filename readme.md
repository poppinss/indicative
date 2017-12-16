# Indicative

> Bit of docs. The final readme and docs will be different.

## Customized build for validator
Indicative offers customized builds, which are helpful when writing apps for the browser, since every byte matters.

```js
import validator from 'indicative/builds/validator'

import {
  email,
  required,
  exists,
  min,
  max
} from 'indicative/builds/validations'

const appValidator = validator({
  email,
  required,
  exists,
  min,
  max
})
```

Now `appValidator` is ready to validate data, based upon the imported rules.

```js
appValidator
  .validate(data, rules, messages)
  .then(() => {
  })
  .catch((errors) => {
    // array of errors
  })
```

## Customized build for sanitizor

Just like validations, indicative also let you sanitize data by piping it through multiple sanitisation's.

```js
import sanitizor from 'indicative/builds/sanitizor'

import {
 normalizeEmail,
 stripTags
} from 'indicative/builds/sanitizations'

const appSanitizor = sanitizor({ normalizeEmail, stripTags })

const rules = {
  email: 'normalizeEmail',
  bio: 'stripTags'
}

const data = {
}

const sanitizedData = appSanitizor.sanitize(data, rules)
```

