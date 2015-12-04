
import React from 'react';
import Marked from '../components/Marked';
import Container from '../components/Container';
import './Index.less';
import {fetchStaticContent} from '../helpers/fetchStatic';
import {connect} from 'react-redux';

export default function createPage(markdown) {
  class Page extends React.Component {
    static propTypes = {
      content: React.PropTypes.string,
      location: React.PropTypes.object,
    };

    static fetchData(getState, dispatch) {
      return fetchStaticContent(markdown, getState, dispatch);
    }

    render() {
      let hash = this.props.location.hash;
      hash = hash && hash.substr(1);

      return (
        <div>
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
  return connect(state=>({content: state.content}))(Page);
}
