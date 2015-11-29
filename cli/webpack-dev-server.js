
/**
 * Created by Yun on 2015-11-28.
 */

const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

const options = __OPTIONS__;
const host = options.webpackHost;
const port = options.webpackPort;
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==>   Webpack development server listening on port %s', port);
  }
});
