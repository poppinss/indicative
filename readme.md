# Indicative

Indicative is an expressive Javascript validator for humans. Improve your workflow by removing all unnecessary curly braces and nested declarations. Under the hood indicative has following.

 * Schema validator to validate an data object.
 * It has support for nested validations.
 * Custom messages for validations and rules.
 * Raw validator for quick `if` validations
 * Data Sanitization
 * Return promises
 * Es6 generators friendly.

![build](https://img.shields.io/travis/poppinss/indicative.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/poppinss/indicative/master.svg?style=flat-square)](https://coveralls.io/github/poppinss/indicative?branch=master)
[![Version](https://img.shields.io/npm/v/indicative.svg?style=flat-square)](https://www.npmjs.com/package/indicative)
[![Downloads](https://img.shields.io/npm/dt/indicative.svg?style=flat-square)](https://www.npmjs.com/package/indicative)
[![License](https://img.shields.io/npm/l/indicative.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Installation

Installing indicative requires node 4.0 or greater with npm installed.

```javascript
npm i --save indicative
```

## Basics

Indicative is an expressive schema/raw validator for NodeJs and offers clean syntax over snake of curly braces.To validate an object of data, you need to define a schema where each field can have multiple rules.

### Setup

You start by requiring indicative and then make use of multiple methods to validate a data object with schema definition.

```javascript
const indicative = require('indicative')
```

#### validate (data, rules, [messages])
Validate method will run the validation cycle, which gets terminated on the first error.

```javascript

const rules = {
  username: 'required'
}

const data = {
  username: null
}

indicative
.validate(data, rules)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

#### validateAll (data, rules, [messages])
Validate all will validate all fields even after errors are thrown and return an array of error messages.

```javascript
indicative.validateAll(data, rules)
```

### Rules

Indicative helps you in defining rules as a string, which makes it more readable and remove unnecessary curly braces from your schema definition.

A rule is a combination of certain logical expression that are parsed by a parser before starting validation.

1. **|** - A pipe symbol ( | ) is used to define multiple rules
2. **:** - A colon ( : ) is used to define values next to your rules
3. **,** - And a comma ( , ) is used to define multiple values next to your rules.

#### basic rule
A basic rule may look like this, where we define multiple rules by separating them with a pipe symbol.

```javascript
{
  email_address: 'required|email'
}
```

#### rule with values
A complex rule can have values defined next to rule definition, which later will be used to run validations.

```javascript
{
  age: 'required|above:18'
}
```

Define age is separated by the colon on `above` rule. Also, some rules can accept multiple values next to a given rule.

```javascript
{
  age: 'required|range:18,40'
}
```

### Schema

Schema definition is an object containing multiple rules for multiple fields and is used by validation methods.

```javascript
const rules = {
  username  : 'required|alpha_numeric',
  email     : 'required|email',
  password  : 'required|min:6|max:30'
}
```

Schema object is a set of different rules defined for different fields and in order to validate an object of data you need to pass `rules` and `data` together to `validate` method.

```javascript
const rules = {
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
.validate(data, rules)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

#### nested rules

In order to validate nested data you need to make use of `dot-notation` to target nested fields inside data object.

```javascript
const rules = {
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

### Custom messages

Indicative self-constructs error messages when validation for a given rule fails, which may not be helpful when trying to keep error messages descriptive and personalised.

#### global messages
Global messages are defined on rules, and the same message will be used whenever a rule will fail.

```javascript
const messages = {
  required: 'This field is required to complete the registration process.'
}

indicative
.validate(data, rules, messages)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

Whenever a `required` rule fails, it will return your custom message instead of a self-constructed message.

#### field specific messages.
`field` specific messages are even more personalised as they are defined for a given rule and field.

```javascript
const messages = {
  'username.required' : 'Username is required to continue',
  'email.required'    : 'Email is required for further communication'
}


indicative
.validate(data, rules, messages)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

Also, you can make use of `dot-notation` while defining messages.

```javascript
const messages = {
  'profile.username.required': 'Username is required to setup profile'
}
```

#### getters
instead of defining a string as a message, you can also define a function to return message

```javascript
const messages = {
  'username.required': function (field, validation, args) {
    return `${field} is required`
  }
}
```


### Templating
All custom messages support templating, which means you can define special placeholders that will be replaced with actual values while constructing messages.

#### field
`field` is the name of the field under validation

```javascript
const messages = {
  required: '{{field}} is required to complete registeration process'
}
```

#### validation
Name of the validation rule.

```javascript
const messages = {
  email: '{{validation}} validation failed on {{field}}.'
}

const data = {
  email: 'abc'
}
```

#### argument
`arguments` are values defined on rules inside schema, and they can be accessed using their array index.

```javascript
const messages = {
  above: '{{field}} must be over {{argument.0}} years'
}

const rules = {
  age: 'above:18'
}

const data = {
  age: 10
}

```

Above message will yield `age must be over 18 years`.

### Array Expressions

Validating arrays asynchronously is never fun. Indicative makes it so simple to validating one level deep nested arrays using `array expressions`.

```javascript
const rules = {
  'users.*.username': 'required|alpha',
  'users.*.email': 'required|email'
}

const data = {
  users: [
    {
      username: 'validUsername',
      email: 'bar.sneark@gmail.com'
    },
    {
      username: '123Invalid',
      email: 'bar.com'
    }
  ]
}

indicative
.validate(data, rules)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

Also you can validate flat arrays using the same expression syntax.

```javascript
const rules = {
  'emails': 'array|min:2',
  'emails.*': 'email'
}

const data = {
  emails: ['foo@bar.com', 'invalid.com']
}

indicative
.validate(data, rules)
.then(function () {
  // validation passed
})
.catch(function (errors) {
  // validation failed
})
```

## Sanitizor

First rule of developing applications is to keep your datastores clean. Indicative sanitizor will help you in normalizing data by using set of specific rules.

### Using Schema
Like validations you can use a schema object to sanitize our data object.

```javascript
const indicative = require('indicative')

const data = {
  email: 'bar.sneaky+foo@googlemail.com',
  age: '22',
  aboutme: 'i am dev @<a href="http://nowhere.com">nowhere</a>'
}

const sanitizationRules = {
  email: 'normalize_email',
  age: 'to_int',
  aboutme: 'strip_links'
}

const sanitizedData = indicative.sanitize(data, sanitizationRules)
console.log(sanitizedData)

/**
 {
  email: 'barsneaky@gmail.com',
  age: 22,
  aboutme: 'i am dev @nowhere'
 }
 */

```

### Raw Sanitizor
For quick sanitizations you can make use of raw filters

```javascript
const indicative = require('indicative')
indicative.sanitizor.toInt('22') // 22
indicative.sanitizor.slug('hello world') // hello-world
indicative.sanitizor.toDate('22-1-2016') // javascript date object
```

### Filters
Below is the list of filters available to be used for raw and schema sanitizations.

#### blacklist <span class="italic">(values)</span>
removes values inside blacklist from the actual string. Passed values are used inside a regex, so make sure to escape values properly. `\\[\\]` instead of `\`.

```javascript
// raw sanitization
indicative.sanitizor.blacklist('hello world', 'ord')

// with schema
{
  description: 'blacklist:ord'
}
```

#### escape
Escapes html characters with html entities
```javascript
// raw sanitization
indicative.sanitizor.escape('<div> hello world </div>')

// with schema
{
  description: 'escape'
}
```

#### normalizeEmail <span class="italic">(options)</span>
Normalizes email and accepts options to avoid certains transformations.

1. **!lc** - Do not convert email to lowercase, hence domain name will be converted to lowercase. `FOO@GMAIL.COM` will become `FOO@gmail.com`

2. **!rd** - Stop sanitizor from removing dots.
3. **!re** - Do not remove everything after `+` symbol. `bar.sneaky+foo@gmail.com` will become `barsneaky+foo@gmail.com`

```javascript
// raw sanitization
indicative.sanitizor.normalizeEmail('bar.sneaky+foo@gmail.com', ['!rd', '!re', '!lc'])

// with schema
{
  email: 'normalize_email:!rd,!re,!lc'
}
```

#### toBoolean
Converts value to a boolean, `0, false, null, undefined, ''` will return `false` and everything else will return `true`.

```javascript
// raw sanitization
indicative.sanitizor.toBoolean('false')

// with schema
{
  isAdmin: 'to_boolean'
}
```

#### toFloat
Converts value to float and returns `NaN` if unable to convert.

```javascript
// raw sanitization
indicative.sanitizor.toFloat('32.55')

// with schema
{
  marks: 'to_float'
}
```

#### toInt
Converts value to integer and returns `NaN` if unable to convert.

```javascript
// raw sanitization
indicative.sanitizor.toInt('32')

// with schema
{
  age: 'to_int'
}
```

#### toDate
Converts value to date object and returns `null` if unable to convert.

```javascript
// raw sanitization
indicative.sanitizor.toDate('2010-22-10')

// with schema
{
  birthday: 'to_date'
}
```

#### stripLinks
Strips `<a></a>` tags from a given string. If input is not a string, actual value will be returned.

```javascript
// raw sanitization
indicative.sanitizor.stripLinks('<a href="http://adonisjs.com"> Adonisjs </a>')

// with schema
{
  bio: 'strip_links'
}
```

#### stripTags
Strips html tags from a given string. If input is not a string, actual value will be returned.

```javascript
// raw sanitization
indicative.sanitizor.stripTags('<p> Hello </p>')

// with schema
{
  tweet: 'strip_tags'
}
```

#### plural
Converts a given value to plural. Which means `person` will be converted to `people`.

```javascript
// raw sanitization
indicative.sanitizor.plural('child')

// with schema
{
  november14: 'plural'
}
```

#### singular
Converts a given value to singular. Which means `people` will be converted to `person`.

```javascript
// raw sanitization
indicative.sanitizor.plural('children')

// with schema
{
  november14: 'singular'
}
```

#### camelCase
Converts a given to camel-case.

```javascript
// raw sanitization
indicative.sanitizor.camelCase('users-controller')

// with schema
{
  fileName: 'camel_case'
}
```

#### capitalize
`capitalize` a given string.

```javascript
// raw sanitization
indicative.sanitizor.capitalize('doe')

// with schema
{
  fullName: 'capitalize'
}
```

#### decapitalize
`decapitalize` a given string.

```javascript
// raw sanitization
indicative.sanitizor.decapitalize('Bar')

// with schema
{
  username: 'decapitalize'
}
```

#### title
converts a value to title case

```javascript
// raw sanitization
indicative.sanitizor.title('hello-world')

// with schema
{
  title: 'title'
}
```

#### slug
Converts a value to url friendly slug.

```javascript
// raw sanitization
indicative.sanitizor.slug('learn node in 30 minutes')

// with schema
{
  title: 'slug'
}
```

## Extending

Indicative ships with a handful of validation rules, which may or may not be enough for your application that's why it is so easy to extend schema or raw validator to register your custom rules.

### Extending Schema Validator
Extending Schema validator will register your custom rule to validations store and should follow defined convention, where all rules are registered as `camelCase` and consumed as `snake_case`.

For example, indicative's `alpha_numeric` rule is defined as `alphaNumeric` inside validation store.

#### validation method
Validation method supports `async` execution and should return a promise. `Async` execution makes is easier for you to write database driven rules. For example `unique` rule to check if the username already exists or not.

```javascript
const unique = function (data, field, message, args, get) {

  return new Promise(function (resolve, reject) {

    // get value of field under validation
    const fieldValue = get(data, field)

    // resolve if value does not exists, value existence
    // should be taken care by required rule.
    if(!fieldValue) {
      return resolve('validation skipped')
    }

    // checking for username inside database
    User
    .where('username', fieldValue)
    .then(function (result) {
      if(result){
        reject(message)
      }else{
        resolve('username does not exists')
      }
    })
    .catch(resolve)

  })

}
```

Above we defined a method to check for a unique username inside the database, validation method can keep any logic to validate data but you should know about method parameters to make valid decisions.

1. **data** - It is the actual data object passed to `validate` method.
2. **field** - Field is a string value of field under validation.
3. **message** - Error message to return.
4. **args** - An array of values your rule is expecting, it may be empty depending upon your rule expectations. For example `min:4` will have args array as `[4]`.
5. **get** - it is a special function to get value for a given key from the data object, it is recommended to make use of this function as getting nested values from an object can be a tedious task and `get` method takes care of it.

#### extend
Once you have defined your validation method, you can add it to validations store by calling `extend` method.

```javascript
indicative.extend('unique', unique, 'Field should be unique')
```

Extend method takes 3 required parameters to register validation to validations store.

1. **name** - remember to define name as `camelCase` which is consumed as `snake_case`.
2. **method** - validation method to be executed.
3. **message** - the error message to print on validation failure.

Once your custom validation rule has been stored, you can consume it inside your schema.

```javascript
const rules = {
  username: 'required|unique'
}
```

### Extending Raw Validator
Extending raw validator is fairly simple as raw validations are quick validations. An example of raw validation can be

```javascript
indicative.is.email('your@youremail.com')
```

And to extend raw validator you need to define a validation method that can accept `n` number of arguments based on validation expectations. A good example of raw validation can be a password strength checker

```javascript
const strongPassword = function (password) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  return strongRegex.test(password)
}
```

Above we created a function to check whether a password is strong enough or not, and now we can register it is a raw validator.

```javascript
indicative.is.extend('strongPassword', strongPassword)
```

`is.extend` accepts two parameters where the first one is the method name and second is validation method to execute. Finally, you can use this method as follows.

```javascript
indicative.is.strongPassword('lowerUPP@123')
// returns true
```

### Extending Sanitizor
You can also extend sanitizor to add more filters to it. All extended methods will get the value to sanitize, with an array of options.

```javascript
const uppercase = function (value, options: Array) {
  return value.toUpperCase()
}
```

Above we created a simple method to return `Uppercase` version of a string. Now we will added to the list of sanitizor filters, so that we can use it later.

```javascript
indicative.sanitizor.extend('uppercase', uppercase)
```

Now finally you can use it.

```javascript
// raw sanitizor
indicative.sanitizor.uppercase('hello world')

// with schema
{
  userStatus: 'uppercase'
}
```

## Raw Validations

Below is the list of methods supported by the raw validator, also you can [extend raw validator](#indicative-extending-extending-raw-validator) to add your rules.

### Types

Types based validations will check for a certain type

#### array <span class="italic">(value)</span>

```javascript
indicative.is.array({age:22})
=> false

indicative.is.array('hello world')
=> false

indicative.is.array([20,22])
=> true

indicative.is.array([])
=> true
```

#### boolean <span class="italic">(value)</span>

```javascript
indicative.is.boolean('true')
=> false

indicative.is.boolean('hello')
=> false

indicative.is.boolean(0)
=> true

indicative.is.boolean(1)
=> true

indicative.is.boolean(true)
=> true

indicative.is.boolean(false)
=> true
```

#### date <span class="italic">(value [, strict])</span>
strict `true` will only return true when a date object is passed.

```javascript
indicative.is.date('2011-10-20')
=> true

indicative.is.date('2011-10-20', true)
=> false

indicative.is.date(new Date('2011-10-20'))
=> true

indicative.is.date(new Date('2011-10-20'), true)
=> true
```

#### function <span class="italic">(value)</span>

```javascript
indicative.is.function(function () {})
=> true

indicative.is.function('function () {}')
=> false
```

#### null <span class="italic">(value)</span>

```javascript
indicative.is.null(null)
=> true

indicative.is.null('null')
=> false
```

#### number <span class="italic">(value)</span>

```javascript
indicative.is.number(22)
=> true

indicative.is.number('22')
=> false
```

#### object <span class="italic">(value)</span>

```javascript
indicative.is.object({name:'doe'})
=> true

indicative.is.object(['doe'])
=> false

indicative.is.object('doe')
=> false

indicative.is.object({})
=> true
```

#### json <span class="italic">(value)</span>

```javascript
indicative.is.json(JSON.stringify({name:'doe'}))
=> true

indicative.is.json(JSON.stringify([10,20]))
=> true

indicative.is.json({name:'doe'})
=> false
```

#### string <span class="italic">(value)</span>

```javascript
indicative.is.string(JSON.stringify({name:'doe'}))
=> true

indicative.is.string('hello world')
=> true

indicative.is.string(22)
=> false
```

#### sameType <span class="italic">(value, comparisonValue)</span>

```javascript
indicative.is.sameType(22,10)
=> true

indicative.is.sameType('hello', 'world')
=> true

indicative.is.sameType(22, '10')
=> false
```

### Presence

#### existy <span class="italic">(value)</span>

```javascript
indicative.is.existy('')
=> false

indicative.is.existy(null)
=> false

indicative.is.existy(undefined)
=> false

indicative.is.existy('hello')
=> true

indicative.is.existy(22)
=> true
```

#### truthy <span class="italic">(value)</span>

```javascript
indicative.is.truthy(false)
=> false

indicative.is.truthy(0)
=> false

indicative.is.truthy(true)
=> true

indicative.is.truthy('hello')
=> true
```

#### falsy <span class="italic">(value)</span>

```javascript
indicative.is.falsy(false)
=> true

indicative.is.falsy(0)
=> true

indicative.is.falsy(true)
=> false

indicative.is.falsy('hello')
=> false
```

#### empty <span class="italic">(value)</span>

```javascript
indicative.is.empty(null)
=> true

indicative.is.empty(undefined)
=> true

indicative.is.empty({})
=> true

indicative.is.empty([])
=> true

indicative.is.empty('')
=> true

indicative.is.empty('hello')
=> false

indicative.is.empty(0)
=> false
```

### Regex

#### url <span class="italic">(value)</span>

```javascript
indicative.is.url('http://adonisjs.com')
=> true

indicative.is.url('https://adonisjs.com')
=> true

indicative.is.url('adonisjs.com')
=> false

indicative.is.url('adonisjs')
=> false
```

#### email <span class="italic">(value)</span>

```javascript
indicative.is.email('email@example.org')
=> true

indicative.is.url('email.org')
=> false
```

#### phone <span class="italic">(value)</span>

```javascript
indicative.is.phone('1235554567')
=> true

indicative.is.phone('444-555-1234')
=> true

indicative.is.phone('246.555.8888')
=> true

indicative.is.phone('19929')
=> false
```

#### creditCard <span class="italic">(value)</span>

supports **Visa,MasterCard,American Express,Diners Club,Discover,JCB**

```javascript
indicative.is.creditCard('4444-4444-4444-4444')
=> true

indicative.is.creditCard('4444444444444444')
=> true

indicative.is.creditCard('3685-1600-4490-1023')
=> false
```

#### alpha <span class="italic">(value)</span>

```javascript
indicative.is.alpha('virk')
=> true

indicative.is.alpha('VIrk')
=> true

indicative.is.alpha('virk123')
=> false
```

#### alphaNumeric <span class="italic">(value)</span>

```javascript
indicative.is.alphaNumeric('virk')
=> true

indicative.is.alphaNumeric('virk123')
=> true

indicative.is.alphaNumeric('virk@123')
=> false
```

#### ip <span class="italic">(value)</span>

```javascript
indicative.is.ip('127.0.0.1')
=> true

indicative.is.ip('192.168.0.1')
=> true

indicative.is.ip('1:2:3:4:5:6:7:8')
=> true

indicative.is.ip('localhost')
=> false
```

#### ipv4 <span class="italic">(value)</span>

```javascript
indicative.is.ipv4('127.0.0.1')
=> true

indicative.is.ipv4('192.168.0.1')
=> true

indicative.is.ipv4('1:2:3:4:5:6:7:8')
=> false
```

#### ipv6 <span class="italic">(value)</span>

```javascript
indicative.is.ipv6('985.12.3.4')
=> true

indicative.is.ipv6('1:2:3:4:5:6:7:8')
=> true

indicative.is.ipv6('1.2.3')
=> false
```

#### regex <span class="italic">(pattern, value)</span>
run your own custom regex

```javascript
indicative.is.regex(/[a-z]+/,'virk')
=> true

indicative.is.regex(/[a-z]+/,'virk123')
=> false
```

### Arithmetic

#### same <span class="italic">(value, comparisonValue)</span>

```javascript
indicative.is.same(10,5+5)
=> true

indicative.is.same('hello','hello')
=> true

indicative.is.same('10',10)
=> false
```

#### even <span class="italic">(value)</span>

```javascript
indicative.is.even(10)
=> true

indicative.is.even(5)
=> false
```

#### odd <span class="italic">(value)</span>

```javascript
indicative.is.odd(10)
=> false

indicative.is.odd(5)
=> true
```

#### positive <span class="italic">(value)</span>

```javascript
indicative.is.positive(10)
=> true

indicative.is.positive(-10)
=> false
```

#### negative <span class="italic">(value)</span>

```javascript
indicative.is.negative(10)
=> false

indicative.is.negative(-10)
=> true
```

#### above <span class="italic">(value, comparisonValue)</span>

```javascript
indicative.is.above(10, 20)
=> false

indicative.is.above(30,20)
=> true
```

#### under <span class="italic">(value, comparisonValue)</span>

```javascript
indicative.is.under(30, 20)
=> false

indicative.is.under(10,20)
=> true
```

#### between <span class="italic">(value, min, max)</span>

```javascript
indicative.is.between(20,10,30)
=> true

indicative.is.between(5,10,30)
=> false
```

### Array

#### inArray <span class="italic">(value, comparsionArray)</span>

```javascript
indicative.is.inArray(10,[10,20,40])
=> true

indicative.is.inArray(5,[10,20,40])
=> false
```

#### sorted <span class="italic">(value)</span>

```javascript
indicative.is.sorted([10,20,40,50])
=> true

indicative.is.sorted([10,15,5,20])
=> false
```

#### intersectAny <span class="italic">(value, comparisonArray)</span>

```javascript
indicative.is.intersectAny([10,20],[30,10,40])
=> true

indicative.is.intersectAny([10,20],[30,50,40])
=> false
```

#### intersectAll <span class="italic">(value, intersectAll)</span>

```javascript
indicative.is.intersectAll([10,20],[20,10,50,40])
=> true

indicative.is.intersectAll([10,20],[10,50,40])
=> false
```

### Dates

#### today <span class="italic">(value)</span>

```javascript
indicative.is.today(new Date())
=> true

// if today date is 2015-11-30
indicative.is.today("2015-11-30")
=> true

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
indicative.is.today(yesterday)
=> false
```

#### yesterday <span class="italic">(value)</span>

```javascript
indicative.is.yesterday(new Date())
=> false

// if yesterday date was 2015-11-29
indicative.is.yesterday("2015-11-29")
=> true

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
indicative.is.yesterday(yesterday)
=> true
```

#### tomorrow <span class="italic">(value)</span>

```javascript
indicative.is.tomorrow(new Date())
=> false

// if tomorrow date will be 2015-12-01
indicative.is.tomorrow("2015-12-01")
=> true

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.tomorrow(tomorrow)
=> true
```

#### past <span class="italic">(value)</span>

```javascript
indicative.is.past("2001-01-10")
=> true

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.past(tomorrow)
=> false
```

#### future <span class="italic">(value)</span>

```javascript
indicative.is.future("2001-01-10")
=> false

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.future(tomorrow)
=> true
```

#### after <span class="italic">(value, afterDate)</span>

```javascript
indicative.is.after("2015-10-01", "2015-10-03")
=> false

indicative.is.after("2015-10-01", "2015-09-10")
=> true
```

#### before <span class="italic">(value, beforeDate)</span>

```javascript
indicative.is.before("2015-10-01", "2015-10-03")
=> true

indicative.is.before("2015-10-01", "2015-09-10")
=> false
```

#### dateFormat <span class="italic">(value, formats)</span>

```javascript
indicative.is.dateFormat("2015-10-01", ['YYYY-MM-DD'])
=> true

indicative.is.dateFormat("2015/10/01", ['YYYY-MM-DD'])
=> false

indicative.is.dateFormat("2015/10/01", ['YYYY-MM-DD', 'YYYY/MM/DD'])
=> true
```

#### inDateRange <span class="italic">(value, minDate, maxDate)</span>

```javascript
indicative.is.inDateRange("2015-10-01", "2015-09-01", "2015-12-01")
=> true

indicative.is.inDateRange("2015-10-01", "2015-11-01", "2015-12-01")
=> false
```

## Schema Rules

Schema rules can/may be different from raw validation rules. In order make use of schema validation rules you need to pass a schema object to indicative `validate` or `validateAll` method.

```javascript
const indicative = require('indicative')

const rules = {
  username : 'required|alpha_numeric|min:6|max:20',
  email    : 'required|email'
}

indicative
.validate(data, rules)
.then (function () {
  // validation passed
})
.catch(function () {
  // validation failed
})
```
<ul class="__columnized">

[above](#above)
[accepted](#accepted)
[after](#after)
[after_offset_of](#after_offset_of)
[alpha](#alpha)
[alpha_numeric](#alpha-numeric)
[array](#array)
[before](#before)
[before_offset_of](#before_offset_of)
[boolean](#boolean)
[date](#date)
[date_format](#date-format)
[different](#different)
[email](#email)
[ends_with](#ends-with)
[equals](#equals)
[in](#in)
[includes](#includes)
[integer](#integer)
[ip](#ip)
[ipv4](#ipv4)
[ipv6](#ipv6)
[json](#json)
[max](#max)
[min](#min)
[not_equals](#not-equals)
[not_in](#not-in)
[object](#object)
[range](#range)
[regex](#regex)
[required](#required)
[required_if](#required-if)
[required_when](#required-when)
[required_with_all](#required-with-all)
[required_with_any](#required-with-any)
[required_without_all](#required-without-all)
[required_without_any](#required-without-any)
[same](#same)
[starts_with](#starts-with)
[string](#string)
[under](#under)
[url](#url)

</ul>

#### above
the field under validation should be above defined value

```javascript
{
  age : 'above:18'
}
```

#### accepted
field should have been accepted with truthy value for ex - **yes,1,true**

```javascript
{
  toc: 'accepted'
}
```

#### after
the value of field should be after define date

```javascript
{
  newyear_party: 'after:2015-12-24'
}
```

#### after_offset_of
the value of field should be after defined offset from today's date

```javascript
{
  expires: 'after_offset_of:12,months'
}
```

#### alpha
the value of field should contain letters only

```javascript
{
  name: 'alpha'
}
```

#### alpha_numeric
the value of field should contain letters and numbers only

```javascript
{
  username: 'alpha_numeric'
}
```

#### array
the value should be an array

```javascript
{
  permissions : 'array'
}
```

#### before
the value of field should be before define date

```javascript
{
  file_tax: 'before:2015-03-31'
}
```

#### before_offset_of
the value of field should be before defined offset from today's date

```javascript
{
  enrollment: 'before_offset_of:1,year'
}
```

#### boolean
value of field should contain a boolean value, **true,false,0,1,'0','1'** will yield true

```javascript
{
  is_admin: 'boolean'
}
```

#### date
the value of field should be a valid date, **MM/DD/YYYY, MM-DD-YYYY, YYYY-MM-DD, YYYY/MM/DD** formats
are allowed

```javascript
{
  published_on: 'date'
}
```

#### date_format
the value of field should be a valid date according to given format

```javascript
{
  published_on: 'date_format:YYYY-MM-DD'
}
```

#### different
the value of 2 fields should be different

```javascript
{
  alternate_email: 'different:email'
}
```

#### email
should be a valid email address

```javascript
{
  email_address: 'email'
}
```

#### ends_with
the string should end with given letters

```javascript
{
  domain: 'ends_with:.com'
}
```

#### equals
the value of field under validation should equal the defined value

```javascript
{
  age: 'equals:26'
}
```

#### in
the value of field should fall within defined values

```javascript
{
  gender: 'in:Male,Female,Other'
}
```

#### includes
the value of field should include define letters

```javascript
{
  sub_domain: 'includes:adonisjs'
}
```

#### integer
the value of field under validation should be an integer

```javascript
{
  age: 'integer'
}
```

#### ip
the value of field under validation should be a valid ip address

```javascript
{
  ip_address: 'ip'
}
```

#### ipv4
the value of field under validation should be a valid ipv4 address

```javascript
{
  ip_address: 'ipv4'
}
```

#### ipv6
the value of field under validation should be a valid ipv6 address

```javascript
{
  ip_address: 'ipv6'
}
```

#### json
value of field is safe for `JSON.parse`

```javascript
{
  meta_data: 'json'
}
```

#### max
The length of a given field should not be more than defined length. Numbers and strings are evaluated same way.

```javascript
{
  password: 'max:20'
}
```

#### min
The length of a given field should not be less than defined length. Numbers and strings are evaluated same way

```javascript
{
  password: 'min:6'
}
```

#### not_equals
the value of field under should be different from defined value

```javascript
{
  username: 'not_equals:admin'
}
```

#### not_in
the value of field under should not be one of the defined values.

```javascript
{
  username: 'not_in:admin,super,root'
}
```

#### object
the value of field should be a valid javascript object

```javascript
{
  profile: 'object'
}
```

#### range <span class="italic">(alias:between)</span>
value of field should be inside defined range, shorthand for min and max

```javascript
{
  password: 'range:6,20'
}
```

#### regex
the value of field under validation should satisfy regex pattern.

<div class="note">
  <p>
    <strong> Note : </strong> Always define rules as array when making use of regex rule
  </p>
</div>

```javascript
{
  username: ['regex:^[a-zA-z]+$']
}
```

#### required
the field should exist and contain some value

```javascript
{
  username: 'required'
}
```

#### required_if
the field is required when defined field exists

```javascript
{
  password_confirmation: 'required_if:password'
}
```

#### required_when
the field is required when value of defined field is same as defined value

```javascript
{
  state: 'required_when:country,US'
}
```

#### required_with_all
the field is required when all other fields are present

```javascript
{
  social_geek: 'required_with_all:twitter,facebook,tumblr'
}
```

#### required_with_any
the field is required when any of the other fields are present

```javascript
{
  social_login: 'required_with_any:facebook_token,twitter_token'
}
```

#### required_without_all
the field is required when all of the other fields does not exist

```javascript
{
  rent: 'required_without_all:onwer,buyer'
}
```

#### required_without_any
the field is required when any of the other fields does not exist

```javascript
{
  sell: 'required_without_any:onwer,buyer'
}
```

#### same
the value of field should be same as the value of define field

```javascript
{
  password_confirm: 'same:password'
}
```

#### starts_with
the value of field should start with defined letters

```javascript
{
  accepted: 'starts_with:y'
}
```

#### string
the value of field under validation should be a string

```javascript
{
  username: 'string'
}
```

#### under
the value of field should be under defined value

```javascript
{
  age: 'under:60'
}
```

#### url
the value of field should be a valid url

```javascript
{
  blog: 'url'
}
```
