# Thanks for contributing

Indicative is written using ES2015..2017 and compiled with the help of [rollup](https://rollupjs.org/) and [babeljs](https://babeljs.io/)

I do make sure that all the code should work fine on all modern browsers including `IE10` and Node.js 7.0 or greater.

## Setup
Start by forking the repo and then clone your fork. Next step is to install all dependencies.

```
npm install
```

## Running tests
Tests are executed on Node.js and on browser using **Karma** and **Qunit**. Qunit tests are just written to make sure everything works fine together, whereas Karma and Node.js contains the unit tests.

```
npm run test:karma
npm run test:node
npm run test:qunit

# for all tests
npm run test
```

## Creating build
Build is created using Rollup and Babel and all output files are dropped inside `builds` directory.

```
npm run build
```

## Creating docs
Some of the docs are extracted from the code comments and then processed using [chul](https://github.com/thetutlage/chul).

```
npm run docs
```

Also you can start the http server that serves the docs and watch them for changes.

```
npm run docs:serve
```
