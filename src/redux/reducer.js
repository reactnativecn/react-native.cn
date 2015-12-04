/**
 * Created by Yun on 2015-11-28.
 */
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import fetchData from './modules/fetchData';

export default combineReducers({
  router: routerStateReducer,
  fetchData: fetchData,
});
