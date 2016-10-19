import path     from 'path'

import webpack             from 'webpack'
import base_configuration  from './webpack.config.client'
import clean_plugin        from 'clean-webpack-plugin'

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = base_configuration({ development: false })

configuration.devtool = 'source-map'

configuration.plugins = configuration.plugins.concat
(
	// clears the output folder
	new clean_plugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),

	// environment variables
	new webpack.DefinePlugin
	({
		'process.env':
		{
			// Useful to reduce the size of client-side libraries, e.g. react
			NODE_ENV: JSON.stringify('production') // 'development' to see non-minified React errors
		},

		__DEV__       : false,
		__CLIENT__      : true,
		__SERVER__    : false,

	}),

	// Omit duplicate modules
	new webpack.optimize.DedupePlugin(),

	// Assign the module and chunk ids by occurrence count. 
	// Ids that are used often get lower (shorter) ids. 
	// This make ids predictable, reduces to total file size and is recommended.
	new webpack.optimize.OccurenceOrderPlugin(),

	// // extracts common javascript into a separate file (works)
	// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),

	// Compresses javascript files
	new webpack.optimize.UglifyJsPlugin
	({
		compress:
		{
			warnings: false
		}
	})
)

export default configuration