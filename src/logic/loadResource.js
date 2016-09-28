/**
 * Created by Yun on 2016-08-28.
 */

import URI from 'urijs';

const resourceCache = {};
const fetching = {};

for (var k in window.resources) {
  // resourceCache[k] = { content: window.resources[k] };
  resourceCache[k] = window.resources[k];
  fetching[k] = Promise.resolve(window.resources[k]);
}

export function getResource(key) {
  if (resourceCache[key] === undefined) {
    throw new Error('getResource() called before requestResource!');
  }
  const ret = resourceCache[key];
  // if (ret.err) {
  //   throw ret.err;
  // }
  if(typeof(ret) !== 'string') {
    throw ret;
  }
  return ret;
}

export class RequestError extends Error {
  constructor(code) {
    super(`RequestError ${code}`);
    this.code = code;
  }
}

export async function requestResource(key) {
  try {
    const resp = await fetch(key);
    if (resp.status !== 200) {
      throw new RequestError(resp.status);
    }
    const content = await resp.text();
    return (resourceCache[key] = content);
  } catch (err) {
    // When request error occured, request again next time.
    delete fetching[key];

    resourceCache[key] = err;
  }
}

export function loadResource(key){
  if (resourceCache[key]) {
    // return Promise.resolve(resourceCache[key]);
    return resourceCache[key];
  }
  if (fetching[key]) {
    return fetching[key];
  }

  fetching[key] = requestResource(key);
  return fetching[key];
}

export function loadResources(resource) {
  const jobs = [];
  for (const k of resource) {
    const v = loadResource(k);
    if (v && typeof v.then === 'function') {
      jobs.push(v);
    } else {
      // loadResource(k);
    }
  }
  if (jobs.length > 0) {
    return Promise.all(jobs).then(() => undefined);
  }
}
