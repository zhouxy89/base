const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

	const CLIENT_PORT = env.CLIENT_PORT;
	const SERVER_PORT = env.SERVER_PORT;

	return {
		entry: ['@babel/polyfill', './src/entry.js'],
		devServer: { hot: true, open: true, port: CLIENT_PORT },
		devtool: "inline-cheap-module-source-map",
		module: {
			rules: [
				{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
				{ test: /\.css$/i, use: ['style-loader', 'css-loader'] },
				{
					test: /\.s[ac]ss$/i, use:
						[
							{ loader: 'style-loader' },
							{ loader: 'css-loader' },
							{ loader: 'postcss-loader', options:
									{
										plugins: function()
										{
											return [require('precss'), require('autoprefixer')];
										}
									}
							},
							{ loader: 'sass-loader' }
						]
				},
				{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
			]
		},
		output: { filename: "bundle.js", path: path.join(__dirname, './dist/public/') },
		performance: { hints: false },
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({'process.env.SERVER_PORT': SERVER_PORT}),
			new HtmlWebpackPlugin({ template: 'templates/index.html', favicon: "templates/favicon.ico" }),
			new webpack.HotModuleReplacementPlugin()
		]
	}
};