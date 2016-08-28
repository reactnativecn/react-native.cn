
import React from 'react';
import Marked from '../components/Marked';

import { loadResource, getResource } from '../logic/loadResource';

export default class Page extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    location: React.PropTypes.object,
  };

  static async fetchData({location, routes}) {
    const route = routes[routes.length-1];
    const markdown = route.markdown;
    await loadResource(markdown);
  }

  componentWillMount() {
    const { routes } = this.props;
    const route = routes[routes.length-1];
    const markdown = route.markdown;
    this.setState({
      data: getResource(markdown),
    });
  }

  render() {
    const {location} = this.props;
    const {data} = this.state;
    const hash = location.hash && location.hash.substr(1);
    return (
      <section className="content">
        <a className="anchor" name="content" />
        <Marked uri={"/static/"} scrollTo={hash} createHashLink>
          {data}
        </Marked>
      </section>
    );
  }
}
