/**
 * Created by sunnylqm on 2016-03-07.
 */

const VIDEOS_LOADED = 'reactnative.cn/videos/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === VIDEOS_LOADED) {
    return action.videos;
  }
  return state;
}

export function videosLoaded(videos) {
  return {
    type: VIDEOS_LOADED,
    videos,
  };
}
