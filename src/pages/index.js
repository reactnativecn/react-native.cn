/**
 * Created by tdzl2003 on 8/10/16.
 */

import Site from './Site';
import Page from './Page';

function onEnterFetchData(component) {
  return async function (nextState, replace, callback) {
    await component.fetchData(nextState);
    callback();
  }
}

export default {
  path: '/',
  component: Site,
  childRoutes: [
    {
      path: 'about.html',
      component: Page,
      onEnter: onEnterFetchData(Page),
      markdown: 'about.md',
    },
  ],
};
