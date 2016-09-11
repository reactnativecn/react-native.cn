import React from 'react';
import marked from '../lib/Marked';
import URI from 'urijs';
import './Marked.less';
import { highlight, highlightAuto, getLanguage } from 'highlight.js';
import 'highlight.js/styles/vs.css';
let anim;

if (__CLIENT__) {
  anim = require('animated-scrollto');
}

class Renderer extends marked.Renderer {
  image(href, title, text) {
    let _href = href;
    if (!(/^\w+?\:\/\/'/.test(href))) {
      _href = new URI(href).absoluteTo(this.options.baseUrl).toString();
    }
    let out = `<img class="img-responsive" src="${_href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }

  link(href, title, text) {
    if (this.options.sanitize) {
      let prot;
      try {
        prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (e) {
        return '';
      }
      // eslint-disable-next-line no-script-url
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        return '';
      }
    }
    const external = /^\w+\:/.test(href);
    let out = `<a href="${href}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    if (external) {
      out += ' target="_blank"';
    }
    out += `>${text}</a>`;
    return out;
  }

  heading(text, level, raw) {
    if (!this.options.createHashLink) {
      return `<h${level}>${text}</h${level}>\n`;
    }
    const name = raw.toLowerCase()
                    .replace(/[\u4E00-\u9FA5]/g, v => encodeURIComponent(v))
                    .replace(/[^\w%]+/g, '-');
    return `<h${level}><a class="anchor" name="${name}"></a>
    ${text}<a class="hash-link" href="#${name}">#</a>
    </h${level}>\n`;
  }
}
export default class Marked extends React.Component {
  static propTypes = {
    children: React.PropTypes.string,
    options: React.PropTypes.object,
    uri: React.PropTypes.string,
    sanitize: React.PropTypes.bool,
    createHashLink: React.PropTypes.bool,
    scrollTo: React.PropTypes.string,
  };
  static defaultProps = {
    options: {},
  };
  rawMarkup() {
    const content = this.props.children;
    if (!content) {
      return '';
    }
    const options = this.props.options;
    const markup = marked(content, {
      gfm: true,
      highlight: (code, lang) =>
        (lang && getLanguage(lang)) ? highlight(lang, code, true).value : highlightAuto(code).value,
      renderer: new Renderer(),
      sanitize: this.props.sanitize,
      baseUrl: this.props.uri || global.__static_path,
      createHashLink: this.props.createHashLink,
      ...options,
    });
    return `<a class="anchor" id="content"></a>${markup}`;
  }

  doScroll(props) {
    const hash = (props || this.props).scrollTo;
    if (hash && this.div) {
      let target = document.getElementsByName(hash);
      target = target && target[0];
      if (target) {
        const scrollTop =
          target.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        anim(document.body, scrollTop, 300);
        anim(document.documentElement, scrollTop, 300);
      }
    }
  }

  checkScript() {
    const content = this.props.children;
    if (content && content.indexOf('markdown-script') !== -1) {
      setTimeout(() => {
        var el = document.querySelector('.markdown-script');
        if (el) {
          eval(el.innerHTML);
        }
      }, 0);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scrollTo !== this.props.scrollTo){
      this.doScroll(newProps);
    }
  }
  
  render() {
    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: this.rawMarkup() }}
        ref={
          __CLIENT__ && (div => {
            // TODO 跳进跳出文档时会触发两次
            this.checkScript();
            this.div = div;
            this.doScroll();
          })
        }
      >
      </div>
    );
  }
}
