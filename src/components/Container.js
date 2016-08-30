/**
 * Created by Yun on 2015-10-21.
 */
import React from 'react';
import classnames from 'classnames';
import './Container.less';

export default class Container extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    type: React.PropTypes.string,
  };
  render() {
    // eslint-disable-next-line no-use-before-define
    const { children, type, ...props } = this.props;
    const classNames = { container: true };
    if (type) {
      classNames[`container-${type}`] = true;
    }
    return (
      <div className={classnames(classNames)} {...props}>
        {children}
      </div>
    );
  }
}
