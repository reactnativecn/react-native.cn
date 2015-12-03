import React from 'react';
import marked from 'marked';

import URI from 'urijs';

import "./Marked.less";

import {highlight, highlightAuto, getLanguage} from 'highlight.js';
import anim from 'animated-scrollto';
import 'highlight.js/styles/vs.css';

class Renderer extends marked.Renderer{
    constructor(url, options){
        super(options);
        this.baseUrl = url;
    }
    image(href, title, text) {
        if (!(/^\w+?\:\/\/'/.test(href))){
            href = new URI(href).absoluteTo(this.baseUrl).toString();
        }
        var out = '<img class="img-responsive" src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
    }
    link(href, title, text){
        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href))
                    .replace(/[^\w:]/g, '')
                    .toLowerCase();
            } catch (e) {
                return '';
            }
            if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
                return '';
            }
        }
        var external = /^\w+\:/.test(href);
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        if (external){
            out += ' target="_blank"';
        }
        out += '>' + text + '</a>';
        return out;
    }
    heading(text, level, raw) {
        if (!this.options.createHashLink){
            return '<h'
                + level
                + '>'
                + text
                + '</h'
                + level
                + '>\n';
        }
        var name = raw.toLowerCase().replace(/[\u4E00-\u9FA5]/g, v=>{
            return encodeURIComponent(v);
        }).replace(/[^\w%]+/g, '-');
        return '<h'
            + level
            + '>'
            + '<a class="anchor" name="'+name+'"></a>'
            + text
            + '<a class="hash-link" href="#'+name+'">#</a>'
            + '</h'
            + level
            + '>\n';
    };
}


export default class Marked extends React.Component{
    constructor(props){
        super(props);
    }
    static get defaultProps(){
        return {
            options: {
            }
        }
    }
    rawMarkup(){
        var content = this.props.children;
        if (!content) {
            return "";
        }
        var options = this.props.options;
        return marked(content, {
            gfm: true,
            highlight: (code, lang)=>(lang&&getLanguage(lang)) ? highlight(lang, code, true).value : highlightAuto(code).value,
            renderer: new Renderer(this.props.uri || global.__static_path),
            sanitize: this.props.sanitize,
            createHashLink: this.props.createHashLink,
            ...options
        });
    }
    doScroll(){
        var hash = this.props.scrollTo;
        if (hash && this.div){
            var target = document.getElementsByName(hash);
            target = target && target[0];
            if (target){
                var scrollTop = target.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
                anim(document.body, scrollTop, 300);
                anim(document.documentElement, scrollTop, 300);
            }
        }
    }
    render(){
        return (
            <div className="markdown" dangerouslySetInnerHTML={{__html:this.rawMarkup()}} ref={
                div=>{
                    this.div = div;
                    if (div){
                        this.doScroll();
                    }
                }
            }>
            </div>
        )
    }
}
