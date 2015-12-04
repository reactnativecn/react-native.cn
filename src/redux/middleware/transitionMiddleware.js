/**
 * Created by Yun on 2015-11-28.
 */
import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import getDataDependencies from '../../helpers/getDataDependencies';

import {startFetchData, fetchDataOver, fetchDataFailed} from '../modules/fetchData';

const locationsAreEqual = (locA, locB) => locA && locB && (locA.pathname === locB.pathname) && (locA.search === locB.search);

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }
    const {components, location, params} = action.payload;

    const promise = Promise.resolve()
      .then(()=>Promise.all(getDataDependencies(components, getState, dispatch, location, params)))
      .then(() => {
        next(action);
        return Promise.all(getDataDependencies(components, getState, dispatch, location, params, true));
      })
      .then(()=>dispatch(fetchDataOver()), err=>{
        dispatch(fetchDataFailed(err)); throw err;
      });
    dispatch(startFetchData(promise));

    return promise;
  }

  return next(action);
};
