/**
 * Created by Yun on 2015-11-28.
 */

import 'isomorphic-fetch';

import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import options from './options';
import path from 'path';
import createStore from './redux/create';
import Html from './helpers/Html';
import http from 'http';

import { ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import { reduxReactRouter, match } from 'redux-router/server';
import { Provider } from 'react-redux';
import { exec } from 'child_process';

import qs from 'query-string';
import getRoutes from './routes';
import { getStatusFromRoutes, getRedirectFromRoutes } from './helpers/getStatusFromRoutes';

const app = new Express();
const server = new http.Server(app);

// import getDataDependencies from './helpers/getDataDependencies';
import storage from './storage/storage';
import { objectToQueryString } from './helpers/paramsHelper';

app.use('/proxy/bbs/api/category/1', (req, res) => {
  if (req.query) {
    storage.sync.newsList({
      query: objectToQueryString(req.query),
      resolve: newsList => res.json(newsList),
    });
  } else {
    storage.load({
      key: 'newsList',
    }).then(newsList => res.json(newsList));
  }
});
app.use('/proxy/bbs/api/category/3', (req, res) => {
  if (req.query) {
    storage.sync.blogList({
      query: objectToQueryString(req.query),
      resolve: blogList => res.json(blogList),
    });
  } else {
    storage.load({
      key: 'blogList',
    }).then(blogList => res.json(blogList));
  }
});
app.use('/proxy/bbs/api/topic', (req, res) => {
  storage.load({
    key: 'post',
    id: req.path.substr(1, req.path.length - 1)
  }).then(post => {
    res.json(post);
  });
});
app.use('/proxy/videos', (req, res) => {
  storage.load({
    key: 'videos'
  }).then(videos => {
    res.json(videos);
  });
});

if (__DEV__) {
  app.use('/static/', Express.static(path.join(__dirname, '../../react-native-docs-cn')));
}
if (__OPTIONS__.updateDocs) {
  app.post('/update', (req, res) => {
    res.send("OK");
    exec('git pull', {
      cwd: __OPTIONS__.docsRoot
    })
  })
}

if (!__DEV__) {
  app.use('/scripts/', Express.static(path.join(__dirname, '..', 'build-release')));
}

if (options.serveAssets) {
  app.use('/static/', Express.static(path.join(__dirname, '../../react-native-docs-cn')));
}

app.use((req, res) => {
  if (__DEV__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const referer = req.get('referer');
  referer && (global.referer = referer);

  const store = createStore(reduxReactRouter, getRoutes, createHistory);

  function hydrateOnClient() {
    res.send(`<!doctype html>\n
      ${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }
  if (!options.enableSSR) {
    hydrateOnClient();
    return;
  }

  function sendRendered(routerState) {
    const redirect = getRedirectFromRoutes(routerState.routes, routerState.params);
    if (redirect) {
      res.redirect(redirect);
      return;
    }
    const component = (
      <Provider store={store} key="provider">
        <ReduxRouter />
      </Provider>
    );
    const status = getStatusFromRoutes(routerState.routes);
    if (status) {
      res.status(status);
    }
    res.send(`<!doctype html>\n
      ${ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
      )}`);
  }
  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }

      referer && res.cookie('referer', referer, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });

      const state = store.getState();
      state.fetchData && state.fetchData.then(() => {
        sendRendered(store.getState().router);
      }).catch(err => {
        console.error(err.stack);
        res.status(500);
        hydrateOnClient();
      })
    }
  }));
});

if (options.port) {
  server.listen(options.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', options.host, options.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
