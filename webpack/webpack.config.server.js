import { server_configuration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

const base_configuration = server_configuration(configuration, settings)

base_configuration.resolve.extensions = ['', '.json', '.server.js', '.js'];
export default base_configuration;