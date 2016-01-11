/**
 * Created by tdzl2_000 on 2015-12-04.
 *
 * 2016-01-10 add casesLoaded by sunnylqm
 */

import {contentLoaded} from '../redux/modules/content';
import {casesLoaded} from '../redux/modules/cases';

const rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://reactnative.cn';

export function fetchStatic(url) {
  return fetch(__SERVER__ ? (rootUrl + '/static' + url) : ('/static' + url));
}

export function fetchStaticText(url) {
  return fetchStatic(url).then(resp=>resp.text());
}

export function fetchStaticJson(url) {
  return fetchStatic(url).then(resp=>resp.json());
}

export function fetchStaticContent(url, getState, dispatch) {
  const state = getState();
  if (state.content) {
    return Promise.resolve();
  }
  return fetchStaticText(url).then(data=>dispatch(contentLoaded(data)));
}

export function fetchStaticCases(url, getState, dispatch) {
  const state = getState();
  if (state.cases) {
    return Promise.resolve();
  }
  return fetchStaticJson(url).then(data=>dispatch(casesLoaded(data)));
}
