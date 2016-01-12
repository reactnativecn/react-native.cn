/**
 * Created by sunnylqm on 2016-01-10.
 */

const LINKS_LOADED = 'reactnative.cn/links/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === LINKS_LOADED) {
    return action.links;
  }
  return state;
}

export function linksLoaded(links) {
  return {
    type: LINKS_LOADED,
    links,
  };
}
