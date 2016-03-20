/**
 * Created by sunnylqm on 2016-03-19.
 */

const POST_LOADED = 'reactnative.cn/post/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === POST_LOADED) {
    return action.post;
  }
  return state;
}

export function postLoaded(post) {
  return {
    type: POST_LOADED,
    post,
  };
}
