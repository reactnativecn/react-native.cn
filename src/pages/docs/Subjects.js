/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';

import { Link } from 'react-router';

import './docs.less';

export default class Subjects extends React.Component {
  static propTypes = {
    docIndex: React.PropTypes.object,
    version: React.PropTypes.string,
  };

  onAdClicked = () => {
    if (!__DEV__) {
      ga('send', 'event', 'ad', 'clicked', 'dongfangyao')
    }
  };

  render() {
    const indexes = this.props.docIndex.contains;

    return (
      <ul>
        {indexes.map(v => (
          <li className="apiGroup" key={v.group}>
            {v.group}
            <ul className="apiSub">
              {v.contains.map(u => (
                <li key={u.external || u.mdlink}>
                  <Link
                    activeClassName="active"
                    to={{
                      pathname: u.external || `/docs/${this.props.version}/${u.mdlink}.html`,
                      hash: '#content',
                    }}
                    target={u.external && '_blank'}
                  >
                    {u.subject}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {/*<li className="apiGroup proGroup" key="pro">*/}
          {/*推广资源*/}
          {/*<ul className="apiSub proSub">*/}
            {/*<li>*/}
              {/*<a*/}
                {/*href="http://mp.weixin.qq.com/s?__biz=MjM5NzI5MTIyNA==&mid=501650335&idx=1&sn=d2196fc8e8393d68643cccb94a72545b&chksm=3ece062809b98f3e6ef41cf13e0fd5ed6548b28d9b0c091e1559ec9f6f46e34800bb1489bfdf&scene=18#wechat_redirect"*/}
                {/*onClick={this.onAdClicked}*/}
              {/*>东方耀系列视频教程</a>*/}
            {/*</li>*/}
          {/*</ul>*/}
        {/*</li>*/}
      </ul>
    );
  }
}
