/**
 * Created by Yun on 2015-11-28.
 */
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import transitionMiddleware from './middleware/transitionMiddleware';

import reducer from './reducer';

export default function createStore(reduxReactRouter, getRoutes, createHistory, data) {
  const middleware = [transitionMiddleware];

  let finalCreateStore;
  if (__DEV__ && __CLIENT__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../components/DevTools/DevTools').default;
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

  const store = finalCreateStore(reducer, data);

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
