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
    const resp = await fetch(key);
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
  if (resourceCache[key]) {
    return resourceCache[key];
  }
  if (fetching[key]) {
    return fetching[key];
  }

  fetching[key] = requestResource(key);
  return fetching[key];
}

export function loadResources(resource) {
  const ret = {};
  const jobs = [];
  for (const k of resource) {
    const v = loadResource(k);
    if (v && typeof(v.then) === 'function') {
      jobs.push(v.then(v=>{
        ret[k] = v;
      }));
    } else {
      ret[k] = loadResource(k);
    }
  }
  if (jobs.length > 0) {
    return Promise.all(jobs).then(()=>ret);
  }
  return ret;
}
