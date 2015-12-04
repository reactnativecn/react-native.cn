/**
 * Created by Yun on 2015-12-04.
 */

const FETCH_DATA_STARTED = 'react-native.cn/fetchDataStarted';
const FETCH_DATA_ENDED = 'react-native.cn/fetchDataEnded';

export default function reducer(state = null, action = {}) {
  if (action.type === FETCH_DATA_STARTED) {
    return action.promise;
  } else if (action.type === FETCH_DATA_ENDED) {
    return null;
  }
  return state;
}

export function startFetchData(promise) {
  return {
    type: FETCH_DATA_STARTED,
    promise: promise,
  };
}

export function fetchDataOver() {
  return {
    type: FETCH_DATA_ENDED,
  };
}
