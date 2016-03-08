/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import { blogLoaded } from '../redux/modules/blog';
import storage from '../storage/storage';
import './Blog.styl';
import options from '../options';

class Blog extends React.Component {
  static propTypes = {
    blog: React.PropTypes.array,
  };

  static fetchData(getState, dispatch) {
    if (getState().blog) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'blogList',
    }).then(blogList =>
      storage.getBatchData(blogList.topics.map(t => ({ key: 'blog', id: t.slug })))
    ).then(data => dispatch(blogLoaded(data)));
  }
  parseBlogBody = (rawBody, link) => {
    const endFlag = /<hr \/>([\s\S]*?)<hr \/>/;
    let parsedText = endFlag.exec(rawBody);
    parsedText = parsedText ? parsedText[1] : rawBody;
    parsedText = parsedText.replace(/\/uploads\/file/g, `${options.bbs}/uploads/file`);
    return `${parsedText}<a href="${link}" class="more">[阅读全文]</a>`;
  };
  render() {
    const { blog } = this.props;
    return (
      <div>
        <DocumentMeta {...config.app} title="React Native博客 - react native 中文网" />
        <Container type="blog">
          {
            blog.map(topic => {
              const post = topic.posts[0];
              return (
                <div className="post-list-item">
                  <div className="post-header">
                    <a
                      className="post-title"
                      target="_blank"
                      href={`${config.bbs}/topic/${post.tid}`}
                      dangerouslySetInnerHTML={{ __html: topic.title }}
                    />
                    <div className="meta">
                      { post.relativeTime.split('T')[0] }
                      {' by '}
                      <a
                        target="_blank"
                        href={`${config.bbs}/user/${post.user.username}`}
                      >
                        {post.user.username}
                      </a>
                    </div>
                  </div>
                  <div
                    className="post"
                    dangerouslySetInnerHTML={{
                      __html: this.parseBlogBody(post.content, `${config.bbs}/topic/${post.tid}`),
                    }}
                  />
                  <hr />
                </div>
              );
            })
          }
        </Container>
      </div>
    );
  }
}
export default connect(state => ({
  blog: state.blog,
}))(Blog);
