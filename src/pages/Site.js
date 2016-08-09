/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';
import DocumentMeta from 'react-document-meta';
import { NavBar, Footer } from '../components';

import './Site.less';

const metaInfo = {
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
};

export default function Site(props) {
  const { params, children } = props;
  return (<div>
    <DocumentMeta {...metaInfo} />
    <NavBar params={params} />
    {children}
    <Footer />
  </div>);
}

Site.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
