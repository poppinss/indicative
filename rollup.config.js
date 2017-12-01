import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  name: 'indicative',
  input: 'index.js',
  output: {
    file: 'dist/indicative-umd.js',
    format: 'umd'
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
}
