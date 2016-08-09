/**
 * Created by tdzl2003 on 8/10/16.
 */
/* eslint-disable import/no-extraneous-dependencies, global-require */

import * as path from 'path';
import Express from 'express';
import http from 'http';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';

const webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
  .development(__DEV__);

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

const app = new Express();
const server = new http.Server(app);

if (__DEV__) {
  require('./server/webpack').install(app);
  require('./server/statics').install(app);

  app.use((req, res, next) => {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
    next();
  });
}

app.use((req, res) => {
  const assets = webpackIsomorphicTools.assets();

  // TODO: Server-Side-Rendering

  res.send(`<!doctype html>
<html>
  <head>
    <title>Loading...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
${
    Object.keys(assets.styles).map(style =>
    `    <link href="${assets.styles[style]}" media="screen, projection"
                rel="stylesheet" />`).join('\n')
}
${
    Object.keys(assets.styles).length === 0 && (
    `<style>
      ${
        Object.keys(assets.assets)
          .map(key => ssets.assets[key])
          // eslint-disable-next-line no-underscore-dangle
          .filter(v => typeof v === 'object' && v._style)
          // eslint-disable-next-line no-underscore-dangle
          .map(v => v._style)
          .join('\n')
      }
    </style>`
  )
}
    <script src="${assets.javascript.index}"></script>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>`);
});

webpackIsomorphicTools.server(path.resolve(__dirname, '..'), ()=>{
  server.listen(port, host, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
  });
});
