/**
 * Created by Yun on 2015-12-02.
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
    setTimeout(() => {
      this.renderDuoshuo({
        container: this.refs.duoshuo,
        ...this.props,
      });
    }, 500); // why?
  }

  componentWillReceiveProps(nextProps) {
    const { threadKey } = nextProps;
    if (threadKey !== this.threadKey) {
      this.renderDuoshuo({
        container: this.refs.duoshuo,
        ...nextProps,
      });
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
    DUOSHUO.EmbedThread(el);
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
