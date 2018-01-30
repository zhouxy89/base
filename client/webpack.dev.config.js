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
    './src/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'public'
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_PORT': 8080,
      'SERVICE_URL': JSON.stringify("")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { 
        test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, './', 'src'),
        query: { presets: ['react'] } // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss&/, loaders: ["style-loader", "css-loader", "sass-loader"] }
    ]
  }
}
