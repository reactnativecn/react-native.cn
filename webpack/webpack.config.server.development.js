import base_configuration from './webpack.config.server'

import application_configuration from './application_configuration'

// Network path for static files: fetch all statics from webpack development server
base_configuration.output.publicPath = `http://${application_configuration.development.webpack.development_server.host}:${application_configuration.development.webpack.development_server.port}${base_configuration.output.publicPath}`

export default base_configuration