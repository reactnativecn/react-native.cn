/**
 * Created by Yun on 2015-12-04.
 */

import { FETCH_DATA_STARTED } from './fetchData.js';

const CONTENT_LOADED = 'reactnative.cn/content/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === FETCH_DATA_STARTED) {
    // Clear content after router change.
    return null;
  } else if (action.type === CONTENT_LOADED) {
    return action.content;
  }
  return state;
}

export function contentLoaded(content) {
  return {
    type: CONTENT_LOADED,
    content,
  };
}
