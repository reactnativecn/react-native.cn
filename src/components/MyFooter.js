/**
 * Created by Yun on 2015-10-21.
 */
import React from 'react';

export default class MyFooter extends React.Component {
  render() {
    return (
      <footer className="wrap">
        <div className="container">
          <div className="right">
            <p>React Native中文网.</p>
            <p>© 2015 杭州欧石南网络科技有限公司</p>
            <p className="gray">浙ICP备15023664号-3</p>
          </div>
        </div>
      </footer>
    );
  }
}
