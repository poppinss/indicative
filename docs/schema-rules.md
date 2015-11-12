# Schema Rules

Schema rules can/may be different from raw validation rules. In order make use of schema validation rules you need to pass a schema object to indicative `validate` or `validateAll` method.

```javascript,line-numbers
const indicative = require('indicative')

const schema = {
  username : 'required|alpha_numeric|min:6|max:20',
  email    : 'required|email'
}

indicative
.validate(schema, data)
.then (function () {
  // validation passed
})
.catch(function () {
  // validation failed
})
```

- [above](#above)
- [accepted](#accepted)
- [after](#after)
- [after_offset_of](#after_offset_of)
- [alpha](#alpha)
- [alpha_numeric](#alpha-numeric)
- [array](#array)
- [before](#before)
- [before_offset_of](#before_offset_of)
- [boolean](#boolean)
- [date](#date)
- [date_format](#date-format)
- [different](#different)
- [email](#email)
- [ends_with](#ends-with)
- [equals](#equals)
- [in](#in)
- [includes](#includes)
- [integer](#integer)
- [ip](#ip)
- [ipv4](#ipv4)
- [ipv6](#ipv6)
- [json](#json)
- [max](#max)
- [min](#min)
- [not_equals](#not-equals)
- [not_in](#not-in)
- [object](#object)
- [range](#range)
- [regex](#regex)
- [required](#required)
- [required_if](#required-if)
- [required_when](#required-when)
- [required_with_all](#required-with-all)
- [required_with_any](#required-with-any)
- [required_without_all](#required-without-all)
- [required_without_any](#required-without-any)
- [same](#same)
- [starts_with](#starts-with)
- [under](#under)
- [url](#url)

### above
the field under validation should be above defined value

```javascript,line-numbers
{
  age : 'above:18'
}
```

### accepted 
field should have been accepted with truthy value for ex - **yes,1,true**

```javascript,line-numbers
{
  toc: 'accepted'
}
```

### after 
the value of field should be after define date

```javascript,line-numbers
{
  newyear_party: 'after:2015-12-24'
}
```

### after_offset_of
the value of field should be after defined offset from today's date

```javascript,line-numbers
{
  expires: 'after_offset_of:12,months'
}
```

### alpha 
the value of field should contain letters only

```javascript,line-numbers
{
  name: 'alpha'
}
```

### alpha_numeric 
the value of field should contain letters and numbers only

```javascript,line-numbers
{
  username: 'alpha_numeric'
}
```

### array 
the value should be an array

```javascript,line-numbers
{
  permissions : 'array'
}
```

### before 
the value of field should be before define date

```javascript,line-numbers
{
  file_tax: 'before:2015-03-31'
}
```

### before_offset_of
the value of field should be before defined offset from today's date

```javascript,line-numbers
{
  enrollment: 'before_offset_of:1,year'
}
```

### boolean 
value of field should contain a boolean value, **true,false,0,1,'0','1'** will yield true

```javascript,line-numbers
{
  is_admin: 'boolean'
}
```

### date 
the value of field should be a valid date, **MM/DD/YYYY, MM-DD-YYYY, YYYY-MM-DD, YYYY/MM/DD** formats
are allowed

```javascript,line-numbers
{
  published_on: 'date'
}
```

### date_format 
the value of field should be a valid date according to given format

```javascript,line-numbers
{
  published_on: 'date_format:YYYY-MM-DD'
}
```

### different
the value of 2 fields should be different

```javascript,line-numbers
{
  alternate_email: 'different:email'
}
```

### email
should be a valid email address

```javascript,line-numbers
{
  email_address: 'email'
}
```

### ends_with
the string should end with given letters

```javascript,line-numbers
{
  domain: 'ends_with:.com'
}
```

### equals
the value of field under validation should equal the defined value

```javascript,line-numbers
{
  age: 'equals:26'
}
```

### in
the value of field should fall within defined values

```javascript,line-numbers
{
  gender: 'in:Male,Female,Other'
}
```

### includes
the value of field should include define letters

```javascript,line-numbers
{
  sub_domain: 'includes:adonisjs'
}
```

### integer
the value of field under validation should be an integer

```javascript,line-numbers
{
  age: 'integer'
}
```

### ip
the value of field under validation should be a valid ip address

```javascript,line-numbers
{
  ip_address: 'ip'
}
```

### ipv4
the value of field under validation should be a valid ipv4 address

```javascript,line-numbers
{
  ip_address: 'ipv4'
}
```

### ipv6
the value of field under validation should be a valid ipv6 address

```javascript,line-numbers
{
  ip_address: 'ipv6'
}
```

### json
value of field is safe for `JSON.parse`

```javascript,line-numbers
{
  meta_data: 'json'
}
```

### max
The length of a given field should not be more than defined length. Numbers and strings are evaluated same way.

```javascript,line-numbers
{
  password: 'max:20'
}
```

### min
The length of a given field should not be less than defined length. Numbers and strings are evaluated same way

```javascript,line-numbers
{
  password: 'min:6'
}
```

### not_equals
the value of field under should be different from defined value

```javascript,line-numbers
{
  username: 'not_equals:admin'
}
```

### not_in
the value of field under should not be one of the defined values.

```javascript,line-numbers
{
  username: 'not_in:admin,super,root'
}
```

### object
the value of field should be a valid javascript object

```javascript,line-numbers
{
  profile: 'object'
}
```

### range <span class="italic">(alias:between)</span>
value of field should be inside defined range, shorthand for min and max

```javascript,line-numbers
{
  password: 'range:6,20'
}
```

### regex
the value of field under validation should satisfy regex pattern.

<div class="note">
  <p>
    <strong> Note : </strong> Always define rules as array when making use of regex rule
  </p>
</div>

```javascript,line-numbers
{
  username: ['regex:^[a-zA-z]+$']
}
```

### required
the field should exist and contain some value

```javascript,line-numbers
{
  username: 'required'
}
```

### required_if
the field is required when defined field exists

```javascript,line-numbers
{
  password_confirmation: 'required_if:password'
}
```

### required_when
the field is required when value of defined field is same as defined value

```javascript,line-numbers
{
  state: 'required_when:country,US'
}
```

### required_with_all
the field is required when all other fields are present

```javascript,line-numbers
{
  social_geek: 'required_with_all:twitter,facebook,tumblr'
}
```

### required_with_any
the field is required when any of the other fields are present

```javascript,line-numbers
{
  social_login: 'required_with_any:facebook_token,twitter_token'
}
```

### required_without_all
the field is required when all of the other fields does not exist

```javascript,line-numbers
{
  rent: 'required_without_all:onwer,buyer'
}
```

### required_without_any
the field is required when any of the other fields does not exist

```javascript,line-numbers
{
  sell: 'required_without_any:onwer,buyer'
}
```

### same
the value of field should be same as the value of define field

```javascript,line-numbers
{
  password_confirm: 'same:password'
}
```

### starts_with
the value of field should start with defined letters

```javascript,line-numbers
{
  accepted: 'starts_with:y'
}
```

### under
the value of field should be under defined value

```javascript,line-numbers
{
  age: 'under:60'
}
```

### URL
the value of field should be a valid url

```javascript,line-numbers
{
  blog: 'url'
}
```
