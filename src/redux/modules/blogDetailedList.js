/**
 * Created by sunnylqm on 2016-01-10.
 */

const BLOG_DETAILED_LIST_LOADED = 'reactnative.cn/blog/detailedlistloaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BLOG_DETAILED_LIST_LOADED:
      return action.data;
    default:
      return state;
  }
}

export function blogDetailedListLoaded(data) {
  return {
    type: BLOG_DETAILED_LIST_LOADED,
    data,
  };
}
