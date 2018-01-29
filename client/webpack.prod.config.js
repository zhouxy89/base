const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './scripts/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("")
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, 'scripts'),
        query: { presets: ['react'] } // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss&/, loaders: ["style-loader", "css-loader", "sass-loader"] }
    ]
  }
}
