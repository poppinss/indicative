# Basics

Indicative is an expressive schema/raw validator for NodeJs and offers clean syntax over snake of curly braces.To validate an object of data, you need to define a schema where each field can have multiple rules.

- [Setup](#setup)
  - [validate](#validate)
  - [validateAll](#validateAll)
- [Rules](#rules)
- [Schema](#schema)
- [Custom messages](#custom-messages)
- [Templating](#templating)

## Setup

You start by requiring indicative and then make use of multiple methods to validate a data object with schema definition.

```javascript,line-numbers
const indicative = require('indicative')
```

### validate (rules, data [,messages])
Validate method will run the validation cycle, which gets terminated on the first error.

```javascript,line-numbers

const schema = {
  username: 'required'
}

const data = {
  username: null
}

indicative
.validate(data, schema)
.then(function () {
  // validation passed  
})
.catch(function (errors) {
  // validation failed
})
```

### validateAll (rules, data [,messages])
Validate all will validate all fields even after errors are thrown and return an array of error messages.

```javascript,line-numbers
indicative.validateAll(data, schema)
```

## Rules

Indicative helps you in defining rules as a string, which makes it more readable and remove unnecessary curly braces from your schema definition.

A rule is a combination of certain logical expression that are parsed by a parser before starting validation.

1. **|** - A pipe symbol ( | ) is used to define multiple rules 
2. **:** - A colon ( : ) is used to define values next to your rules
3. **,** - And a comma ( , ) is used to define multiple values next to your rules.

### basic rule
A basic rule may look like this, where we define multiple rules by separating them with a pipe symbol.

```javascript,line-numbers
{
  email_address: 'required|email'
}
```

### rule with values
A complex rule can have values defined next to rule definition, which later will be used to run validations.

```javascript,line-numbers
{
  age: 'required|above:18'
}
```

Define age is separated by the colon on `above` rule. Also, some rules can accept multiple values next to a given rule.

```javascript,line-numbers
{
  age: 'required|range:18,40'
}
```

## Schema

Schema definition is an object containing multiple rules for multiple fields and is used by validation methods.

```javascript,line-numbers
const schema = {
  username  : 'required|alpha_numeric',
  email     : 'required|email',
  password  : 'required|min:6|max:30'
}
```

Schema object is a set of different rules defined for different fields and in order to validate an object of data you need to pass `schema` and `data` together to `validate` method.

```javascript,line-numbers
const schema = {
  username  : 'required|alpha_numeric',
  email     : 'required|email',
  password  : 'required|min:6|max:30'
}

const data = {
  username  : 'doe22',
  email     : 'doe@example.org',
  password  : 'doe123456'
}

indicative
.validate(data, schema)
.then(function () {
  // validation passed  
})
.catch(function (errors) {
  // validation failed
})
```

### nested schema

In order to validate nested data you need to make use of `dot-notation` to target nested fields inside data object.

```javascript,line-numbers
const schema = {
  'profile.username'  : 'required',
  'profile.password'  : 'required|min:6|max:30'
}

const data = {
  profile:{
    username  : 'doe22',
    password  : 'doe123456'
  }
}
``` 

Here `dot-notation` will help you in removing the use of unnecessary curly braces and can target nested data to any given number of levels.

## Custom messages

Indicative self-constructs error messages when validation for a given rule fails, which may not be helpful when trying to keep error messages descriptive and personalized.

### global messages
Global messages are defined on rules, and the same message will be used whenever a rule will fail.

```javascript,line-numbers
const messages = {
  required: 'This field is required to complete the registration process.'
}

indicative
.validate(data, schema, messages)
.then(function () {
  // validation passed  
})
.catch(function (errors) {
  // validation failed
})
```

Whenever a `required` rule fails, it will return your custom message instead of a self-constructed message.

### field specific messages.
field specific messages are even more personalized as they are defined for a given rule and field.

```javascript,line-numbers
const messages = {
  'username.required' : 'Username is required to continue',
  'email.required'    : 'Email is required for further communication'
}


indicative
.validate(data, schema, messages)
.then(function () {
  // validation passed  
})
.catch(function (errors) {
  // validation failed
})
```

Also, you can make use of `dot-notation` while defining messages.

```javascript,line-numbers
const messages = {
  'profile.username.required': 'Username is required to setup profile'
}
```

### getters
instead of defining a string as a message, you can also define a function to return message

```javascript,line-numbers
const messages = {
  'username.required': function (field, validation, args) {
    return `${field} is required`
  }
}
```


## Templating
All custom messages support templating, which means you can define special placeholders that will be replaced with actual values while constructing messages.

### field
`field` is the name of the field under validation

```javascript,line-numbers
const messages = {
  required: '{{field}} is required to complete registeration process'
}
```

### validation
validation rule

```javascript,line-numbers
const messages = {
  email: '{{validation}} validation failed on {{field}}.'
}

const data = {
  email: 'abc'
}
```

### argument
arguments are values defined on rules inside schema, and they can be accessed using their array index.

```javascript
const messages = {
  min: '{{field}} must be over {{argument.0}} years'
}

const schema = {
  age: 'min:18'
}

const data = {
  age: 10
}

```

Above message will yield `age must be over 18 years`.
