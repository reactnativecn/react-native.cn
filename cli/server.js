/**
 * Created by Yun on 2015-11-28.
 */
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
  .development(__DEV__)
  .server(rootDir, function () {
    require('../src/server');
  });
