/**
 * Created by sunnylqm on 2016-01-10.
 */

const BLOG_BASIC_LIST_LOADED = 'reactnative.cn/blog/basiclistloaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BLOG_BASIC_LIST_LOADED:
      return action.data;
    default:
      return state;
  }
}

export function blogBasicListLoaded(data) {
  return {
    type: BLOG_BASIC_LIST_LOADED,
    data,
  };
}
