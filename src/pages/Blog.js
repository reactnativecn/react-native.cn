/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import {blogLoaded} from '../redux/modules/blog';
import storage from '../storage/storage';
import './Blog.styl';

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
    }).then( blogList =>
        storage.getBatchData( blogList.topics.map( t => ({ key: 'blog', id: t.slug }) ) )
    ).then( data => dispatch(blogLoaded(data)));
  }

  render() {
    const { blog } = this.props;
    return (
      <div>
        <DocumentMeta {...config.app} title="React Native博客 - react native 中文网" />
        <Container type="blog">
          <div className="blog-list">
            <h3>最近的博客文章</h3>
            <ul>
              {
                blog.map( (t, i) =>
                  <li key={i}>
                    <a target="_blank" href={`${config.bbs}/topic/${t.tid}`} className={t.pinned && 'pinned'}
                    dangerouslySetInnerHTML={{__html: t.title}} />
                  </li>
                )
              }
              <li><a href={`${config.bbs}/category/3/blogs`} target="_blank">查看全部 ...</a></li>
            </ul>
          </div>
          <div className="inner-content">
            {
              blog.map( topic => {
                const post = topic.posts[0];
                return (
                  <div className="post-list-item">
                    <h1>
                      <a target="_blank" href={`${config.bbs}/topic/${post.tid}`} dangerouslySetInnerHTML={{__html: topic.title}} />
                    </h1>
                    <p className="meta">
                      { post.relativeTime.split('T')[0] }
                      {' by '}
                      <a href={`${config.bbs}/user/${post.user.username}`} target="_blank">{post.user.username}</a>
                    </p>
                    <hr />
                    <div className="post" dangerouslySetInnerHTML={{__html: post.content}} />
                  </div>
                )
              })
            }
            <div className="pagination">
              <a href={`${config.bbs}/category/3/blogs`} target="_blank">查看全部 ...</a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default connect(state=>({
  blog: state.blog,
}))(Blog);
