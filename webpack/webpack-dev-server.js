import express from 'express'
import webpack from 'webpack'
import configuration from './webpack.config.client.development'

import application_configuration from './application_configuration';

// http://webpack.github.io/docs/webpack-dev-server.html
const development_server_options = 
{
	quiet       : true, // don’t output anything to the console
	noInfo      : true, // suppress boring information
	hot         : true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
	inline      : true, // also adds the webpack/hot/dev-server entry

	// You can use it in two modes:
	// watch mode (default): The compiler recompiles on file change.
	// lazy mode: The compiler compiles on every request to the entry point.
	lazy        : false, 

	// network path for static files: fetch all statics from webpack development server
	publicPath  : configuration.output.publicPath,

	headers     : { "Access-Control-Allow-Origin": "*" },
	stats       : { colors: true }
}

const compiler = webpack(configuration)

const development_server = new express()

development_server.use(require('webpack-dev-middleware')(compiler, development_server_options))
development_server.use(require('webpack-hot-middleware')(compiler))

development_server.listen(application_configuration.development.webpack.development_server.port, (error) =>
{
	if (error) 
	{
		console.error(error.stack || error)
		throw error
	}

	console.log('[webpack-dev-server] Running')
})