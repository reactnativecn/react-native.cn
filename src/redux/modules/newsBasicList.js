/**
 * Created by sunnylqm on 2016-03-19.
 */

const NEWS_BASIC_LIST_LOADED = 'reactnative.cn/news/basiclistloaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEWS_BASIC_LIST_LOADED:
      return action.newsBasicList;
    default:
      return state;
  }
}

export function newsBasicListLoaded(newsBasicList) {
  return {
    type: NEWS_BASIC_LIST_LOADED,
    newsBasicList,
  };
}
