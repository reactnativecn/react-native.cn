/**
 * Created by Yun on 2015-11-28.
 */
import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import getDataDependencies from '../../helpers/getDataDependencies';

const locationsAreEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search);

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    const {components, location, params} = action.payload;
    const promise = new Promise((resolve, reject) => {
      const doTransition = () => {
        next(action);
        Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
          .then(resolve)
          .catch(reject);
      };

      Promise.all(getDataDependencies(components, getState, dispatch, location, params))
        .then(doTransition)
        .catch(reject);
    });

    return promise;
  }

  return next(action);
};
