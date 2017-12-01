# Benchmarks

Since I am planning to improve the core engine with zero breaking changes, here are some benchmarks for the exisiting code.

#### validate x 188,859 ops/sec ±4.84% (67 runs sampled)
With following code

```js
const Benchmark = require('benchmark')
const suite = new (Benchmark.Suite)()

const { validate } = require('../index')

const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:6|max:10'
}
const data = {}

suite.add('validate', function () {
  validate(rules, data)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.run({ 'async': true })
```

#### validateAll x 194,253 ops/sec ±4.46% (67 runs sampled)
With following code

```js
const Benchmark = require('benchmark')
const suite = new (Benchmark.Suite)()

const { validateAll } = require('../index')
const rules = {
  username: 'required|alpha',
  email: 'required|email',
  password: 'required|min:6|max:10'
}
const data = {}

suite.add('validate', function () {
  validateAll(rules, data)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.run({ 'async': true })
```

# Bundle Size
The initial bundle size with webpack is `725 kB`, which is non-usable by browsers for sure.

![](http://res.cloudinary.com/adonisjs/image/upload/v1512104285/indicative-initial-bundle-size_khiz4o.png)