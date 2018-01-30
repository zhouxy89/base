const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '../public'
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("")
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: { presets: ['react'] } // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss&/, loaders: ["style-loader", "css-loader", "sass-loader"] }
    ]
  }
}
