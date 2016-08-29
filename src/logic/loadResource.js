/**
 * Created by Yun on 2016-08-28.
 */

import URI from 'urijs';

const resourceCache = window.resources || {};
const fetching = {};

for (var k in resourceCache) {
  fetching[k] = Promise.resolve(resourceCache[k]);
}

export function getResource(key) {
  if (resourceCache[key] === undefined) {
    throw new Error('getResource() called before requestResource!');
  }
  return resourceCache[key];
}

export async function requestResource(key) {
  try {
    const resp = await fetch(URI.joinPaths('/assets', key).toString());
    if (resp.status !== 200) {
      throw new Error('Network error.');
    }
    const text = resourceCache[key] = await resp.text();
    return text;
  } catch (err) {
    // When request error occured, request again next time.
    delete fetching[key];
  }
}

export function loadResource(key){
  if (fetching[key]) {
    return;
  }

  fetching[key] = requestResource(key);
  return fetching[key];
}