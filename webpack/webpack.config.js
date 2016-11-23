// This is the base Webpack configuration file

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

// project folder
var root_folder = path.resolve(__dirname, '..')

// regular expressions for module.loaders
var regular_expressions =
{
	javascript : /\.js$/,
	less     : /\.less/,
	stylus     : /\.styl/,
	css: /\.css/,
}

var configuration =
{
	// resolve all relative paths from the project root folder
	context: root_folder,

	// https://webpack.github.io/docs/multiple-entry-points.html
	entry:
	{
		index: './src'
	},

	output: 
	{
		// filesystem path for static files
		path: path.resolve(root_folder, 'build/scripts'),

		// network path for static files
		publicPath: '/scripts/',

		// file name pattern for entry scripts
		filename: '[name].[hash].js',

		// file name pattern for chunk scripts
		chunkFilename: '[name].[hash].js'
	},

	module:
	{
		loaders: 
		[
			{
				test   : /\.json$/,
				loader : 'json-loader'
			},
			{
				test    : regular_expressions.javascript,
				// include: [path.resolve(root_folder, 'code')],
				// exclude: path.resolve(root_folder, 'node_modules'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test    : regular_expressions.css,
				loaders :
					[
						'style-loader',
						'css-loader?importLoaders=2&sourceMap',
						'postcss-loader',
					]
			},
			{
				test    : regular_expressions.less,
				loaders : 
				[
					'style-loader',
					'css-loader?importLoaders=2&sourceMap',
					'postcss-loader',
					'less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
				]
			},
			{
				test    : regular_expressions.stylus,
				loaders :
					[
						'style-loader',
						'css-loader?importLoaders=2&sourceMap',
						'postcss-loader',
						'stylus-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
					]
			},
			{
				test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff',
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream',
			},
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
			{
				test    : /\.(jpg|png)$/,
				loaders : 
				[
					'url-loader?limit=10000' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
				]
			}
		]
	},

	// maybe some kind of a progress bar during compilation
	progress: true,

	postcss: () => [autoprefixer({ browsers: 'last 2 version' })],

	resolve:
	{
		// you can now require('file') instead of require('file.[extension]')
		extensions: ['', '.json', '.js']
	},

	plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
	]
}

module.exports = configuration

// will be used in development and production configurations
configuration.regular_expressions = regular_expressions
