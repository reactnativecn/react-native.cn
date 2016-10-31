/**
 * Created by sunny on 30/10/2016.
 */

import { EventEmitter } from 'fbemitter';

const event = new EventEmitter;
const emit = event.emit.bind(event);

let s = __CLIENT__ && window.localStorage;
try {
  s.setItem('test', '');
} catch(e) {
  s = null;
}

const noop = () => {};

const save = s ? (key, value) => {
  s.setItem(key, JSON.stringify(value));
} : noop;

const load = s ? (key) => {
  return JSON.parse(s.getItem(key));
} : noop;

class ViewRecords {
  event = event;
  videos = load('viewedvideos') || { viewed: [], left: true };
  blogs = load('viewedblogs') ||  { viewed: [], left: true };
  getSet = (key) => new Set(this[key].viewed);
  add = (key, value, left) => {
    const records = this[key];
    records.viewed.push(value);
    records.left = left;
    emit('update', this);
    save(`viewed${key}`, records);
  };
}
export default new ViewRecords();
