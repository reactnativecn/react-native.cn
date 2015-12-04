/**
 * Created by Yun on 2015-12-04.
 */

const INDEX_LOADED = 'react-native.cn/docIndex/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === INDEX_LOADED) {
    return action.content;
  }
  return state;
}

export function indexLoaded(content) {
  return {
    type: INDEX_LOADED,
    content: content,
  };
}
