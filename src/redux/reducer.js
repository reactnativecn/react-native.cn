/**
 * Created by Yun on 2015-11-28.
 */
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
// import { routeReducer } from 'react-router-redux'

import fetchDataReducer from './modules/fetchData';
import contentReducer from './modules/content';
import casesReducer from './modules/cases';
import blogReducer from './modules/blog';
import linksReducer from './modules/links';
import docIndexReducer from './modules/docIndex.js';

export default combineReducers({
  router: routerStateReducer,
  // router: routeReducer,
  fetchData: fetchDataReducer,
  content: contentReducer,
  cases: casesReducer,
  blog: blogReducer,
  links: linksReducer,
  docIndex: docIndexReducer,
});
