const nodeExternals = require("webpack-node-externals");

module.exports = {
	target: "node",
	context: __dirname,
	devtool: "source-map",
	node: {
		__filename: false,
		__dirname: false
	},
	externals: [nodeExternals()],
	entry: {
		server: "./bin/www.js"
	},
	output: {
		path: __dirname,
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: "sass-loader"
			}
		]
	}
};
