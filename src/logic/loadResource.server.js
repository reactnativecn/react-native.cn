/**
 * Created by Yun on 2016-08-28.
 */

import * as fs from 'fs';
import * as path from 'path';

const resourceCache = {};

export function getResource(key) {
  return resourceCache[key];
}

export function loadResource(key){
  const m = /^\/(\w+)(\/.*)$/.exec(key);
  if (resourceCache[key] === undefined) {
    if (!m) {
      throw new Error(`Cannot get resource ${key}`);
    }
    if (m[1] === 'static') {
      const data = fs.readFileSync(path.join(__dirname, '../../docs', m[2]), 'utf-8');
      resourceCache[key] = data;
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
