const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  devServer: {
    open: true,
    hot: true
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './front-end/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, 'front-end'),
        query: { presets: ['react'] } // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss&/, loaders: ["style-loader", "css-loader", "sass-loader"] }
    ]
  }
}