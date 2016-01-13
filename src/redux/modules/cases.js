/**
 * Created by sunnylqm on 2016-01-10.
 */

const CASES_LOADED = 'reactnative.cn/cases/loaded';

const initialState = null;

export default function reducer(state = initialState, action = {}) {
  if (action.type === CASES_LOADED) {
    return action.cases;
  }
  return state;
}

export function casesLoaded(cases) {
  return {
    type: CASES_LOADED,
    cases,
  };
}
