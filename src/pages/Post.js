/**
 * Created by sunny on 3/19/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import { postLoaded } from '../redux/modules/post';
import storage from '../storage/storage';
import './Post.styl';

class Post extends React.Component {
  static propTypes = {
    post: React.PropTypes.object,
  };

  static fetchData(getState, dispatch, location) {
    const id = decodeURIComponent(location.pathname.replace(/\/post\//, ''));
    return storage.load({
      key: 'post',
      id,
    }).then(data => dispatch(postLoaded(data)));
  }

  componentDidMount() {
    const { location } = this.props;
    setTimeout(() => {
      this.renderDuoshuo(this.refs.duoshuo, location.pathname);
    }, 1000); // why?
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (location.pathname !== this.threadKey) {
      this.renderDuoshuo(this.refs.duoshuo, location.pathname);
    }
  }

  renderDuoshuo = (container, tkey) => {
    const { location } = this.props;
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', tkey);
    el.setAttribute('data-author-key', '325758');
    DUOSHUO.EmbedThread(el);
    container.innerHTML = '';
    container.appendChild(el);
    this.threadKey = tkey;
  };


  parseBlogBody = (rawBody, link) => {
    const parsedText = rawBody.replace(/\/uploads\/file/g, `${config.bbs}/uploads/file`);
    return `${parsedText}<a href="${link}" class="more">[去论坛发表意见]</a>`;
  };

  // componentDidMount() {
  //   DUOSHUO.EmbedThread(this.refs.duoshuo);
  // }

  render() {
    const { post, location } = this.props;
    const body = post.posts[0];
    return (
      <div>
        <DocumentMeta {...config.app} title={`${post.title} - react native 中文网`} />
        <Container type="post">
          <div className="post-list-item" key={body.tid}>
            <div className="post-header">
              <a
                className="post-title"
                target="_blank"
                href={`${config.bbs}/topic/${body.tid}`}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <div className="meta">
                { body.timestampISO.split('T')[0] }
                {' by '}
                <a
                  target="_blank"
                  href={`${config.bbs}/user/${body.user.username}`}
                >
                  {body.user.username}
                </a>
              </div>
            </div>
            <div
              className="post"
              dangerouslySetInnerHTML={{
                __html: this.parseBlogBody(body.content, `${config.bbs}/topic/${post.tid}`),
              }}
            />
          </div>
          <div ref="duoshuo"></div>
        </Container>
      </div>
    );
  }
}
export default connect(state => ({
  post: state.post,
}))(Post);
