import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';

import Container from '../components/Container';
import './Blog.styl';
import CONSTANTS from '../constants';
import { loadResource, loadResources, getResource } from '../logic/loadResource';

import ads from '../../docs/ads/ads';

const bbsListUrl = `${CONSTANTS.bbs}/api/category/3`;
const getTopicUrl = tid => `${CONSTANTS.bbs}/api/topic/${tid}`;

export default class Blog extends Component {

  static fetchData() {
    const v = loadResource(bbsListUrl);
    let blogList;
    let data;
    if (v && typeof v.then === 'function') {
      return v.then(ret => {
        data = ret;
        blogList = JSON.parse(data);
        return loadResources(blogList.topics.map(t => getTopicUrl(t.tid)));
      }).then(map => {
        if (map) {
          map[`${CONSTANTS.bbs}/api/category/3`] = data;
        }
        return map;
      });
    } else {
      blogList = JSON.parse(v);
      return loadResources(blogList.topics.map(t => getTopicUrl(t.tid)));
    }
  }
  state = {};
  componentWillMount() {
    const blogList = JSON.parse(getResource(bbsListUrl));
    const blogDetailedList =
      blogList.topics.map(t => JSON.parse(getResource(getTopicUrl(t.tid))));
    this.setState({
      blogDetailedList,
    });
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
  currentPage = 1;
  parseBlogBody = (rawBody, link) => {
    const endFlag = /<hr \/>([\s\S]*?)<hr \/>/;
    let parsedText = endFlag.exec(rawBody);
    parsedText = parsedText ? parsedText[1] : rawBody;
    parsedText = parsedText.replace(/\/uploads\/file/g, `${CONSTANTS.bbs}/uploads/file`);
    return `${parsedText}<a href="${link}" class="more">[阅读全文]</a>`;
  };
  fetchMore = () => {
    if (this.fetching || this.fetchOver) {
      return;
    }
    this.fetching = true;
    fetch(`${bbsListUrl}?page=${this.currentPage + 1}`)
      .then(res => res.json())
      .then(blogList => {
        if (blogList.topics) {
          const {currentPage, pageCount} = blogList.pagination;
          if (currentPage === pageCount) {
            this.fetchOver = true;
          }
          this.currentPage = currentPage;
          const jobs =
            blogList.topics.map(t => fetch(getTopicUrl(t.tid)).then(r => r.json()));
          return Promise.all(jobs)
            .then(blogs => {
              this.setState({
                blogDetailedList: this.state.blogDetailedList.concat(blogs),
              });
              this.fetching = false;
            });
        } else {
          this.fetchOver = true;
        }
      });
  };
  onAdClicked = (gainfo) => {
    if (!__DEV__) {
      ga('send', 'event', 'ad', 'clicked', gainfo)
    }
  };
  renderBanner(data) {
    const { banner: { img, text, link, gainfo } } = data;
    return (
      <div className="vip">
        <a
          href={link}
          onClick={() => this.onAdClicked(gainfo)}
        >
          <img
            title={text}
            src={img}
          />
        </a>
      </div>
    )
  }
  render() {
    const { blogDetailedList } = this.state;
    // const blogList = blogDetailedList.concat(this.state.appendList);
    return (
      <Container type="blog">
        {ads.blog && this.renderBanner(ads.blog)}
        {/*<div className="pro-hint">以上为赞助商推广内容，非本站提供</div>*/}
        {
          blogDetailedList.map(topic => {
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
                      href={`${CONSTANTS.bbs}/user/${post.user.username}`}
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
