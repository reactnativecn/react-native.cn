/**
 * Created by sunnylqm on 2016-01-10.
 */

const BLOG_LOADED = 'reactnative.cn/blog/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === BLOG_LOADED) {
    return action.blog;
  }
  return state;
}

export function blogLoaded(blog) {
  return {
    type: BLOG_LOADED,
    blog,
  };
}
