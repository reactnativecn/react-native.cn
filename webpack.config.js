/**
 * Created by Yun on 2015-11-28.
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

require('webpack-isomorphic-tools');

const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

const assetsPath = path.join(__dirname, __DEV__ ? 'build-debug' : 'build-release');
const options = global.__OPTIONS__ || {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  throw err;
}

const babelLoaderQuery = Object.assign({},
  babelrcObject,
  __DEV__ && babelrcObject.env && babelrcObject.env.development,
  babelrcObject.env && babelrcObject.env.web
);
delete babelLoaderQuery.env;

const webpackRoot = 'http://' + options.webpackHost + ':' + options.webpackPort;

function styleLoader(type) {
  if (__DEV__) {
    return 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version' +
      (type ? ('!' + type + '?outputStyle=expanded&sourceMap') : '' );
  }
  return ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version' +
    (type ? ('!' + type + '?outputStyle=expanded&sourceMap=true&sourceMapContents=true') : ''));
}

module.exports = {
  devtool: __DEV__ && 'inline-source-map',
  context: __dirname,
  entry: {
    'main': __DEV__ ? [
      'webpack-hot-middleware/client?path=' + webpackRoot + '/__webpack_hmr',
      './src/client.js',
    ] : [
      './src/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: __DEV__ ? '[name]-[hash].js' : '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: __DEV__ ? webpackRoot + '/build-debug/' : '/scripts/',
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint'},
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: styleLoader('less') },
      { test: /\.scss$/, loader: styleLoader('sass') },
      { test: /\.css$/, loader: styleLoader() },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: !!__DEV__,
      __DEVTOOLS__: !!options.showDevTool,
      __OPTIONS__: {
        'production': !__DEV__,
      },
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: __DEV__ ? JSON.stringify('development') : JSON.stringify('production'),
      },
    }),
    webpackIsomorphicToolsPlugin.development(__DEV__),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ].concat(__DEV__ ? [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
  ] : [
    new CleanPlugin([assetsPath]),
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
  ]),
};
