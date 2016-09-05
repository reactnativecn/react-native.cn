/**
 * Created by tdzl2003 on 8/10/16.
 */

import Site from './Site';
import Page from './Page';
import Cases from './Cases';
import NotFound from './NotFound';

import docsRoute from './docs';

function onEnterFetchData(component) {
  return function (nextState, replace, callback) {
    const stat = component.fetchData(nextState);
    if (stat && typeof(stat.then) === 'function') {
      stat.then(()=>callback()).catch(err=>{
        if (__DEV__) {
          console.error(err);
        }
      });
      return;
    }
    callback();
  };
}

export default {
  path: '/',
  component: Site,
  childRoutes: [
    {
      path: 'about.html',
      component: Page,
      onEnter: onEnterFetchData(Page),
      markdown: '/about.md',
    },
    {
      path: 'cases.html',
      component: Cases,
      onEnter: onEnterFetchData(Cases),
      resource: '/cases/cases.json',
    },

    docsRoute,

    {
      path: '*',
      component: NotFound,
      status: 404,
    }
  ],
};
