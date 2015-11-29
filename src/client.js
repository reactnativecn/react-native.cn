/**
 * Created by Yun on 2015-11-28.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';

import DevTools from './components/DevTools/DevTools';

// Three different types of scroll behavior available.
// Documented here: https://github.com/rackt/scroll-behavior
const scrollablehistory = useScroll(createHistory);

const dest = document.getElementById('content');
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), scrollablehistory, window.__data);

const component = (
  <ReduxRouter routes={getRoutes(store)} />
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEV__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
