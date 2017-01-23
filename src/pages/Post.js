import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';

import Container from '../components/Container';
import SNSComment from '../components/SNSComment';
import './Post.styl';
import CONSTANTS from '../constants';
import { loadResources, getResource } from '../logic/loadResource';

export default class Post extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  static fetchData({ location }) {
    const id = decodeURIComponent(location.pathname.replace(/\/post\//, ''));
    return loadResources([
      `${CONSTANTS.bbs}/api/topic/${id}`,
    ]);
  }
  state = {};

  parseBlogBody = (rawBody, link) => {
    const parsedText = rawBody.replace(/\/uploads\/file/g, `${CONSTANTS.bbs}/uploads/file`);
    return `${parsedText}<a href="//bbs.reactnative.cn/topic/${link}" class="more">[去论坛发表意见]</a>`;
  };
  componentWillMount() {
    const { location } = this.props;
    const id = decodeURIComponent(location.pathname.replace(/\/post\//, ''));
    this.setState({
      post: JSON.parse(getResource(`${CONSTANTS.bbs}/api/topic/${id}`)),
    });
  }
  render() {
    const { location } = this.props;
    const { post } = this.state;
    let body;
    return (
      <div>
        {
          post && (body = post.posts[0]) &&
          <Container type="post">
            <div className="post-list-item" key={body.tid}>
              <div className="post-header">
                <a
                  className="post-title"
                  target="_blank"
                  href={`//bbs.reactnative.cn/topic/${body.tid}`}
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <div className="meta">
                  {body.timestampISO.split('T')[0]}
                  {' by '}
                  <a
                    target="_blank"
                    href={`${CONSTANTS.bbs}/user/${body.user.username}`}
                  >
                    {body.user.username}
                  </a>
                </div>
              </div>
              <div
                className="post"
                dangerouslySetInnerHTML={{
                  __html: this.parseBlogBody(body.content, post.tid),
                }}
              />
            </div>
            <SNSComment threadKey={location.pathname} title={post.title} />
          </Container>
        }
      </div>
    );
  }
}
