
import React from 'react';
import Marked from '../components/Marked';
import Container from '../components/Container';

import { loadResources, getResource } from '../logic/loadResource';

export default class Page extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
    routes: React.PropTypes.array,
  };

  static fetchData({ routes }) {
    const route = routes[routes.length - 1];
    const markdown = route.markdown;
    return loadResources([`/static${markdown}`]);
  }
  state = {};

  componentWillMount() {
    const { routes } = this.props;
    const route = routes[routes.length - 1];
    const markdown = route.markdown;
    this.setState({
      data: getResource(`/static${markdown}`),
    });
  }

  render() {
    const { location } = this.props;
    const { data } = this.state;
    const hash = location.hash && location.hash.substr(1);
    return (
      <section className="content">
        <Container>
          <Marked uri={"/static/"} scrollTo={hash} createHashLink>
            {data}
          </Marked>
        </Container>
      </section>
    );
  }
}
