const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	name: 'word-relay-setting',
	resolve: {
		extensions: ['.js', '.jsx']
	},

	entry: {
		app: ['./client.jsx'],
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

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	}, // 출력

	plugins: [
		new HtmlPlugin({
			template: './index.html'
		}),
	],
}
