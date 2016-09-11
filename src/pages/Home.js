/**
 * Created by Yun on 2015-10-24.
 */

import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';

import Marked from '../components/Marked';
import Container from '../components/Container';
import './Home.less';
import CONSTANTS from '../constants';
import { loadResources, getResource } from '../logic/loadResource';

export default class Home extends Component {
  static propTypes = {
    content: PropTypes.string,
    location: PropTypes.object,
    routes: PropTypes.array,
  };

  static fetchData() {
    return loadResources([
      '/static/index.md',
      `${CONSTANTS.bbs}/api/category/1`,
      `${CONSTANTS.bbs}/api/category/3`,
    ]);
  }
  state = {};

  componentWillMount() {
    this.setState({
      content: getResource('/static/index.md'),
      blogBasicList: JSON.parse(getResource(`${CONSTANTS.bbs}/api/category/3`)),
      newsBasicList: JSON.parse(getResource(`${CONSTANTS.bbs}/api/category/1`)),
    });
  }
  render() {
    const { location } = this.props;
    const { blogBasicList, content, newsBasicList } = this.state;
    const hash = location.hash && location.hash.substr(1);

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
            {/*<div className="friend-links">*/}
            {/*友情链接：*/}
            {/*{*/}
            {/*links.index.map((l, i) =>*/}
            {/*<a key={i} href={l.href}>*/}
            {/*{l.text}*/}
            {/*</a>*/}
            {/*)*/}
            {/*}*/}
            {/*<Link to={{ pathname: 'friendlink.html' }}>更多</Link>*/}
            {/*</div>*/}
          </Container>
        </section>
      </div>
    );
  }
}
