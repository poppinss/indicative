import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default [
  {
    input: './index.js',
    output: [
      { file: 'dist/indicative.umd.js', format: 'umd', name: 'Indicative' },
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**'],
      }),
      resolve(),
      commonjs(),
      uglify({}, minify),
    ],
  },
  {
    input: './index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**'],
        modules: false,
      }),
      commonjs(),
    ],
    external: [
      'date-fns/add_years',
      'date-fns/add_quarters',
      'date-fns/add_months',
      'date-fns/add_days',
      'date-fns/add_weeks',
      'date-fns/add_hours',
      'date-fns/add_minutes',
      'date-fns/add_seconds',
      'date-fns/add_milliseconds',
      'date-fns/sub_years',
      'date-fns/sub_quarters',
      'date-fns/sub_months',
      'date-fns/sub_days',
      'date-fns/sub_weeks',
      'date-fns/sub_hours',
      'date-fns/sub_minutes',
      'date-fns/sub_seconds',
      'date-fns/sub_milliseconds',
      'date-fns/format',
      'date-fns/is_after',
      'date-fns/is_before',
      'date-fns/is_past',
      'date-fns/is_today',
      'date-fns/is_tomorrow',
      'date-fns/is_valid',
      'date-fns/is_within_range',
      'date-fns/is_yesterday',
      'date-fns/parse',
      'haye',
      'lodash',
      'p-settle',
      'pluralize',
      'pope'
    ],
  },
]
