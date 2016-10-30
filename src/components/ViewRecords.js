/**
 * Created by sunny on 30/10/2016.
 */

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
  videos = load('viewedvideos') || [];
  blogs = load('viewedblogs') || [];
  getSet = (key) => new Set(this[key]);
  add = (key, value) => {
    const records = this[key];
    records.push(value);
    save(`viewed${key}`, records);
  };
}
export default new ViewRecords();
