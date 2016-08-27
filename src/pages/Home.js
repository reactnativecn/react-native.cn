/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';
import { Link } from 'react-router';

import Marked from '../components/Marked';
import Container from '../components/Container';
import './Home.less';

class Index extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
    blogBasicList: React.PropTypes.object,
    newsBasicList: React.PropTypes.object,
    links: React.PropTypes.object,
  };
  static fetchData() {
  }
  render() {
    const { blogBasicList, location, content, newsBasicList, links } = this.props;
    let hash = location.hash;
    hash = hash && hash.substr(1);

    return (
      <div>
        <div className="hero">
          <div className="wrap">
            <div className="text"><h1>React Native 中文网</h1></div>
            <div className="minitext">
              <p>最专业的翻译，最及时的资讯，最火爆的社区</p>
              <p>使用前沿的JAVASCRIPT为IOS、ANDROID编写跨平台原生APP</p>
            </div>
          </div>
        </div>
        <section className="content">
          <Container>
            <a className="anchor" name="content" />
            <div className="news">
              <div className="news-list">
                {
                  newsBasicList.topics.slice(0, 7).map(post => {
                    return (
                      <div className="news-list-item" key={post.tid}>
                        <a
                          className="news-title"
                          href={`/post/${post.tid}`}
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                        <span className="date">
                          { post.timestampISO.split('T')[0] }
                        </span>
                      </div>
                    );
                  })
                }
              </div>
              <div className="news-list">
                {
                  blogBasicList.topics.slice(0, 7).map(post => {
                    return (
                      <div className="news-list-item" key={post.tid}>
                        <a
                          className="news-title"
                          href={`/post/${post.tid}`}
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                        <span className="date">
                          { post.timestampISO.split('T')[0] }
                        </span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <Marked uri={"/static/"} scrollTo={hash} createHashLink>
              {content}
            </Marked>
            <div className="buttons-unit">
              <a
                type="button"
                href="/docs/getting-started.html"
                className="btn btn-lg btn-primary btn-start"
              >
                开始使用React Native
              </a>
            </div>
            <div className="friend-links">
              友情链接：
              {
                links.index.map((l, i) =>
                  <a key={i} href={l.href}>
                    {l.text}
                  </a>
                )
              }
              <Link to={{ pathname: 'friendlink.html' }}>更多</Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }
}
export default connect(state => ({
  content: state.content,
  blogBasicList: state.blogBasicList,
  newsBasicList: state.newsBasicList,
  links: state.links,
}))(Index);
