/**
 * Created by Yun on 2015-11-28.
 */

module.exports = Object.assign({
  app: {
    title: 'React Native 中文网',
    description: `React Native中文网是中国最大的React Native开发者交流学习平台,致力于打造React Native开发。
    在这里能轻松找到代码实例,项目案例,并有专人提供最新文档翻译。`,
    meta: {
      charSet: 'utf-8',
      property: {
        keywords: `react native,react native中文网,
        react native ios,react native android,react native教程`,
        'og:site_name': 'React Native 中文网',
        'og:image': 'https://reactnative.cn/assets/img/opengraph.png',
        'og:locale': 'zh_CN',
        'og:title': 'React Native 中文网',
        'og:description': `React Native中文网是中国最大的React Native开发者交流学习平台,
        致力于打造React Native开发。在这里能轻松找到代码实例,项目案例,并有专人提供最新文档翻译。`,
      },
      name: {
        keywords: `react native,react native中文网,
        react native ios,react native android,react native教程`,
        description: `React Native中文网是中国最大的React Native开发者交流学习平台,
        致力于打造React Native开发。在这里能轻松找到代码实例,项目案例,并有专人提供最新文档翻译。`,
      },
    },
  },
  host: 'http://reactnative.cn',
  bbs: 'http://bbs.reactnative.cn',
  rootUrl: __DEV__ ? 'http://localhost:3000' : 'http://reactnative.cn',
  bbsRootUrl: __SERVER__ ? 'http://bbs.reactnative.cn' : '/proxy/bbs',
  youkuUrl: __SERVER__ ?
    'https://openapi.youku.com/v2/videos/by_user.json?' : '/proxy/videos/by_user.json?',
  clientid: '3f4eca228da38d9e',
}, __OPTIONS__);
