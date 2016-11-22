/**
 * Created by sunny on 30/10/2016.
 */

import { EventEmitter } from 'fbemitter';
import { loadResource } from '../logic/loadResource';

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
  constructor() {
    if (s) {
      loadResource(`${CONSTANTS.youkuUrl}`)
        .then(resp => {
          const { videos } = JSON.parse(resp);
          const viewed = this.getSet('videos');
          // const left = videos.length - viewed.size - 1;
          const left = videos.filter(v => !viewed.has(v.id)).length;
          this.add('videos', undefined, left);
        })
    }
  }
  event = event;
  videos = load('viewedvideos') || { viewed: [], left: true };
  blogs = load('viewedblogs') ||  { viewed: [], left: true };
  getSet = (key) => new Set(this[key].viewed);
  add = (key, value, left) => {
    const records = this[key];
    if (value !== undefined) {
      records.viewed.push(value);
    }
    if (left !== undefined) {
      records.left = left;
    }
    emit('update', this);
    save(`viewed${key}`, records);
  };
}
export default new ViewRecords();
