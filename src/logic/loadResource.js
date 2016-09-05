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

export async function requestResource(key, method = 'text') {
  try {
    const resp = await fetch(key);
    if (resp.status !== 200) {
      throw new Error('Network error.');
    }
    const ret = resourceCache[key] = await resp[method]();
    return ret;
  } catch (err) {
    // When request error occured, request again next time.
    delete fetching[key];
  }
}

export function loadResource(key, method = 'text'){
  if (resourceCache[key]) {
    return resourceCache[key];
  }
  if (fetching[key]) {
    return fetching[key];
  }

  fetching[key] = requestResource(key, method);
  return fetching[key];
}

export function loadResources(resource, method = 'text') {
  const ret = {};
  const jobs = [];
  for (const k of resource) {
    const v = loadResource(k, method);
    if (v && typeof(v.then) === 'function') {
      jobs.push(v.then(v=>{
        ret[k] = v;
      }));
    } else {
      ret[k] = loadResource(k, method);
    }
  }
  if (jobs.length > 0) {
    return Promise.all(jobs).then(()=>ret);
  }
  return ret;
}
