/**
 * Created by sunny on 1/26/16.
 */
import storage from './storage';
import { bbsRootUrl, rootUrl, youkuUrl, clientid } from '../options';


export function fetchStatic(url) {
  return fetch(__SERVER__ ? `${rootUrl}/static${url}` : `/static${url}`);
}

export function fetchStaticText(url) {
  return fetchStatic(url).then(resp => resp.text());
}

export function fetchStaticJson(url) {
  return fetchStatic(url).then(resp => resp.json());
}

export default {
  blogList(params) {
    const { resolve, reject, query } = params;
    fetch(`${bbsRootUrl}/api/category/3${query || ''}`)
      .then(response => response.json())
      .then(data => {
        if (data.cid) {
          if (!query) {
            storage.save({
              key: 'blogList',
              rawData: data,
            });
          }
          if (resolve) resolve(data);
        }
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
  post(params) {
    const { id, resolve, reject } = params;
    // const [tid, title] = id.split('/');
    // fetch(`${bbsRootUrl}/api/topic/${tid}/${encodeURIComponent(title)}`)
    fetch(`${bbsRootUrl}/api/topic/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.tid) {
          storage.save({
            key: 'post',
            id,
            rawData: data,
          });
          if (resolve) resolve(data);
        }
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
  newsList(params) {
    const { resolve, reject, query } = params;
    fetch(`${bbsRootUrl}/api/category/1${query || ''}`)
      .then(response => response.json())
      .then(data => {
        if (data.cid) {
          if (!query) {
            storage.save({
              key: 'newsList',
              rawData: data,
            });
          }
          if (resolve) resolve(data);
        }
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
// APP KEY 3f4eca228da38d9e
// APP Secret 205373e09529572526bd0284019f69ea
  videos(params) {
    const { resolve, reject } = params;
    // https://openapi.youku.com/v2/videos/by_user.json?user_name=react-native&client_id=3f4eca228da38d9e
    fetch(`${youkuUrl}user_id=UMzM5ODI5MDA4MA==&client_id=${clientid}&count=100`)
      .then(responseData => responseData.json())
      .then(data => {
        if (data.count) {
          storage.save({
            key: 'videos',
            rawData: data,
          });
          if (resolve) resolve(data);
        }
      }).catch(error => {
        console.warn(error);
        if (reject) reject();
      });
  },
};
