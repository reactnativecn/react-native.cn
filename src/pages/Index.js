/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';

import Container from '../../components/Container';
import Marked from '../../components/Marked';

import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';
import {Grid, Row, Col, Button, Table, SafeAnchor} from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import {ViewModel} from 'redux-viewmodel';

import "./Index.less";
import Subjects from "./Subjects.js";

export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      docsLink:[]
    }
  }
  static get contextTypes() {
    return {
      location: React.PropTypes.object
    }
  }
  componentDidMount(){
  }
  componentWillMount(){
    var jsonPath = global.__static_path + "docs/indexes.json";
    var docsLink = [];
    var subjects = [];
    docsLink.push("");

    fetch(jsonPath).then(resp=>resp.json()).then(data=> {
      var i = 1;

      data.contains.map(v=> {
        v.id = i++;
        var j = 1;
        v.contains.map(u=> {
          u.id = j++;
          docsLink.push("/docs/" + u.mdlink + ".html");
          subjects.push(u.subject);
        })
      });
      return data.contains;

    }).then(resp=> {
      docsLink.push("");

      this.setState({
        docsLink: docsLink,
        subjects: subjects
      })
    });
  }
  static get contextTypes(){
    return {
      location: React.PropTypes.object
    }
  }
  render(){
    var f = this.props.params.docid.match(/([0-9A-Za-z_-]+)\.html/)[1];

    var pathname = global.__static_path + "docs/" + f + ".md";

    var prevlink = "";
    var nextlink = "";
    var subjects = {
      prev:"",
      now:"",
      next:""
    }
    for(var i=0;i<this.state.docsLink.length;i++)
    {
      if (("/docs/" + f + ".html") == this.state.docsLink[i]){
        prevlink = this.state.docsLink[i-1];
        nextlink = this.state.docsLink[i+1];
        subjects.now = this.state.subjects[i-1];
        subjects.prev = this.state.subjects[i-2];
        subjects.next = this.state.subjects[i];
        break;
      }
    }

    var hash = this.context.location.hash;
    hash = hash && hash.substr(1);

    return (
      <DocumentTitle title = {subjects.now}>
        <div>
          <h1>{subjects.now}</h1>
          <Marked uri={pathname} scrollTo={hash} createHashLink></Marked>
          <Row className = "prevNextRow">
            {prevlink==""?"":<Col xs = {3} md = {3} mdOffset = {9} xsOffset = {7}>
              <Link className = "nextprevLink" to={prevlink}>前一篇：{subjects.prev}</Link>
            </Col>}
            {nextlink==""?"":<Col xs = {3} md = {3} mdOffset = {9} xsOffset = {7}>
              <Link className = "nextprevLink" to={nextlink}>后一篇：{subjects.next}</Link>
            </Col>}
          </Row>
        </div>
      </DocumentTitle>
    )
  }
}
