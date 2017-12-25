const tailwindcss = require('tailwindcss')
const path = require('path')

module.exports = {
  plugins: [
    require('postcss-easy-import'),
    tailwindcss(path.join(__dirname, './tailwind.js'))
  ]
}
