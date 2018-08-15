const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: [path.join(__dirname, 'static/app.js'), path.join(__dirname, 'static/style.css')],
  mode: 'production',
  output: {
    path: path.join(__dirname, '_site/public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}
