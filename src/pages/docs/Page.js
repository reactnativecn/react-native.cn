
import React from 'react';
import Marked from '../../components/Marked';
//import {fetchStaticContent} from '../../helpers/fetchStatic';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import config from '../../options';
import storage from '../../storage/storage';
import {contentLoaded} from '../../redux/modules/content';

class Page extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    docIndex: React.PropTypes.object,
  };

  static fetchData(getState, dispatch, location) {
    //return fetchStaticContent(location.pathname.replace(/\.html$/, '.md'), getState, dispatch);

    if (getState().content) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'docContent',
      id: location.pathname.replace(/\.html$/, ''),
    }).then( data => dispatch(contentLoaded(data)));
  }

  render() {
    let hash = this.props.location.hash;
    hash = hash && hash.substr(1);

    const curId = this.props.params.docid.replace(/\.html$/, '');

    let indexes = this.props.docIndex.contains;
    indexes = indexes.reduce((prev, cur)=>prev.concat(cur.contains), []);

    const curr = indexes.filter(v=>v.mdlink === curId)[0];

    const currIndex = indexes.indexOf(curr);

    const prev = currIndex >= 0 && indexes[currIndex - 1];
    const next = currIndex >= 0 && indexes[currIndex + 1];

    const title = this.props.content && curr && curr.subject;

    const currLink = this.props.content && curr &&
                      `https://github.com/reactnativecn/react-native-docs-cn/blob/master/docs/${curr.mdlink}.md`;

    return (
      <div>
        <DocumentMeta {...config.app} title={title ? title + ' - react native 中文网' : 'react native 中文网'}/>
        <a className="anchor" name="content" />
        <h1>{title}</h1>
        { currLink && <a className="edit-github" href={currLink}>在GitHub上修改这篇文档</a> }
        <section className="content">
          <Marked uri={"/static/docs/"} scrollTo={hash} createHashLink>
            {this.props.content}
          </Marked>
          <Row className="prevNextRow">
            {prev && <Col xs = {3} md = {3} mdOffset = {9} xsOffset = {7}>
              <Link className="nextprevLink" to={'/docs/' + prev.mdlink + '.html'}>前一篇：{prev.subject}</Link>
            </Col>}
            {next && <Col xs = {3} md = {3} mdOffset = {9} xsOffset = {7}>
              <Link className="nextprevLink" to={'/docs/' + next.mdlink + '.html'}>后一篇：{next.subject}</Link>
            </Col>}
          </Row>
        </section>
      </div>
    );
  }
}
export default connect(state=>({
  content: state.content,
  docIndex: state.docIndex,
}))(Page);
