/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
// import { fetchStaticLinks } from '../helpers/fetchStatic';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import { linksLoaded } from '../redux/modules/links';
import storage from '../storage/storage';
import './FriendLink.styl';

class FriendLink extends React.Component {
  static propTypes = {
    links: React.PropTypes.object,
  };

  static fetchData(getState, dispatch) {
    //  return fetchStaticLinks('/links/links.json', getState, dispatch);
    if (getState().links) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'links',
    }).then(data => dispatch(linksLoaded(data)));
  }
  render() {
    const { links } = this.props;
    return (
      <div>
        <DocumentMeta {...config.app} title="友情链接 - react native 中文网" />
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
      </div>
    );
  }
}
export default connect(state => ({
  links: state.links,
}))(FriendLink);
