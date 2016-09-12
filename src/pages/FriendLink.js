/**
 * Created by sunnylqm on 2016/9/12.
 */

import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';

import Container from '../components/Container';
import './FriendLink.styl';
import { loadResources, getResource } from '../logic/loadResource';

export default class FriendLink extends Component {
  // static propTypes = {
  //   location: PropTypes.object,
  //   routes: PropTypes.array,
  // };

  static fetchData() {
    return loadResources([
      '/static/links/links.json',
    ]);
  }
  state = {};

  componentWillMount() {
    this.setState({
      links: JSON.parse(getResource('/static/links/links.json')),
    });
  }
  render() {
    const { links } = this.state;

    return (
      <Container type="friendlink">
        <h1>友情链接</h1>
        <p className="introduce">
          如有朋友需要交换链接，请在讨论区中私信<a href="http://bbs.reactnative.cn/user/sunnylqm">管理员</a>。
        </p>
        <div className="links">
          {
            links.more.map((l, i) =>
              <a key={i} href={l.href}>
                {l.text}
              </a>
            )
          }
        </div>
      </Container>
    );
  }
}
