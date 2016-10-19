import { client_configuration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

export default function(options)
{
	const base_configuration = client_configuration(configuration, settings, options);
	base_configuration.resolve.extensions = ['', '.json', '.web.js', '.js'];
	return base_configuration;
}