const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

module.exports = [
  nodeResolve({
    module: true,
    main: true
  }),
  commonjs(),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ],
    plugins: ['external-helpers']
  })
]
