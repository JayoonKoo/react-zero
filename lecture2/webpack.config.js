const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'word-relay-setting',
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx']
	},

	entry: {
		app: ['./client.jsx', 'react-refresh/runtime', 'webpack-hot-middleware/client'],
	}, // 입력

	module: {
		rules: [
			{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: 'babel-loader',
			}
		]
	},

	target: ['web', 'es5'],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist',
		clean: true
	}, // 출력

	plugins: [
		new RefreshWebpackPlugin(),
		// new HtmlPlugin({
		// 	template: './index.html'
		// }),
	],

	devServer: {
		devMiddleware: {publicPath: '/dist'},
		static: {directory: path.resolve(__dirname)},
		hot: true
	}
}
