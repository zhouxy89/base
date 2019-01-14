const path = require('path')
const webpack = require('webpack')

const dev_port = 31401;
const server_port = 31400;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: dev_port,
    open: true,
    hot: true,
  },
  entry: [
    'babel-polyfill',
    './src/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.dev': server_port
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/, use: 'babel-loader',
        include: path.join(__dirname, './', 'src'),
      },
      { test: /\.json$/, use: {
        loader: 'file-loader',
        options: { name: 'pages/[name].[ext]' } }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif|svg)$/, use: {
        loader: 'file-loader',
        options: { name: 'images/[name]-[hash:8].[ext]' }}
      }
    ]
  }
}
