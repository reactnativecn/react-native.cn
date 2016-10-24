/**
 * Created by tdzl2003 on 8/10/16.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import './index.less';
import routes from './pages';

if (!__DEV__) {
  /*eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63485149-4', 'auto');
  ga('send', 'pageview');
}

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
    <Router routes={routes} history={browserHistory} onUpdate={()=>{
      if (!__DEV__){
        ga('send', 'pageview');
      }
    }} />,
    dest
  );
}

if (document.readyState !== 'loading') {
  render();
} else {
  document.addEventListener('DOMContentLoaded', render);
}
