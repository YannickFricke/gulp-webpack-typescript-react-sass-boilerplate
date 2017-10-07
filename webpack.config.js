module.exports = {
	devtool: "source-map",

	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	module:{
		loaders: [
			{
				test: /\.scss$/,
				loader: 'sass-loader'
			},

			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	}
}