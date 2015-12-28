/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';
import Marked from '../components/Marked';
import Container from '../components/Container';
import './Index.less';
import {fetchStaticContent} from '../helpers/fetchStatic';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

class Index extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
  };
  static fetchData(getState, dispatch) {
    return fetchStaticContent('/index.md', getState, dispatch);
  }
  render() {
    let hash = this.props.location.hash;
    hash = hash && hash.substr(1);

    return (
      <div>
        <DocumentMeta title="react native - react native 中文网"/>
        <div className="hero">
          <div className="wrap">
            <div className="text"><strong>React Native 中文网</strong></div>
            <div className="minitext">
              <p>最专业的翻译，最及时的资讯，最火爆的社区</p>
              <p>使用前沿的JAVASCRIPT为IOS、ANDROID编写跨平台原生APP</p>
            </div>
          </div>
        </div>

        <section className="content">
          <Container>
            <a className="anchor" name="content"></a>
            <Marked uri={"/static/"} scrollTo={hash} createHashLink>
              {this.props.content}
            </Marked>
          </Container>
        </section>
      </div>
    );
  }
}
export default connect(state=>({content: state.content}))(Index);
