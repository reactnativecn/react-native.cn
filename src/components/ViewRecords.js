/**
 * Created by sunny on 30/10/2016.
 */

import { EventEmitter } from 'fbemitter';
import { loadResource } from '../logic/loadResource';
import CONSTANTS from '../constants';

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
  updateVideosLeft = async () => {
    const ret = loadResource(`${CONSTANTS.youkuUrl}`);
    if (ret && ret.then) {
      ret.then(resp => {
        const left = this.checkLeft('videos', JSON.parse(resp).videos);
        this.add('videos', undefined, left);
      });
    } else {
      const left = this.checkLeft('videos', JSON.parse(ret).videos);
      this.add('videos', undefined, left);
    }
  };
  checkLeft = (key, data) => {
    // const { videos } = JSON.parse(data);
    const viewed = this.getSet(key);
    // const left = videos.length - viewed.size - 1;
    const left = data.filter(item => !viewed.has(item.id)).length;
    console.log(`${key} left: ${left}`);
    return left;
  };
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
