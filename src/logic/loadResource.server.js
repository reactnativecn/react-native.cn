/**
 * Created by Yun on 2016-08-28.
 */

import * as fs from 'fs';
import * as path from 'path';

const resourceCache = {};

export function getResource(key) {
  return resourceCache[key];
}

export class RequestError extends Error {
  constructor(code) {
    super(`RequestError ${code}`);
    this.code = code;
  }
}

export function loadResource(key){
  const m = /^\/(\w+)(\/.*)$/.exec(key);
  if (resourceCache[key] === undefined) {
    if (!m) {
      throw new Error(`Cannot get resource ${key}`);
    }
    if (m[1] === 'static') {
      const fn = path.join(__dirname, '../../docs', m[2]);
      if (!fs.existsSync(fn)) {
        return Promise.reject(new RequestError(404));
      }
      const data = fs.readFileSync(fn, 'utf-8');
      resourceCache[key] = data;
    } else {
      return Promise.reject(new RequestError(404));
    }
  }
  return resourceCache[key];
};

export async function loadResources(resource) {
  const ret = {};
  for (const k of resource) {
    ret[k] = await loadResource(k);
  }
  return ret;
}
