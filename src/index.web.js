/**
 * Created by tdzl2003 on 8/10/16.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import 'bootstrap/less/bootstrap.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import routes from './pages';

function render() {
  const dest = document.getElementById('content');

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest ||
      (dest.firstChild &&
      (!dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']))) {
      console.error(`Server-side React render was discarded.
    Make sure that your initial render does not contain any client-side code.`);
    }
  }

  ReactDOM.render(
    <Router routes={routes} history={browserHistory} />,
    dest
  );
}

if (document.readyState !== 'loading') {
  render();
} else {
  document.addEventListener('DOMContentLoaded', render);
}
