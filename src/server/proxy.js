/**
 * Created by sunny on 11/09/2016.
 */

/* eslint-disable import/no-extraneous-dependencies */

import httpProxyMiddleware from 'http-proxy-middleware';

const configure = [
  {
    path: '/proxy/**',
    target: 'http://bbs.reactnative.cn',
    secure: false,
    changeOrigin: true,
    pathRewrite: () => '',
    router: req => {
      console.log(req.url.replace('/proxy/', 'http://'));
      return req.url.replace('/proxy/', 'http://')
    },
  },
];

exports.install = function install(app) {
  configure.forEach(proxyConfig => {
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
