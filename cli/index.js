/**
 * Created by Yun on 2015-11-28.
 */

const config = require('./cli.json');
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
  if (command === 'build-client') {
    require('./build');
  } else {
    // General commands.
    if (options.serveWebpack) {
      require('./webpack-dev-server');
    }
    if (options.launchServer) {
      require('./server');
    }
  }
}