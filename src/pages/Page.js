
import React from 'react';
import Marked from '../components/Marked';
import Container from '../components/Container';
import './Index.less';
//import {fetchStaticContent} from '../helpers/fetchStatic';
import {connect} from 'react-redux';
import storage from '../storage/storage';
import {contentLoaded} from '../redux/modules/content';

class Page extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
  };

  static fetchData(getState, dispatch, location) {
    //return fetchStaticContent(location.pathname.replace(/\.html$/, '.md'), getState, dispatch);
    if (getState().content) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'pageContent',
      id: location.pathname.replace(/\.html$/, ''),
    }).then( data => dispatch(contentLoaded(data)));
  }

  render() {
    let hash = this.props.location.hash;
    hash = hash && hash.substr(1);

    return (
      <div>
        <section className="content">
          <Container>
            <a className="anchor" name="content" />
            <Marked uri={"/static/"} scrollTo={hash} createHashLink>
              {this.props.content}
            </Marked>
          </Container>
        </section>
      </div>
    );
  }
}
export default connect(state=>({content: state.content}))(Page);
