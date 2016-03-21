/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import { blogDetailedListLoaded } from '../redux/modules/blogDetailedList';
import storage from '../storage/storage';
import './Blog.styl';

class Blog extends React.Component {
  static propTypes = {
    blogDetailedList: React.PropTypes.array,
  };
  static fetchData(getState, dispatch) {
    if (getState().blogDetailedList) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'blogList',
    }).then(blogList => storage.getBatchData(blogList.topics.map(t => ({ key: 'post', id: t.tid })))
    ).then(data => dispatch(blogDetailedListLoaded(data)));
  }
  constructor(props) {
    super(props);
    this.state = {
      appendList: [],
    };
    this.currentPage = 1;
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.fetchMore();
    }
  };
  parseBlogBody = (rawBody, link) => {
    const endFlag = /<hr \/>([\s\S]*?)<hr \/>/;
    let parsedText = endFlag.exec(rawBody);
    parsedText = parsedText ? parsedText[1] : rawBody;
    parsedText = parsedText.replace(/\/uploads\/file/g, `${config.bbs}/uploads/file`);
    return `${parsedText}<a href="${link}" class="more">[阅读全文]</a>`;
  };
  fetchMore = () => {
    if (this.fetching || this.fetchOver) {
      return;
    }
    this.fetching = true;
    storage.sync.blogList({
      query: `?page=${this.currentPage + 1}`,
      resolve: blogList => {
        if (blogList.topics) {
          const { currentPage, pageCount } = blogList.pagination;
          if (currentPage === pageCount) {
            this.fetchOver = true;
          }
          this.currentPage = currentPage;
          return storage.getBatchData(blogList.topics.map(t => ({ key: 'post', id: t.tid })))
          .then(blogs => {
            this.setState({
              appendList: this.state.appendList.concat(blogs),
            });
            this.fetching = false;
          });
        } else {
          this.fetchOver = true;
        }
      }
    });
    // fetch(`${config.bbsRootUrl}/api/category/3?page=${this.currentPage + 1}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.topics) {
    //       const { currentPage, pageCount } = data.pagination;
    //       if (currentPage === pageCount) {
    //         this.fetchOver = true;
    //       }
    //       this.currentPage = currentPage;
    //       this.setState({
    //         appendList: this.state.appendList.concat(data.topics),
    //       });
    //       this.fetching = false;
    //     } else {
    //       this.fetchOver = true;
    //     }
    //   });
  };
  render() {
    const { blogDetailedList } = this.props;
    let blogList = blogDetailedList.concat(this.state.appendList);
    return (
      <div>
        <DocumentMeta {...config.app} title="React Native博客 - react native 中文网" />
        <Container type="blog">
          {
            blogList.map(topic => {
              const post = topic.posts[0];
              return (
                <div className="post-list-item" key={post.tid}>
                  <div className="post-header">
                    <a
                      className="post-title"
                      href={`/post/${post.tid}`}
                      dangerouslySetInnerHTML={{ __html: topic.title }}
                    />
                    <div className="meta">
                      { post.timestampISO.split('T')[0] }
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
                      __html: this.parseBlogBody(post.content, `/post/${post.tid}`),
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
  blogDetailedList: state.blogDetailedList,
}))(Blog);
