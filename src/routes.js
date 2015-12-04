/**
 * Created by Yun on 2015-11-29.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Site from './pages/Site';
import NotFound from './pages/NotFound';

import Index from './pages/Index';
import createPage from './pages/Page';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={Site}>
      <IndexRoute component={Index} />
      <Route path="about.html" component={createPage('/about.md')}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
