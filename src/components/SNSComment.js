/**
 * Created by sunnylqm on 2016-06-02
 */

import React from 'react';

export default class SNSComment extends React.Component {
  static propTypes = {
    threadKey: React.PropTypes.string.isRequired,
    authorKey: React.PropTypes.string,
    url: React.PropTypes.string,
    title: React.PropTypes.string,
  };
  // constructor(props) {
  //   super(props);
  //   this.threadKey = props.threadKey;
  // }
  componentDidMount() {
    if (__CLIENT__) {
      this.renderDuoshuo({
        container: this.refs.duoshuo,
        ...this.props,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (__CLIENT__) {
      const {threadKey} = nextProps;
      if (threadKey !== this.threadKey) {
        this.renderDuoshuo({
          container: this.refs.duoshuo,
          ...nextProps,
        });
      }
    }
  }

  renderDuoshuo = (params) => {
    const { container, threadKey, authorKey, url, title } = params;
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', threadKey);
    el.setAttribute('data-author-key', authorKey || '325758');
    // el.setAttribute('data-author-key', authorKey || '6291453554058068738');
    el.setAttribute('data-url', url || window.location.href);
    el.setAttribute('data-title', title || '');
    if (window.DUOSHUO) {
      DUOSHUO.EmbedThread(el);
    }
    container.innerHTML = '';
    container.appendChild(el);
    this.threadKey = threadKey;
  };

  render() {
    return (
      <div ref="duoshuo"></div>
    );
  }
}
