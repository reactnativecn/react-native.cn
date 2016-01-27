/**
 * Created by sunny on 1/26/16.
 */
import storage from './storage';

const rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://reactnative.cn';

export function fetchStatic(url) {
  return fetch(__SERVER__ ? (rootUrl + '/static' + url) : ('/static' + url));
}

export function fetchStaticText(url) {
  return fetchStatic(url).then(resp=>resp.text());
}

export function fetchStaticJson(url) {
  return fetchStatic(url).then(resp=>resp.json());
}

const bbsRootUrl = __SERVER__ ? 'http://bbs.reactnative.cn' : '/bbs';

export default {
  blogList(params) {
    const { resolve, reject } = params;
    fetch(`${bbsRootUrl}/api/category/3/blogs`)
      .then(response => response.json())
      .then(data => {
        storage.save({
          key: 'blogList',
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
        console.warn(error);
        reject && reject();
    });
  },
  blog(params) {
    const { id, resolve, reject } = params;
    const [ tid, title ] = id.split('/');
    fetch(`${bbsRootUrl}/api/topic/${tid}/${encodeURIComponent(title)}`)
      .then(response => response.json())
      .then(data => {
        storage.save({
          key: 'blog',
          id,
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
        console.warn(error);
        reject && reject();
    });
  },
  pageContent(params) {
    const { id, resolve, reject } = params;
    fetchStaticText(`/${id}.md`)
      .then(data => {
        storage.save({
          key: 'pageContent',
          id,
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
      console.warn(error);
      reject && reject();
    });
  },
  docContent(params) {
    const { id, resolve, reject } = params;
    fetchStaticText(`/${id}.md`)
      .then(data => {
        storage.save({
          key: 'docContent',
          id,
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
      console.warn(error);
      reject && reject();
    });
  },
  docIndex(params) {
    const { resolve, reject } = params;
    fetchStaticJson('/docs/indexes.json')
      .then(data => {
        storage.save({
          key: 'docIndex',
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
      console.warn(error);
      reject && reject();
    });
  },
  cases(params) {
    const { resolve, reject } = params;
    fetchStaticJson('/cases/cases.json')
      .then(data => {
        storage.save({
          key: 'cases',
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
      console.warn(error);
      reject && reject();
    });
  },
  links(params) {
    const { resolve, reject } = params;
    fetchStaticJson('/links/links.json')
      .then(data => {
        storage.save({
          key: 'links',
          rawData: data,
        });
        resolve && resolve(data);
      }).catch(error => {
      console.warn(error);
      reject && reject();
    });
  },

};
