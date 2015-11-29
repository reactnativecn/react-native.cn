/**
 * Created by Yun on 2015-10-21.
 */
import React from 'react';
import classnames from 'classnames';
import styles from './Container.less';

export default class Container extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    type: React.PropTypes.string,
  }
  render() {
    const {children, type, ...props} = this.props;
    const classNames = {[styles.container]: true};
    if (type) {
      classNames[styles['container-' + type]] = true;
    }
    return (
      <div className={classnames(classNames)} {...props}>
        {children}
      </div>
    );
  }
}
