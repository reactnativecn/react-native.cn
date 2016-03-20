/**
 * Created by Yun on 2015-12-04.
 */

export const FETCH_DATA_STARTED = 'reactnative.cn/fetchData/started';
const FETCH_DATA_ENDED = 'reactnative.cn/fetchData/ended';
const FETCH_DATA_FAILED = 'reactnative.cn/fetchData/failed';

export default function reducer(state = null, action = {}) {
  if (action.type === FETCH_DATA_STARTED) {
    return action.promise;
  } else if (action.type === FETCH_DATA_ENDED) {
    return null;
  } else if (action.type === FETCH_DATA_FAILED) {
    return { err: action.err };
  }
  return state;
}

export function startFetchData(promise) {
  return {
    type: FETCH_DATA_STARTED,
    promise,
  };
}

export function fetchDataOver() {
  return {
    type: FETCH_DATA_ENDED,
  };
}

export function fetchDataFailed(err) {
  return {
    type: FETCH_DATA_FAILED,
    // err: err.message,
  };
}
