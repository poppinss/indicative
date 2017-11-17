var pSeries = require('p-series')
const PLazy = require('p-lazy')

var p1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('foo'))
    })
  })
}

var p2 = function () {
  console.log('executed')
  return new Promise((resolve, reject) => {
    reject(new Error('bar'))
  })
}

var pWrapper = function (p) {
  return new PLazy((resolve, reject) => {
    p().then(resolve).catch(reject)
  })
}

// const pro = [p1, p2].map((p) => pWrapper(p()))

pSeries([pWrapper(p1), pWrapper(p2)]).catch(console.error)
