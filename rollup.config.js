import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const rollupPlugins = require('./rollupPlugins')
const pkg = require('./package.json')
const plugins = rollupPlugins.concat([uglify({}, minify)])

export default [
  {
    input: './index',
    output: {
      file: pkg.main,
      format: 'umd',
      name: 'indicative'
    },
    plugins: plugins
  },
  {
    input: 'src/core/configure',
    output: {
      file: 'builds/configure.js',
      format: 'umd',
      name: 'indicative.configure'
    },
    plugins: plugins
  },
  {
    input: 'src/core/rule',
    output: {
      file: 'builds/rule.js',
      format: 'umd',
      name: 'indicative.rule'
    },
    plugins: plugins
  },
  {
    input: 'src/core/validator',
    output: {
      file: 'builds/validator.js',
      format: 'umd',
      name: 'indicative.validator'
    },
    plugins: plugins
  },
  {
    input: 'src/formatters/index',
    output: {
      file: 'builds/formatters.js',
      format: 'umd',
      name: 'indicative.formatters'
    },
    plugins: plugins
  },
  {
    input: 'src/raw/index',
    output: {
      file: 'builds/raw.js',
      format: 'umd',
      name: 'indicative.is'
    },
    plugins: plugins
  },
  {
    input: 'src/validations/index',
    output: {
      file: 'builds/validations.js',
      format: 'umd',
      name: 'indicative.validations'
    },
    plugins: plugins
  },
  {
    input: 'src/core/sanitizor',
    output: {
      file: 'builds/sanitizor.js',
      format: 'umd',
      name: 'indicative.sanitizor'
    },
    plugins: plugins
  },
  {
    input: 'src/sanitizations/index',
    output: {
      file: 'builds/sanitizations.js',
      format: 'umd',
      name: 'indicative.sanitizations'
    },
    plugins: plugins
  }
]
