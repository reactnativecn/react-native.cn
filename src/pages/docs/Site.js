/**
 * Created by tdzl2_000 on 2015-12-04.
 */


import React from 'react';

import Container from '../../components/Container';

import {Row, Col} from 'react-bootstrap';

import './docs.less';
import Subjects from './Subjects.js';
import {connect} from 'react-redux';
import {indexLoaded} from '../../redux/modules/docIndex.js';
import {fetchStaticJson} from '../../helpers/fetchStatic';

class Site extends React.Component {
  static propTypes={
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    docIndex: React.PropTypes.object,
  };
  static fetchData(getState, dispatch) {
    const state = getState();
    if (state.docIndex) {
      return Promise.resolve();
    }
    return fetchStaticJson('/docs/indexes.json')
      .then(json=>dispatch(indexLoaded(json)));
  }
  render() {
    return (
      <section className="content">
        <Container>
          <a className="anchor" name="content"></a>
          <Row className = "apiContainer">
            <Col className = "mdContaint" xs = {12} sm = {8} md = {9} mdPush={3} smPush={4}>
              <div className = "mainText">
                {this.props.children}
              </div>
            </Col>

            <Col xs = {12} sm = {4} md = {3} mdPull = {9} smPull={8}>
              <Subjects docIndex={this.props.docIndex}/>
            </Col>

          </Row>
        </Container>
      </section>
    );
  }
}
export default connect(state=>({docIndex: state.docIndex}))(Site);
