import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';

import Container from '../components/Container';
import './Blog.styl';
import CONSTANTS from '../constants';
import { loadResources, getResource } from '../logic/loadResource';

export default class Blog extends Component {

  static async fetchData() {
    const blogList = await loadResource(`${CONSTANTS.bbs}/api/category/3`);
    return loadResources(blogList.topics.map(t => `${CONSTANTS.bbs}/api/topic/${t.tid}`));
  }
  state = {
    appendList: [],
  };
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
          const {currentPage, pageCount} = blogList.pagination;
          if (currentPage === pageCount) {
            this.fetchOver = true;
          }
          this.currentPage = currentPage;
          return storage.getBatchData(blogList.topics.map(t => ({key: 'post', id: t.tid})))
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
  }
  componentWillMount() {
    this.setState({
      content: getResource('/static/index.md'),
      blogBasicList: JSON.parse(getResource(`${CONSTANTS.bbs}/api/category/3`)),
      newsBasicList: JSON.parse(getResource(`${CONSTANTS.bbs}/api/category/1`)),
    });
  }
  render() {
    const { blogDetailedList } = this.state;
    let blogList = blogDetailedList.concat(this.state.appendList);
    return (
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
    );
  }
}
