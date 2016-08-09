/**
 * Created by Yun on 2015-11-28.
 */

/* eslint-disable import/no-extraneous-dependencies, global-require */

const assert = require('assert');

// define globals
global.__SERVER__ = true;
global.__DEV__ = global.__DEV__ = process.env.NODE_ENV !== 'production';
assert(__DEV__, 'Dev server should only run in development mode!');
process.env.BABEL_ENV = 'server';

// install babel register
require('babel-register')();

// support '.server.js' extensions
const old = require.extensions['.js'];
delete require.extensions['.js'];
require.extensions['.server.js'] = old;
require.extensions['.js'] = old;

// install piping

function doPiping() {
  if (__DEV__) {
    return require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i,
    });
  }
  return true;
}

// run
if (doPiping()) {
  require('../src/index.server');
}
