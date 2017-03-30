/**
 * Created by Yun on 2015-12-02.
 */

import React from 'react';

import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';

import './NavBar.less';
import versions from '../../docs/versions.json';
import ViewRecords from './ViewRecords';
import Subscribe from './Subscribe';

import imageHot from './images/hot.png';
import imageLogo from './images/header_logo.png';

const linksInternal = [
  { section: 'docs', href: `/docs/${versions.current}/getting-started.html`, text: '文档' },
  { section: 'course', href: 'https://ke.qq.com/course/197101', text: '入门课程', hot: true, newTab: true  },
  // { section: 'live', href: '/post/3376', text: '3.5直播', hot: true },
  { section: 'cases', href: '/cases.html', text: '案例' },
  { section: 'blog', href: '/blog.html', text: '博客' },
  { section: 'videos', href: '//i.youku.com/i/UMzM5ODI5MDA4MA==/videos', text: '视频', newTab: true },
  { section: 'bbs', href: 'http://bbs.reactnative.cn/', text: '讨论', newTab: true },
  { section: 'update', href: 'http://update.reactnative.cn/', text: '热更新', newTab: true },
  { section: 'about', href: '/about.html', text: '关于' },
];
const linksExternal = [
  { section: 'github', href: 'https://github.com/facebook/react-native', text: 'GitHub' },
];


const Badge = () => <sup className="nav-badge" />

export default class MyNavBar extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  noop = () => {};
  createLink(v) {
    if (v.isHidden && v.isHidden()) {
      return null;
    }
    const { viewRecords } = this.state;
    const external = /^\w+:/.test(v.href);

    const newTab = v.newTab !== null ? v.newTab : external;

    return (external || newTab) ? (
      <NavItem
        key={v.section}
        onClick={v.onClick}
        href={v.href}
        target={newTab && '_blank'}
      >
        {v.text}
        {v.hot && <div className="hotSign"><img src={imageHot} alt="hot" /></div>}
      </NavItem>
    ) : (
      <LinkContainer to={v.href} onClick={v.onClick || this.noop} key={v.section}>
        <NavItem>
          {v.text}
          {viewRecords && v.checkViewed && !!viewRecords[v.checkViewed].left && <Badge />}
          {v.hot && <div className="hotSign"><img src={imageHot} alt="hot" /></div>}
        </NavItem>
      </LinkContainer>
    );
  }
  state = {};
  updateViewRecords = (viewRecords) => {
    this.setState({
      viewRecords
    });
  };
  componentDidMount() {
    ViewRecords.updateVideosLeft();
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
        <Subscribe target={ViewRecords.event} eventName="update" listener={this.updateViewRecords} />
      </div>
    );
  }
}
