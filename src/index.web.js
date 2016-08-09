/**
 * Created by tdzl2003 on 8/10/16.
 */

import 'bootstrap/less/bootstrap.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import routes from './pages';


function render() {
  ReactDOM.render(<Router routes={routes} history={browserHistory} />, document.getElementById('content'));
}

if (document.readyState !== 'loading') {
  render();
} else {
  document.addEventListener('DOMContentLoaded', render);
}
