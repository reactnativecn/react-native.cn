/**
 * Created by Yun on 2015-11-29.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Site from './pages/Site.js';
import NotFound from './pages/NotFound.js';

import Index from './pages/Index.js';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={Site}>
      <IndexRoute component={Index} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
