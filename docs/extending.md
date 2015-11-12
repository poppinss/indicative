# Extending

Indicative ships with a handful of validation rules, which may or may not be enough for your application that's why it is so easy to extend schema or raw validator to register your custom rules.

- [Extending Schema Validator](#extending-schema-validator)
  - [validation method](#validation-method)
  - [extend](#extend)
- [Extending Raw Validator](#extending-raw-validator)

## Extending Schema Validator
Extending Schema validator will register your custom rule to validations store and should follow defined convention, where all rules are registered as `camelCase` and consumed as `snake_case`.

For example, indicative's `alpha_numeric` rule is defined as `alphaNumeric` inside validation store.

### validation method
Validation method supports `async` execution and should return a promise. `Async` execution makes is easier for you to write database driven rules. For example `unique` rule to check if the username already exists or not.

```javascript,line-numbers
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

### extend
Once you have defined your validation method, you can add it to validations store by calling `extend` method.

```javascript,line-numbers
indicative.extend('unique', unique, 'Field should be unique')
```

Extend method takes 3 required parameters to register validation to validations store.

1. **name** - remember to define name as `camelCase` which is consumed as `snake_case`.
2. **method** - validation method to be executed.
3. **message** - the error message to print on validation failure.

Once your custom validation rule has been stored, you can consume it inside your schema.

```javascript,line-numbers
const schema = {
  username: 'required|unique'
}
```

## Extending Raw Validator
Extending raw validator is fairly simple as raw validations are quick validations. An example of raw validation can be 

```javascript,line-numbers
indicative.is.email('your@youremail.com')
```

And to extend raw validator you need to define a validation method that can accept `n` number of arguments based on validation expectations. A good example of raw validation can be a password strength checker

```javascript,line-numbers
const strongPassword = function (password) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  return strongRegex.test(password)
}
```

Above we created a function to check whether a password is strong enough or not, and now we can register it is a raw validator.

```javascript,line-numbers
indicative.is.extend('strongPassword', strongPassword)
```

`is.extend` accepts two parameters where the first one is the method name and second is validation method to execute. Finally, you can use this method as follows.

```javascript,line-numbers
indicative.is.strongPassword('lowerUPP@123')
// returns true
```
