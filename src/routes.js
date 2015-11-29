/**
 * Created by Yun on 2015-11-29.
 */

import React from 'react';
import {Route} from 'react-router';

import Site from './pages/Site.js';
import NotFound from './pages/NotFound.js';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={Site}>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
