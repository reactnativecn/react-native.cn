global.__DEV__ = false;
global.__CLIENT__ = false;
global.__SERVER__ = true;
const server = require('universal-webpack').server;
const settings = require('../webpack/universal-webpack-settings');
const configuration = require('../webpack/webpack.config');

server(configuration, settings);
