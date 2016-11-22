export default {
  host: 'http://reactnative.cn',
  // bbs: __SERVER__ ? 'http://bbs.reactnative.cn' : '/proxy/bbs',
  // youkuUrl: __SERVER__ ?
  //   'https://openapi.youku.com/v2/videos/by_user.json?' : '/proxy/videos/by_user.json?',
  // bbs: '/proxy/bbs',
  bbs: '/proxy/bbs.reactnative.cn',
  // youkuUrl: '/proxy/videos/by_user.json?user_name=react-native&client_id=3f4eca228da38d9e',
  youkuUrl: `/proxy/openapi.youku.com/v2/videos/by_user.json?user_name=react-native&client_id=3f4eca228da38d9e&count=100`,
  // youkuUrl: '/proxy/videos',
  clientid: '3f4eca228da38d9e',
}
