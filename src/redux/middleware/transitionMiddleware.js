/**
 * Created by Yun on 2015-11-28.
 */
import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';
import getDataDependencies from '../../helpers/getDataDependencies';
import { getRedirectFromRoutes } from '../../helpers/getStatusFromRoutes';
import { startFetchData, fetchDataOver, fetchDataFailed } from '../modules/fetchData';

const locationsAreEqual = (locA, locB) =>
                            locA && locB
                              && (locA.pathname === locB.pathname)
                                && (locA.search === locB.search);

if (__CLIENT__ && !__DEV__) {
  /*eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63485149-4', 'auto');
  ga('send', 'pageview');
}

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }
    const {components, location, params, routes} = action.payload;

    if (__CLIENT__) {
      const redirect = getRedirectFromRoutes(routes, params);
      if (redirect) {
        window.location = redirect;
        return action;
      }
    }

    const promise = Promise.resolve()
      .then(() => Promise.all(getDataDependencies(components, getState, dispatch, location, params)))
      .then(() => {
        next(action);
        if (__CLIENT__ && !__DEV__){
          ga('send', 'pageview');
        }
        return Promise.all(getDataDependencies(components, getState, dispatch, location, params, true));
      })
      .then(() => dispatch(fetchDataOver()), err => {
        dispatch(fetchDataFailed(err)); throw err;
      });
    dispatch(startFetchData(promise));

    return promise;
  }

  return next(action);
};
