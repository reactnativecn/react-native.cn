/**
 * Created by sunny on 1/9/16.
 */

import React from 'react';
import { fetchStaticActs } from '../helpers/fetchStatic';
import { connect } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import './List.styl';

class List extends React.Component {
    static propTypes = {
        acts: React.PropTypes.array,
    };

    static fetchData(getState, dispatch) {
        return fetchStaticCases('/cases/cases.json', getState, dispatch);
    }

    render() {
        const { cases } = this.props;
        return (
            <div>
                <DocumentMeta {...config.app} title="React Native案例 - react native 中文网" />
                <Container type="cases">
                    <h1>使用React Native编写的应用</h1>
                    <p className="introduce">
                        以下是本站收集的使用React Native来编写的原生应用，供大家参观学习。<br />
                        如果你想提交作品，或是要求修改、删除这里列出的应用，请提出<a href="https://github.com/reactnativecn/react-native-docs-cn/blob/master/cases/cases.json">Pull Request</a>或在讨论区中私信<a href="http://bbs.reactnative.cn/user/sunnylqm">管理员</a>。
                    </p>
                    <div className="cases">
                        {
                            cases.map( (c, i) =>
                                <div className="case" key={i}>
                                    <img src={c.icon} title={c.name}/>
                                    <h3>{c.name}</h3>
                                    <p className="desc">{c.desc}</p>
                                    <p>
                                        {
                                            c.ios ?
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip><QRCode value={c.ios} /></Tooltip>}>
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
                                                    overlay={<Tooltip><QRCode value={c.android} /></Tooltip>}>
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
            </div>
        );
    }
}
export default connect(state=>({
    cases: state.cases,
}))(Cases);
