/**
 * Created by Yun on 2015-11-28.
 */

/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle */

global.__SERVER__ = process.env.WEBPACK_CONFIG === 'server';
global.__DEV__ = process.env.NODE_ENV !== 'production';

process.env.BABEL_ENV = __SERVER__ ? 'server' : 'web';

const path = require('path');
const webpack = require('webpack');

require('webpack-isomorphic-tools');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicConfig = require('./webpack-isomorphic-tools');

const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(isomorphicConfig);

const autoprefixer = require('autoprefixer');

const assetsPath = path.join(__dirname,
  'build',
  __SERVER__ ? 'server' : 'web',
  __DEV__ ? 'debug' : 'release'
);

function styleLoader(type) {
  const loaders = [
    'style',
    `css?${JSON.stringify({
      importLoaders: 2,
      sourceMap: true,
    })}`,
    'postcss',
  ];

  if (type) {
    loaders.push(`${type}?${JSON.stringify({
      outputStyle: 'expanded',
      sourceMap: true,
    })}`);
  }

  if (__DEV__) {
    return loaders;
  }
  return ExtractTextPlugin.extract(loaders[0], loaders.slice(1));
}

module.exports = {
  context: __dirname,
  entry: {
    index:[
      './src',
    ],
  },
  devtool: "#inline-source-map",
  output: {
    path: __DEV__ ? assetsPath : (`${assetsPath}/[hash]`),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: __DEV__ ? '/scripts/' : '/scripts/[hash]/',
  },
  postcss: () => [autoprefixer({ browsers: 'last 2 versions' })],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loaders: styleLoader('less') },
      { test: /\.styl$/, loaders: styleLoader('stylus') },
      { test: /\.scss$/, loaders: styleLoader('sass') },
      { test: /\.css$/, loaders: styleLoader() },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240',
      },
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', __SERVER__ ? '.server.js' : '.web.js', '.json', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: !__SERVER__,
      __SERVER__,
      __DEV__,
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: __DEV__ ? JSON.stringify('development') : JSON.stringify('production'),
      },
    }),
    webpackIsomorphicToolsPlugin.development(__DEV__),
    new webpack.ProvidePlugin({
      polyfill: 'babel-polyfill',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ].concat(__DEV__ ? [
    // hot reload
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
  ] : [
    new CleanPlugin([assetsPath]),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]),

  devServer: {
    contentBase: './',
    historyApiFallback: true,
    proxy: {
    },
    quiet: false,
    noInfo: false,
    lazy: true,
    filename: '[name].bundle.js',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    publicPath: '/scripts/',
    stats: { colors: true },
    features: [
      'magicHtml',
    ],
  },
};
