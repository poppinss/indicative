# Raw Validations

Below is the list of methods supported by the raw validator, also you can [extend raw validator]() to add your rules.

- [Types](#types)
- [Presence](#presence)
- [Regexp](#regexp)
- [Arithmetic](#arithmetic)
- [Array](#array)
- [Dates](#dates)

## Types

Types based validations will check for a certain type 

### array <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.array({age:22})
=> false

indicative.is.array('hello world')
=> false

indicative.is.array([20,22]) 
=> true

indicative.is.array([]) 
=> true
```

### boolean <span class="italic">(value)</span>

```javascript,line-numbers
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

### date <span class="italic">(value [, strict])</span>
strict `true` will only return true when a date object is passed.

```javascript,line-numbers
indicative.is.date('2011-10-20')
=> true

indicative.is.date('2011-10-20', true)
=> false

indicative.is.date(new Date('2011-10-20'))
=> true

indicative.is.date(new Date('2011-10-20'), true)
=> true
```

### function <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.function(function () {})
=> true

indicative.is.function('function () {}')
=> false
```

### null <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.null(null)
=> true

indicative.is.null('null')
=> false
```

### number <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.number(22)
=> true

indicative.is.number('22')
=> false
```

### object <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.object({name:'doe'})
=> true

indicative.is.object(['doe'])
=> false

indicative.is.object('doe')
=> false

indicative.is.object({})
=> true
```

### json <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.json(JSON.stringify({name:'doe'}))
=> true

indicative.is.json(JSON.stringify([10,20]))
=> true

indicative.is.json({name:'doe'})
=> false
```

### string <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.string(JSON.stringify({name:'doe'}))
=> true

indicative.is.string('hello world')
=> true

indicative.is.string(22)
=> false
```

### sameType <span class="italic">(value, comparisonValue)</span>

```javascript,line-numbers
indicative.is.sameType(22,10)
=> true

indicative.is.sameType('hello', 'world')
=> true

indicative.is.sameType(22, '10')
=> false
```

## Presence 

### existy <span class="italic">(value)</span>

```javascript,line-numbers
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

### truthy <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.truthy(false)
=> false

indicative.is.truthy(0)
=> false

indicative.is.truthy(true)
=> true

indicative.is.truthy('hello')
=> true
```

### falsy <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.falsy(false)
=> true

indicative.is.falsy(0)
=> true

indicative.is.falsy(true)
=> false

indicative.is.falsy('hello')
=> false
```

### empty <span class="italic">(value)</span>

```javascript,line-numbers
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

## Regex

### url <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.url('http://adonisjs.com')
=> true

indicative.is.url('https://adonisjs.com')
=> true

indicative.is.url('adonisjs.com')
=> false

indicative.is.url('adonisjs')
=> false
```

### email <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.email('email@example.org')
=> true

indicative.is.url('email.org')
=> false
```

### phone <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.phone('1235554567')
=> true

indicative.is.phone('444-555-1234')
=> true

indicative.is.phone('246.555.8888')
=> true

indicative.is.phone('19929')
=> false
```

### creditCard <span class="italic">(value)</span>

supports **Visa,MasterCard,American Express,Diners Club,Discover,JCB**

```javascript,line-numbers
indicative.is.creditCard('4444-4444-4444-4444')
=> true

indicative.is.creditCard('4444444444444444')
=> true

indicative.is.creditCard('3685-1600-4490-1023')
=> false
```

### alpha <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.alpha('virk')
=> true

indicative.is.alpha('VIrk')
=> true

indicative.is.alpha('virk123')
=> false
```

### alphaNumeric <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.alphaNumeric('virk')
=> true

indicative.is.alphaNumeric('virk123')
=> true

indicative.is.alphaNumeric('virk@123')
=> false
```

### ip <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.ip('127.0.0.1')
=> true

indicative.is.ip('192.168.0.1')
=> true

indicative.is.ip('1:2:3:4:5:6:7:8')
=> true

indicative.is.ip('localhost')
=> false
```

### ipv4 <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.ipv4('127.0.0.1')
=> true

indicative.is.ipv4('192.168.0.1')
=> true

indicative.is.ipv4('1:2:3:4:5:6:7:8')
=> false
```

### ipv6 <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.ipv6('985.12.3.4')
=> true

indicative.is.ipv6('1:2:3:4:5:6:7:8')
=> true

indicative.is.ipv6('1.2.3')
=> false
```

### regex <span class="italic">(pattern, value)</span>
run your own custom regex

```javascript,line-numbers
indicative.is.regex(/[a-z]+/,'virk')
=> true

indicative.is.regex(/[a-z]+/,'virk123')
=> false
```

## Arithmetic

### same <span class="italic">(value, comparisonValue)</span>

```javascript,line-numbers
indicative.is.same(10,5+5)
=> true

indicative.is.same('hello','hello')
=> true

indicative.is.same('10',10)
=> false
```

### even <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.even(10)
=> true

indicative.is.even(5)
=> false
```

### odd <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.odd(10)
=> false

indicative.is.odd(5)
=> true
```

### positive <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.positive(10)
=> true

indicative.is.positive(-10)
=> false
```

### negative <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.negative(10)
=> false

indicative.is.negative(-10)
=> true
```

### above <span class="italic">(value, comparisonValue)</span>

```javascript,line-numbers
indicative.is.above(10, 20)
=> false

indicative.is.above(30,20)
=> true
```

### under <span class="italic">(value, comparisonValue)</span>

```javascript,line-numbers
indicative.is.under(30, 20)
=> false

indicative.is.under(10,20)
=> true
```

### between <span class="italic">(value, min, max)</span>

```javascript,line-numbers
indicative.is.between(20,10,30)
=> true

indicative.is.between(5,10,30)
=> false
```

## Array

### inArray <span class="italic">(value, comparsionArray)</span>

```javascript,line-numbers
indicative.is.inArray(10,[10,20,40])
=> true

indicative.is.inArray(5,[10,20,40])
=> false
```

### sorted <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.sorted([10,20,40,50])
=> true

indicative.is.sorted([10,15,5,20])
=> false
```

### intersectAny <span class="italic">(value, comparisonArray)</span>

```javascript,line-numbers
indicative.is.intersectAny([10,20],[30,10,40])
=> true

indicative.is.intersectAny([10,20],[30,50,40])
=> false
```

### intersectAll <span class="italic">(value, intersectAll)</span>

```javascript,line-numbers
indicative.is.intersectAll([10,20],[20,10,50,40])
=> true

indicative.is.intersectAll([10,20],[10,50,40])
=> false
```

## Dates

### today <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.today(new Date())
=> true

// if today date is 2015-11-30
indicative.is.today("2015-11-30")
=> true

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
indicative.is.today(yesterday)
=> false
```

### yesterday <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.yesterday(new Date())
=> false

// if yesterday date was 2015-11-29
indicative.is.yesterday("2015-11-29")
=> true

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
indicative.is.yesterday(yesterday)
=> true
```

### tomorrow <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.tomorrow(new Date())
=> false

// if tomorrow date will be 2015-12-01
indicative.is.tomorrow("2015-12-01")
=> true

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.tomorrow(tomorrow)
=> true
```

### past <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.past("2001-01-10")
=> true

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.past(tomorrow)
=> false
```

### future <span class="italic">(value)</span>

```javascript,line-numbers
indicative.is.future("2001-01-10")
=> false

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
indicative.is.future(tomorrow)
=> true
```

### after <span class="italic">(value, afterDate)</span>

```javascript,line-numbers
indicative.is.after("2015-10-01", "2015-10-03")
=> false

indicative.is.after("2015-10-01", "2015-09-10")
=> true
```

### before <span class="italic">(value, beforeDate)</span>

```javascript,line-numbers
indicative.is.before("2015-10-01", "2015-10-03")
=> true

indicative.is.before("2015-10-01", "2015-09-10")
=> false
```

### dateFormat <span class="italic">(value, formats)</span>

```javascript,line-numbers
indicative.is.dateFormat("2015-10-01", ['YYYY-MM-DD'])
=> true

indicative.is.dateFormat("2015/10/01", ['YYYY-MM-DD'])
=> false

indicative.is.dateFormat("2015/10/01", ['YYYY-MM-DD', 'YYYY/MM/DD'])
=> true
```

### inDateRange <span class="italic">(value, minDate, maxDate)</span>

```javascript,line-numbers
indicative.is.inDateRange("2015-10-01", "2015-09-01", "2015-12-01")
=> true

indicative.is.inDateRange("2015-10-01", "2015-11-01", "2015-12-01")
=> false
```
