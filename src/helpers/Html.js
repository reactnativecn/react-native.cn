/**
 * Created by Yun on 2015-11-29.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    const {router, ...state} = store.getState();

    if (router) {
      const {components, ...other} = router;
      state.router = router && other;
    }

    return (
      <html>
      <head>
        {DocumentMeta.renderAsReact()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} media="screen, projection"
                rel="stylesheet" />
        )}

        {/* (will be present only in development mode) */}
        {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
        {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
        {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
        { Object.keys(assets.styles).length === 0 && (
          <style dangerouslySetInnerHTML={{
            __html: Object.keys(assets.assets).map(key=>assets.assets[key]).filter(v=>typeof(v) === 'object' && v._style).map(v=>v._style).join('\n')
          }}/>
        )}
        <script  dangerouslySetInnerHTML={{__html: 'var duoshuoQuery = {short_name:"reactnative"}'}}></script>
        <script src="http://static.duoshuo.com/embed.js"></script>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{__html: content}}></div>
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(state)};`}}></script>
        <script src={assets.javascript.main}></script>
      </body>
      </html>
    );
  }
}