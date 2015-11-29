/**
 * Created by Yun on 2015-11-28.
 */

const config = require('../cli/cli.json');
if (process.env.NODE_ENV === 'production') {
  config.defaultCommand = 'production';
}
const {command, options} = require('cli-arguments').parse(config);

global.__OPTIONS__ = options;
global.__DEV__ = !options.production;
global.__SERVER__ = true;
global.__CLIENT__ = false;

function doPiping() {
  if (__DEV__) {
    return require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i,
    });
  }
  return true;
}

if (doPiping()) {
  if (command === 'webpack-dev') {
    require('./webpack-dev-server');
  } else if (command === 'server') {
    require('./server');
  } else if (command === 'development') {
    require('./webpack-dev-server');
    require('./server');
  }
}