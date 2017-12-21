const path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    './front-end/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, 'front-end'),
        query: { presets: ['react'] }     // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
}