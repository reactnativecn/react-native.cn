/**
 * Created by Yun on 2015-11-29.
 */
/**
 * 1. Skip holes in route component chain and
 * only consider components that implement
 * fetchData or fetchDataDeferred
 *
 * 2. Pull out fetch data methods
 *
 * 3. Call fetch data methods and gather promises
 */
export default (components, getState, dispatch, location, params, deferred) => {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return components
    .filter((component) => component && component[methodName]) // 1
    .map((component) => component[methodName](getState, dispatch, location, params)); // 2&3
};
