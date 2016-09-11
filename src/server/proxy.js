/**
 * Created by sunny on 11/09/2016.
 */

/* eslint-disable import/no-extraneous-dependencies */


import httpProxyMiddleware from 'http-proxy-middleware';

import webpackConfig from '../../webpack.config.js';


exports.install = function install(app) {
  webpackConfig.devServer.proxy.forEach(proxyConfig => {
    const bypass = typeof proxyConfig.bypass === 'function';
    const context = proxyConfig.context || proxyConfig.path;
    const proxyMiddleware = httpProxyMiddleware(context, proxyConfig);

    app.use((req, res, next) => {
      const bypassUrl = bypass && proxyConfig.bypass(req, res, proxyConfig) || false;

      if (bypassUrl) {
        req.url = bypassUrl;
        next();
      } else if (proxyMiddleware) {
        return proxyMiddleware(req, res, next);
      }
    });
  });
};
