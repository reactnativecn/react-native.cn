/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';
import './Site.less';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import MyNavBar from '../components/MyNavBar';

export default class Site extends React.Component
{
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  }
  render() {
    return (<div>
      <DocumentMeta {...config.app}/>
      <MyNavBar />
      {this.props.children}
      <footer className="wrap">
        <div className="container">
          <div className="right">
            <p>© 2015 React Native中文网.</p>
            <p className="gray">浙ICP备15023664号-3</p>
          </div>
        </div>
      </footer>
    </div>);
  }
}
