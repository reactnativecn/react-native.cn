/**
 * Created by tdzl2_000 on 2015-12-04.
 */


import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Container from '../../components/Container';
import {Link} from 'react-router';
import './docs.less';
import Subjects from './Subjects.js';
import { loadResources, getResource } from '../../logic/loadResource';

export default class Site extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    docIndex: React.PropTypes.object,
    params: React.PropTypes.object,
  };

  static fetchData({ params }) {
    const { version } = params;
    return loadResources([`/static/docs/${version}/indexes.json`]);
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  loadData({ params }) {
    const { version } = params;
    this.setState({
      docIndex: JSON.parse(getResource(`/static/docs/${version}/indexes.json`)),
    });
  }
  render() {
    const { params } = this.props;
    const { version } = params;
    const {docIndex} = this.state;
    return (
      <section className="content">
        <Container>
          <a className="anchor" name="content" />
          <Row className="apiContainer">
            <Col className="mdContaint" xs={12} sm={8} md={9} mdPush={3} smPush={4}>
              <div className="mainText">
                {React.cloneElement(this.props.children, {docIndex})}
              </div>
            </Col>
            <Col xs={12} sm={4} md={3} mdPull={9} smPull={8}>
              <Subjects version={version} docIndex={docIndex} />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

