/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';

import styles from './Site.less';

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
      {this.props.children}
      <footer className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.right}>
            <p>© 2015 React Native中文网.</p>
            <p className={styles.gray}>浙ICP备15023664号-3</p>
          </div>
        </div>
      </footer>
    </div>);
  }
}
