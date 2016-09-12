/**
 * Created by tdzl2003 on 8/10/16.
 */

import Site from './Site';
import Page from './Page';
import Cases from './Cases';
import Blog from './Blog';
import Post from './Post';
import Home from './Home';
import FriendLink from './FriendLink';
import Videos from './Videos';

import docsRoute from './docs';
import NotFound from './NotFound';

function onEnterFetchData(component) {
  if (__SERVER__) {
    return undefined;
  }
  return function (nextState, replace, callback) {
    const stat = component.fetchData(nextState);
    if (stat && typeof stat.then === 'function') {
      stat.then(() => callback()).catch(err => {
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
  indexRoute: {
    component: Home,
    onEnter: onEnterFetchData(Home),
  },
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
    },
    {
      path: 'blog.html',
      component: Blog,
      onEnter: onEnterFetchData(Blog),
    },
    {
      path: 'videos.html',
      component: Videos,
      onEnter: onEnterFetchData(Videos),
    },
    {
      path: 'friendlink.html',
      component: FriendLink,
      onEnter: onEnterFetchData(FriendLink),
    },
    {
      path: 'post/:tid',
      component: Post,
      onEnter: onEnterFetchData(Post),
    },
    docsRoute,
    {
      path: '*',
      component: NotFound,
      status: 404,
    },
  ],
};
