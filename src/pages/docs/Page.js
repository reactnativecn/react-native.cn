
import React from 'react';
import Marked from '../../components/Marked';
import {fetchStaticContent} from '../../helpers/fetchStatic';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

class Page extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    docIndex: React.PropTypes.object,
  };

  static fetchData(getState, dispatch, location) {
    return fetchStaticContent(location.pathname.replace(/\.html$/, '.md'), getState, dispatch);
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

    return (
      <div>
        <a className="anchor" name="content"></a>
        <h1>{this.props.content && curr && curr.subject}</h1>
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
