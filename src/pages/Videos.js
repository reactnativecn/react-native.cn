/**
 * Created by sunny on 3/6/16.
 */

import React, { PropTypes, Component } from 'react';
import Container from '../components/Container';
import CONSTANTS from '../constants';
import { loadResources, getResource } from '../logic/loadResource';
import ViewRecords from '../components/ViewRecords';
import './Videos.styl';

export default class Videos extends Component {

  static fetchData() {
    return loadResources([
      `${CONSTANTS.youkuUrl}`,
    ]);
  }
  componentWillMount() {
    this.setState({
      videos: JSON.parse(getResource(`${CONSTANTS.youkuUrl}`)),
      viewed: null,
    });
  }

  componentDidMount() {
    this.setState({
      viewed: ViewRecords.getSet('videos')
    });
  }
  playVideo(link, id) {
    window.open(link);
    const { videos: { videos } } = this.state;
    const left = ViewRecords.checkLeft('videos', videos);
    ViewRecords.add('videos', id, left);
    this.setState({
      viewed: ViewRecords.getSet('videos')
    });
  }
  // videos:
  // [ { id: 'XMTQ5MjU1MjA2NA==',
  //   title: 'React Native广州分享会',
  //   desc: '由React Native中文网主办的广州分享会高清视频录像',
  //   link: 'http://v.youku.com/v_show/id_XMTQ5MjU1MjA2NA==.html',
  //   thumbnail: 'http://r2.ykimg.com/0542040856BA06B96A0A4C046E362611',
  //   bigThumbnail: 'http://r2.ykimg.com/0541040856BA06B96A0A4C046E362611',
  //   duration: 8900,
  //   category: '生活',
  //   state: 'limited',
  //   view_count: 0,
  //   favorite_count: 0,
  //   comment_count: 0,
  //   up_count: 0,
  //   down_count: 0,
  //   published: '2016-03-07 13:54:40',
  //   operation_limit: [],
  //   streamtypes: [ '3gphd', 'flvhd', 'hd', 'hd2' ],
  //   public_type: 'all',
  //   isinteract: 0,
  //   ischannel: 0,
  //   tags: 'reACT,Native' }]
  render() {
    const { viewed, videos: { videos } } = this.state;
    return (
      <Container type="videos">
        {videos && videos.filter(v => v.public_type && v.public_type === 'all').map(v =>
          <a
            className={'video ' + ((__SERVER__ || viewed && viewed.has(v.id)) && 'viewed' || '')}
            target="_blank"
            key={v.id}
            onClick={() => this.playVideo(v.link, v.id)}
          >
            <img src={v.thumbnail.replace('http:', '')} alt={v.title} />
            <span className="v-time">{`${Math.floor(v.duration / 60)}:${v.duration % 60}`}</span>
            <div className="v-overlay" />
            <h3>{v.title}</h3>
          </a>
        )}
      </Container>
    );
  }
}