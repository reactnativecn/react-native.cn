/**
 * Created by Yun on 2015-11-28.
 */
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
// import { routeReducer } from 'react-router-redux'

import fetchDataReducer from './modules/fetchData';
import contentReducer from './modules/content';
import casesReducer from './modules/cases';
import blogBasicList from './modules/blogBasicList';
import blogDetailedList from './modules/blogDetailedList';
import postReducer from './modules/post';
import newsBasicList from './modules/newsBasicList';
import videosReducer from './modules/videos';
import linksReducer from './modules/links';
import docIndexReducer from './modules/docIndex.js';

export default combineReducers({
  router: routerStateReducer,
  // router: routeReducer,
  fetchData: fetchDataReducer,
  content: contentReducer,
  cases: casesReducer,
  blogBasicList,
  blogDetailedList,
  newsBasicList,
  post: postReducer,
  videos: videosReducer,
  links: linksReducer,
  docIndex: docIndexReducer,
});
