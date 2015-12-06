/**
 * Created by tdzl2_000 on 2015-12-04.
 */

import {contentLoaded} from '../redux/modules/content';

const rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://react-native.cn';

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
