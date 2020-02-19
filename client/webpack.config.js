const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

  const CLIENT_PORT = 3000;
  const SERVER_PORT = 31400;
  const LOG_LEVEL = env.LOG_LEVEL;

  return {
    entry: ['@babel/polyfill', './src/entry.js'],
    devServer: { hot: true, open: true, port: CLIENT_PORT },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test:/\.s[ac]ss$/i, use: ['style-loader','css-loader','sass-loader'] },
        { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
      ]
    },
    optimization: { splitChunks: { chunks: 'all' } },
    output: { filename: "bundle.js", path: path.join(__dirname, './dist/public/') },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({'process.env.dev': SERVER_PORT, 'process.env.LOG_LEVEL': LOG_LEVEL}),
      new HtmlWebpackPlugin({ template: 'templates/index.html', favicon: "templates/favicon/favicon.ico" }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
