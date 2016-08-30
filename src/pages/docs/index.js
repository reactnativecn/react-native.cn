/**
 * Created by tdzl2003 on 8/29/16.
 */

import Site from './Site';

function onEnterFetchData(component) {
  return function (nextState, replace, callback) {
    const stat = component.fetchData(nextState);
    if (stat && typeof(stat.then) === 'function') {
      stat.then(callback);
      return;
    }
    callback();
  }
}

export default {
  path: 'docs',
  onEnter: (nextState, replace, callback) => {
    const {params} = nextState;
    console.log(params);

    if (!params.version) {
    }
    callback();
  },
  childRoutes: [
    {
      path: ':version',
      component: Site,
      onEnter: onEnterFetchData(Site),
    },
  ],
};