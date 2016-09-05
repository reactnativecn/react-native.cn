/**
 * Created by tdzl2003 on 8/29/16.
 */

import Site from './Site';
import Page from './Page';
import versions from '../../../docs/versions.json';

function onEnterFetchData(component) {
  return function (nextState, replace, callback) {
    const stat = component.fetchData(nextState);
    if (stat && typeof(stat.then) === 'function') {
      stat.then(()=>callback());
      return;
    }
    callback();
  };
}

function onChangeFetchData(component) {
  return function (prevState, nextState, replace, callback) {
    const stat = component.fetchData(nextState);
    if (stat && typeof(stat.then) === 'function') {
      stat.then(()=>callback());
      return;
    }
    callback();
  };
}

function directPage(nextState, replace, callback) {
  const { params } = nextState;

  if (!params.version) {
    replace(`/docs/${versions.current}/getting-started.html`);
  } else if (!params.doc) {
    replace(`/docs/${params.version}/getting-started.html`);
  } else if (!versions.list.filter(v => v.version === params.version).length) {
    // 未知版本
    replace('/404');
  }
  callback();
}

export default {
  path: 'docs',
  onEnter: directPage,
  onChange: (prevState, nextState, replace, callback) => directPage(nextState, replace, callback),
  childRoutes: [
    {
      path: ':version',
      component: Site,
      onEnter: onEnterFetchData(Site),
      onChange: onChangeFetchData(Site),
      childRoutes: [
        {
          path: ':doc(\\w+).html',
          component: Page,
          onEnter: onEnterFetchData(Page),
          onChange: onChangeFetchData(Page),
        },
      ],
    },
  ],
};