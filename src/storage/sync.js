/**
 * Created by sunny on 1/26/16.
 */
import storage from './storage';

const rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://reactnative.cn';

export function fetchStatic(url) {
  return fetch(__SERVER__ ? `${rootUrl}/static${url}` : `/static${url}`);
}

export function fetchStaticText(url) {
  return fetchStatic(url).then(resp => resp.text());
}

export function fetchStaticJson(url) {
  return fetchStatic(url).then(resp => resp.json());
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
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
  blog(params) {
    const { id, resolve, reject } = params;
    const [tid, title] = id.split('/');
    fetch(`${bbsRootUrl}/api/topic/${tid}/${encodeURIComponent(title)}`)
      .then(response => response.json())
      .then(data => {
        storage.save({
          key: 'blog',
          id,
          rawData: data,
        });
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
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
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
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
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
  docIndex(params) {
    const { id, resolve, reject } = params;
    fetchStaticJson(`/docs/${id}/indexes.json`)
      .then(data => {
        storage.save({
          key: 'docIndex',
          id,
          rawData: data,
        });
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
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
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
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
        if (resolve) resolve(data);
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
};
