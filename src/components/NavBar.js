/**
 * Created by Yun on 2015-12-02.
 */

import React from 'react';

import { Link } from 'react-router';
import {
  SafeAnchor,
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';

import './NavBar.less';
import versions from '../../docs/versions.json';

import imageHot from './images/hot.png';
import imageLogo from './images/header_logo.png';

const linksInternal = [
  // {section: 'offdocs', href: 'https://facebook.github.io/react-native/docs/getting-started.html', text: '官方文档(英文)'},
  // {section: 'releases', href: 'https://github.com/facebook/react-native/releases', text: '版本'},
  { section: 'docs', href: `/docs/${versions.current}/getting-started.html`, text: '文档' },
  { section: 'cases', href: '/cases.html', text: '案例' },
  { section: 'blog', href: '/blog.html', text: '博客' },
  { section: 'videos', href: '/videos.html', text: '视频' },
  { section: 'bbs', href: 'http://bbs.reactnative.cn/', text: '讨论', hot: true, newTab: false },
  { section: 'update', href: 'http://update.reactnative.cn/', text: '热更新', hot: true, newTab: true },
  { section: 'about', href: '/about.html', text: '关于', hash: '#content' },
];
const linksExternal = [
  { section: 'github', href: 'https://github.com/facebook/react-native', text: 'GitHub' },
  // {section: 'react', href: 'http://facebook.github.io/react-native', text: 'in English'},
];


export default class MyNavBar extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  createLink(v) {
    if (v.isHidden && v.isHidden()) {
      return null;
    }

    const external = /^\w+:/.test(v.href);

    const newTab = v.newTab !== null ? v.newTab : external;

    return (
      <NavItem
        target={newTab ? '_blank' : undefined}
        href={v.href}
        rel={newTab ? 'noopener noreferrer' : ''}
        key={v.section}
        onClick={v.onClick}
        componentClass={external?SafeAnchor:props=><Link {...props} to={v.href}/>}
      >
        {v.text}
        {v.hot && <div className="hotSign"><img src={imageHot} alt="hot" /></div>}
      </NavItem>
    );
  }
  goToDoc = (version) =>
    () => this.context.router.push(`/docs/${version}/getting-started.html`);
  goToReleaseNote = () => (window.location = 'http://bbs.reactnative.cn/category/1');
  render() {
    return (
      <div>
        <Navbar className="nav-main">
          <Navbar.Header>
            <Navbar.Brand>
              <Link
                className="nav-home"
                to={{ pathname: '/' }}
              >
                <img src={imageLogo} alt="logo" />
                React Native
              </Link>
            </Navbar.Brand>
            <NavDropdown
              className="nav-version"
              title={this.props.params.version || versions.current}
              id="nav_version"
            >
              <MenuItem onSelect={this.goToReleaseNote}>
                更新日志
              </MenuItem>
              {
                versions.list.map((v, i) =>
                  <MenuItem key={i} onSelect={this.goToDoc(v.version)}>
                    {`${v.text || v.version}${v.version === versions.current ? '(当前版本)' : ''}`}
                  </MenuItem>
                )
              }
            </NavDropdown>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {
                linksInternal.map(v => this.createLink(v))
              }
            </Nav>
            <Nav pullRight>
              <NavItem>
                <form className="nav-search-form" target="_blank" rel="noopener noreferrer" action="http://zhannei.baidu.com/cse/site">
                  <input className="nav-search" type="text" name="q" size="30" placeholder="搜索文档" />
                  <input type="hidden" name="cc" value="reactnative.cn" />
                </form>
              </NavItem>
              {
                linksExternal.map(v => this.createLink(v))
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="navbar-placeholder" />
      </div>
    );
  }
}
