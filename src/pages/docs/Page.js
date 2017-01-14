
import React, { PropTypes } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import Marked from '../../components/Marked';
import SNSComment from '../../components/SNSComment';
import { loadResources, getResource } from '../../logic/loadResource';

import ads from '../../../docs/ads/ads';
export default class Page extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    location: PropTypes.object,
    params: PropTypes.object,
    docIndex: PropTypes.object,
  };

  static fetchData({ params }) {
    const {version, doc} = params;
    const markdown = `/static/docs/${version}/${doc}.md`;
    return loadResources([markdown]);
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params) {
      this.loadData(nextProps);
    }
  }

  loadData({ params }) {
    const { version, doc } = params;
    const markdown = `/static/docs/${version}/${doc}.md`;
    try {
      this.setState({
        err: null,
        content: getResource(markdown),
      });
    } catch (err) {
      this.setState({
        err,
        content: null,
      });
    }
  }


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
          target="_blank"
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
    const { location, params, docIndex } = this.props;
    const { content, err } = this.state;

    if (err) {
      if (err.code === 404) {
        return (
          <section className="content">
            <Panel header="404 Not Found" bsStyle="danger">
              ——你所寻找的页面已经不存在了。
            </Panel>
          </section>
        );
      }
      return (
        <section className="content">
          <Panel header={`${err.code}`} bsStyle="danger">
            发生了意外的错误。
          </Panel>
        </section>
      );
    }
    let hash = location.hash;
    hash = hash && hash.substr(1);

    const curId = params.doc;

    let indexes = docIndex.contains;
    indexes = indexes.reduce((prev, cur) => prev.concat(cur.contains), []);

    const curr = indexes.filter(v => v.mdlink === curId)[0];

    const currIndex = indexes.indexOf(curr);

    const prev = currIndex >= 0 && indexes[currIndex - 1];
    const next = currIndex >= 0 && indexes[currIndex + 1];

    const title = content && curr && curr.subject || '';

    const gitLink = content && curr &&
                      `https://github.com/reactnativecn/react-native.cn/tree/stable/docs/docs/${params.version}/${curr.mdlink}.md`;

    const donationLink = '/about.html#%E6%8D%90%E5%8A%A9';

    return (
      <div>
        <DocumentMeta
          title={title ? `${title} - React Native 中文网` : 'React Native 中文网'}
        />
        <a className="anchor" name="content" />
        <h1>{title}</h1>
        <div className="doc-extra-links">
          { gitLink && <a className="doc-edit-github" href={gitLink}>在GitHub上修改这篇文档</a> }
          <a className="doc-donation" href={donationLink}>支持我们</a>
        </div>
        <section className="content">
          {
            content &&
              <Marked uri={`/static/docs/${params.version}/`} scrollTo={hash} createHashLink>
                {content}
              </Marked>
          }
          <Row className="prevNextRow">
            {prev && <Col xs={3} md={3} mdOffset={9} xsOffset={7}>
              <Link
                className="nextprevLink"
                to={{
                  pathname: prev.external || `/docs/${params.version}/${prev.mdlink}.html`,
                  hash: '#content',
                }}
                target={prev.external && '_blank'}
              >
                前一篇：{prev.subject}
              </Link>
            </Col>}
            {next && <Col xs={3} md={3} mdOffset={9} xsOffset={7}>
              <Link
                className="nextprevLink"
                to={{
                  pathname: next.external || `/docs/${params.version}/${next.mdlink}.html`,
                  hash: '#content',
                }}
                target={next.external && '_blank'}
              >
                后一篇：{next.subject}
              </Link>
            </Col>}
          </Row>
        </section>
        {ads.docs && this.renderBanner(ads.docs)}
        <SNSComment threadKey={location.pathname} title={`${params.version}/${title}`} />
      </div>
    );
  }
}
