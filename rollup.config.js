import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const plugins = require('./rollupPlugins')
plugins.push(uglify({}, minify))

export default [
  {
    input: './index',
    output: {
      file: 'build/main.es.js',
      format: 'es',
      name: 'indicative'
    },
    plugins: plugins
  },
  {
    input: './index',
    output: {
      file: 'build/main.js',
      format: 'cjs',
      name: 'indicative'
    },
    plugins: plugins
  },
  {
    input: './index',
    output: {
      file: 'build/main.umd.js',
      format: 'umd',
      name: 'indicative'
    },
    plugins: plugins
  },
  {
    input: 'src/core/validator',
    output: {
      file: 'build/core.js',
      format: 'es',
      name: 'indicative'
    },
    plugins: plugins
  },
  {
    input: 'src/raw/index',
    output: {
      file: 'build/raw.js',
      format: 'es',
      name: 'indicative.is'
    },
    plugins: plugins
  },
  {
    input: 'src/validations/index',
    output: {
      file: 'build/validations.js',
      format: 'es',
      name: 'indicative.validations'
    },
    plugins: plugins
  }
]
