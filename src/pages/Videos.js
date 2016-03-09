/**
 * Created by sunny on 3/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { videosLoaded } from '../redux/modules/videos';
import Container from '../components/Container';
import DocumentMeta from 'react-document-meta';
import config from '../options';
import storage from '../storage/storage';
import './Videos.styl';
class Videos extends React.Component {
  static propTypes = {
    videos: React.PropTypes.object,
  };
  static fetchData(getState, dispatch) {
    if (getState().videos) {
      return Promise.resolve();
    }
    return storage.load({
      key: 'videos',
    }).then(data => dispatch(videosLoaded(data)));
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
    const { videos } = this.props.videos;
    return (
      <div>
        <DocumentMeta {...config.app} title="React Native博客 - react native 中文网" />
        <Container type="videos">
          {videos && videos.map(v =>
            <a className="video" href={v.link} target="_blank" key={v.id}>
              <img src={v.thumbnail} alt={v.title} />
              <span className="v-time">{`${Math.floor(v.duration / 60)}:${v.duration % 60}`}</span>
              <div className="v-overlay" />
              <h3>{v.title}</h3>
            </a>
          )}
        </Container>
      </div>
    );
  }
}
export default connect(state => ({
  videos: state.videos,
}))(Videos);
