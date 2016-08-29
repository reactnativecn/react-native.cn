/**
 * Created by Yun on 2016-08-28.
 */

import * as fs from 'fs';
import * as path from 'path';

const resourceCache = {};

export function getResource(key) {
  if (resourceCache[key] === undefined) {
    const data = fs.readFileSync(path.join(__dirname, '../../docs', key), 'utf-8');
    resourceCache[key] = data;
  }
  return resourceCache[key];
}

export function loadResource(key) {
  return Promise.resolve(getResource(key));
}