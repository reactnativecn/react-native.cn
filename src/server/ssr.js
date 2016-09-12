/**
 * Created by tdzl2003 on 8/10/16.
 */

// Server-Side-Rendering

import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import routeConfig from '../pages/index';

function fetchData(state) {
  const { routes } = state;
  const jobs = routes.map(v => (v.component && v.component.fetchData)
    ? v.component.fetchData(state) : null);
  return Promise.all(jobs)
    .then(arr => {
      const ret = {};
      arr.forEach(v => v && Object.assign(ret, v));
      return ret;
    });
}

function render(req, res, next) {
  match({
    location: req.url,
    routes: routeConfig,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      if (__DEV__) {
        console.error(err);
      }
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
      Promise.resolve(fetchData(renderProps)).then(resources => {
        if (__DEV__) {
          console.log('Resource loaded: ', resources);
        }
        res.ssrString = renderToString(<RouterContext {...renderProps} />);
        res.ssrMeta = DocumentMeta.renderAsHTML();
        res.ssrResources = resources;
        next();
      }).catch(err1 => {
        if (__DEV__) {
          console.error('Error occured: ', err1);
        }
        res.status(err1.code || 500);
        next();
      });
      return;
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
