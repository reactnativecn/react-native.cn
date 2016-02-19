/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';
import './Site.less';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import MyNavBar from '../components/MyNavBar';
import MyFooter from '../components/MyFooter.js';

export default class Site extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };
  //static childContextTypes = {
  //  location: React.PropTypes.object
  //};
  //getChildContext() {
  //  return { location: this.props.location }
  //}

  render() {
    return (<div>
      <DocumentMeta {...config.app}/>
      <MyNavBar params={this.props.params} />
      {this.props.children}
      <MyFooter />
    </div>);
  }
}
