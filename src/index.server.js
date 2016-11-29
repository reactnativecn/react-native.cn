/**
 * Created by tdzl2003 on 8/10/16.
 */
/* eslint-disable import/no-extraneous-dependencies, global-require */

import Express from 'express';
import http from 'http';

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const __DISABLE_SSR__ = process.env.DISABLE_SSR;

export default function (params) {
  const assets = params.chunks();
  const app = new Express();
  const server = new http.Server(app);

  if (__DEV__) {
    require('./server/statics').install(app);
    require('./server/proxy').install(app);

    app.use((req, res, next) => {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      next();
    });
  }

  if (!__DISABLE_SSR__) {
    require('./server/ssr').install(app);
  }

  app.use((req, res) => {
    res.send(`<!doctype html>
<html>
<head>
${
    res.ssrMeta || '<title>Loading...</title>'
      }
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
  <link type="text/css" rel="stylesheet" href="${assets.styles.index}"/>
</head>
<body>
  <div id="content">${res.ssrString || ''}</div>
  <script>window.resources=${JSON.stringify(res.ssrResources || {}).replace(/<\/script>/i, '<\\/script>')}</script>
  <script>var duoshuoQuery = {short_name:"reactnative"}</script>
  <script src="//static.duoshuo.com/embed.js"></script>
  <script src="${assets.javascript.index}" async></script>
</body>
</html>`);
  });

  server.listen(port, host, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
  });

}
