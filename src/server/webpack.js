/**
 * Created by tdzl2003 on 8/10/16.
 */

/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.js';

const compiler = webpack(webpackConfig);

exports.install = function install(app) {
  compiler.run(() => {});
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
};
