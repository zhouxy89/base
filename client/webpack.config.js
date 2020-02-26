const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

	const CLIENT_PORT = env.CLIENT_PORT;
	const SERVER_PORT = env.SERVER_PORT;
	const LOG_LEVEL = env.LOG_LEVEL;

	return {
		entry: ['@babel/polyfill', './src/entry.js'],
		devServer: { hot: true, open: true, port: CLIENT_PORT },
		module: {
			rules: [
				{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
				{ test: /\.css$/i, use: ['style-loader', 'css-loader'] },
				{ test:/\.s[ac]ss$/i, use: ['style-loader','css-loader','sass-loader'] },
				{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
			]
		},
		output: { filename: "bundle.js", path: path.join(__dirname, './dist/public/') },
		performance: { hints: false },
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({'process.env.SERVER_PORT': SERVER_PORT, 'process.env.LOG_LEVEL': LOG_LEVEL}),
			new HtmlWebpackPlugin({ template: 'templates/index.html', favicon: "templates/favicon.ico" }),
			new webpack.HotModuleReplacementPlugin()
		]
	}
};