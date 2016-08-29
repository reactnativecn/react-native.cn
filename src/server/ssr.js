/**
 * Created by tdzl2003 on 8/10/16.
 */

// Server-Side-Rendering

import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import routeConfig from '../pages/index';

function render(req, res, next) {
  match({
    location: req.url,
    routes: routeConfig,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500);
      // Continue for client-side rendering.
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;
    } else if (renderProps) {
      const { routes } = renderProps;
      for (let i = routes.length - 1; i >= 0; i--) {
        if (routes[i].status) {
          res.status(routes[i].status);
          break;
        }
      }
      res.ssrString = renderToString(<RouterContext {...renderProps} />);
      res.ssrMeta = DocumentMeta.renderAsHTML();
    } else {
      res.status(404);
      // Continue for client-side rendering.
    }
    next();
  });
}

exports.install = function install(app) {
  app.use(render);
};
