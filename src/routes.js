/**
 * Created by Yun on 2015-11-29.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Site from './pages/Site';
import NotFound from './pages/NotFound';

import Index from './pages/Index';
import Cases from './pages/Cases';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Videos from './pages/Videos';
import FriendLink from './pages/FriendLink';
import Page from './pages/Page';

import DocRoot from './pages/docs/Site';
import DocPage from './pages/docs/Page';

import bbsRedirect from './bbsRedirect.json';
import versions from './pages/docs/versions.json';

const redirectFunc = ({ postId }) => (bbsRedirect.redirects[postId] || 'http://bbs.reactnative.cn/');
const docRedirect = (nextState, replace) => {
  const { params } = nextState;
  if (params.docid && params.docid.indexOf('.html') !== -1) {
    replace(`/docs/${versions.current}/${params.docid}`);
  } else {
    replace(`/docs/${params.docid}/getting-started.html`);
  }
};
export default () => (
  <Route path="/" component={Site}>
    <IndexRoute component={Index} />
    <Route path="cases.html" component={Cases} />
    <Route path="blog.html" component={Blog} />
    <Route path="videos.html" component={Videos} />
    <Route path="about.html" component={Page} />
    <Route path="friendlink.html" component={FriendLink} />
    <Route path="post/:tid" component={Post} />
    <Route path="bbs">
      <IndexRoute redirect="http://bbs.reactnative.cn/" />
      <Route path="post/:postId" getRedirect={redirectFunc} />
    </Route>
    {
      __SERVER__ &&
      <Route path="docs" redirect={`/docs/${versions.current}/getting-started.html`} />
    }
    <Route path="docs" component={DocRoot}>
      <IndexRoute redirect={`/docs/${versions.current}/getting-started.html`} />
      <Route
        path=":docid"
        onEnter={docRedirect}
      />
      <Route path=":version/:docid" component={DocPage} />
    </Route>
    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

