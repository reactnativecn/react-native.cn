/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
import QRCode from 'qrcode.react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Container from '../components/Container';
import { loadResources, getResource } from '../logic/loadResource';
import './Cases.styl';

export default class Cases extends React.Component {

  static fetchData() {
    return loadResources(['/static/cases/cases.json']);
  }

  state = {};

  componentWillMount() {
    this.setState({
      data: JSON.parse(getResource('/static/cases/cases.json')),
    });
  }

  getTooltip(data, platform) {
    return <Tooltip id={data.name}><QRCode value={data[platform]} /></Tooltip>;
  }
  render() {
    const { data } = this.state;
    return (
      <Container type="cases">
        <h1>使用React Native编写的应用</h1>
        <p className="introduce">
          以下是本站收集的使用React Native来编写的原生应用，供大家参观学习。<br />
          如果你想提交作品，或是要求修改、删除这里列出的应用，请提出
          <a
            target="_blank"
            href="https://github.com/reactnativecn/react-native.cn/blob/stable/docs/cases/cases.json"
          >
            Pull Request
          </a>
          或在讨论区中私信<a href="http://bbs.reactnative.cn/user/sunnylqm">管理员</a>。
        </p>
        <div className="cases">
          {
            data.map((c, i) =>
              <div className="case" key={i}>
                <img src={c.icon} title={c.name} />
                <h3>{c.name}</h3>
                <p className="desc">{c.desc}</p>
                <p>
                  {
                    c.ios ?
                      <OverlayTrigger
                        placement="top"
                        overlay={this.getTooltip(c, 'ios')}
                      >
                        <a href={c.ios} target="blank">iOS</a>
                      </OverlayTrigger>
                      :
                      <span>iOS</span>
                  }
                  <span> - </span>
                  {
                    c.android ?
                      <OverlayTrigger
                        placement="top"
                        overlay={this.getTooltip(c, 'android')}
                      >
                        <a href={c.android} target="blank">Android</a>
                      </OverlayTrigger>
                      :
                      <span>Android</span>
                  }
                </p>
              </div>
            )
          }
        </div>
      </Container>
    );
  }
}