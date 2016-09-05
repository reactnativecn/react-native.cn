一个用于显示多种不同类型图片的React组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。详细用法参阅[图片文档](images.html)。

用法样例：

```javascript
renderImages: function() {
  return (
    <View>
      <Image
        style={styles.icon}
        source={require('./icon.png')}
      />
      <Image
        style={styles.logo}
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
      />
    </View>
  );
},
```

### 截图
![](img/components/image.png)

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当元素挂载或者布局改变的时候调用，参数为：<code>{nativeEvent: {layout: {x, y, width, height}}}</code>.</p>
        </div>
    </div>
        <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onload"></a>onLoad <span class="propType">function</span> <a class="hash-link" href="#onload">#</a></h4>
        <div>
            <p>加载成功完成时调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onloadend"></a>onLoadEnd <span class="propType">function</span> <a class="hash-link" href="#onloadend">#</a></h4>
        <div>
            <p>加载结束后，不论成功还是失败，调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onloadstart"></a>onLoadStart <span class="propType">function</span> <a class="hash-link" href="#onloadstart">#</a></h4>
        <div>
            <p>加载开始时调用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="resizemode"></a>resizeMode <span class="propType">enum('cover', 'contain', 'stretch')</span> <a class="hash-link" href="#resizemode">#</a></h4>
        <div>
            <p>决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。</p>
            <ul>
            <li><p><code>cover</code>: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。__译注__：这样图片完全覆盖甚至超出容器，容器中不留任何空白。</p></li>
			  <li><p><code>contain</code>: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。__译注__：这样图片完全被包裹在容器中，容器中可能留有空白</p></li>
			  <li><p><code>stretch</code>: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。</p></li>
			  </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="source"></a>source <span class="propType">{uri: string}, number</span> <a class="hash-link" href="#source">#</a></h4>
        <div>
            <p><code>uri</code>是一个表示图片的资源标识的字符串，它可以是一个http地址或是一个本地文件路径（使用<code>require(相对路径)</code>来引用）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">style</span> <a class="hash-link" href="#style">#</a></h4>
        <div class="compactProps">
            <div class="prop">
                <h6 class="propTitle"><a href="flexbox.html#proptypes">Flexbox...</a></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle"><a href="transforms.html#proptypes">Transforms...</a></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">resizeMode <span class="propType">Object.keys(ImageResizeMode)</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">backgroundColor <span class="propType">string</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">borderColor <span class="propType">string</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">borderWidth <span class="propType">number</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">borderRadius <span class="propType">number</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">overflow <span class="propType">enum('visible', 'hidden')</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">tintColor <span class="propType">string</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">opacity <span class="propType">number</span></h6>
            </div>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
        <div>
            <p>一个唯一的资源标识符，用来在自动测试脚本中标识这个元素。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessibilitylabel"></a><span class="platform">ios</span>accessibilityLabel <span class="propType">string</span> <a class="hash-link" href="#accessibilitylabel">#</a></h4>
        <div>
            <p>当用户与图片交互时，读屏器（无障碍功能）会朗读的文字。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessible"></a><span class="platform">ios</span>accessible <span class="propType">bool</span> <a class="hash-link" href="#accessible">#</a></h4>
        <div>
            <p>当此属性为真的时候，表示这个图片是一个启用了无障碍功能的元素。</p>
        </div>
    </div>
    <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="blurradius"></a><span class="platform">ios</span>blurRadius <span class="propType">number</span> <a class="hash-link" href="#blurradius">#</a>
    </h4>
    <div>
    <p>blurRadius(模糊半径)：为图片添加一个指定半径的模糊滤镜。</p>
    </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="capinsets"></a><span class="platform">ios</span>capInsets <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#capinsets">#</a></h4>
        <div>
            <p>当图片被缩放的时候，capInsets指定的角上的尺寸会被固定而不进行缩放，而中间和边上其他的部分则会被拉伸。这在制作一些可变大小的圆角按钮、阴影、以及其它资源的时候非常有用（译注：这就是常说的九宫格或者.9图。了解更多信息，可以参见<a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets" target="_blank">苹果官方文档</a></p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="defaultsource"></a><span class="platform">ios</span>defaultSource <span class="propType">{uri: string}</span> <a class="hash-link" href="#defaultsource">#</a></h4>
        <div>
            <p>一个静态图片，当最终的图片正在下载的过程中时显示（loading背景图）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onerror"></a><span class="platform">ios</span>onError <span class="propType">function</span> <a class="hash-link" href="#onerror">#</a></h4>
        <div>
            <p>当加载错误的时候调用此回调函数，参数为<code>{nativeEvent: {error}}</code></p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onprogress"></a><span class="platform">ios</span>onProgress <span class="propType">function</span> <a class="hash-link" href="#onprogress">#</a></h4>
        <div>
            <p>在加载过程中不断调用，参数为<code>{nativeEvent: {loaded, total}}</code></p>
        </div>
    </div>
</div>

### 样例

```javascript
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var ImageCapInsetsExample = require('./ImageCapInsetsExample');

var NetworkImageExample = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      error: false,
      loading: false,
      progress: 0
    };
  },
  render: function() {
    var loader = this.state.loading ?
      <View style={styles.progress}>
        <Text>{this.state.progress}%</Text>
        <ActivityIndicatorIOS style={{marginLeft:5}}/>
      </View> : null;
    return this.state.error ?
      <Text>{this.state.error}</Text> :
      <Image
        source={this.props.source}
        style={[styles.base, {overflow: 'visible'}]}
        onLoadStart={(e) => this.setState({loading: true})}
        onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
        onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
        onLoad={() => this.setState({loading: false, error: false})}>
        {loader}
      </Image>;
  }
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Image>';
exports.description = 'Base component for displaying different types of images.';

exports.examples = [
  {
    title: 'Plain Network Image',
    description: 'If the `source` prop `uri` property is prefixed with ' +
    '"http", then it will be downloaded from the network.',
    render: function() {
      return (
        <Image
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          style={styles.base}
        />
      );
    },
  },
  {
    title: 'Plain Static Image',
    description: 'Static assets should be required by prefixing with `image!` ' +
      'and are located in the app bundle.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={require('image!uie_thumb_normal')} style={styles.icon} />
          <Image source={require('image!uie_thumb_selected')} style={styles.icon} />
          <Image source={require('image!uie_comment_normal')} style={styles.icon} />
          <Image source={require('image!uie_comment_highlighted')} style={styles.icon} />
        </View>
      );
    },
  },
  {
    title: 'Error Handler',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'http://TYPO_ERROR_facebook.github.io/react/img/logo_og.png'}} />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Image Download Progress',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1'}}/>
      );
    },
    platform: 'ios',
  },
  {
    title: 'Border Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 3, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
  },
  {
    title: 'Border Width',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 5, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
  },
  {
    title: 'Border Radius',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {borderRadius: 5}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {borderRadius: 19}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Background Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={smallImage} style={styles.base} />
          <Image
            style={[
              styles.base,
              styles.leftMargin,
              {backgroundColor: 'rgba(0, 0, 100, 0.25)'}
            ]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'red'}]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'black'}]}
            source={smallImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Opacity',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {opacity: 1}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.8}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.6}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.4}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.2}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Nesting',
    render: function() {
      return (
        <Image
          style={{width: 60, height: 60, backgroundColor: 'transparent'}}
          source={fullImage}>
          <Text style={styles.nestedText}>
            React
          </Text>
        </Image>
      );
    },
  },
  {
    title: 'Tint Color',
    description: 'The `tintColor` style prop changes all the non-alpha ' +
      'pixels to the tint color.',
    render: function() {
      return (
        <View>
          <View style={styles.horizontal}>
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
          <Text style={styles.sectionText}>
            It also works with downloaded images:
          </Text>
          <View style={styles.horizontal}>
            <Image
              source={smallImage}
              style={[styles.base, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: 'Resize Mode',
    description: 'The `resizeMode` style prop controls how the image is ' +
      'rendered within the frame.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <View>
            <Text style={[styles.resizeModeText]}>
              Contain
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.contain}
              source={fullImage}
            />
          </View>
          <View style={styles.leftMargin}>
            <Text style={[styles.resizeModeText]}>
              Cover
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.cover}
              source={fullImage}
            />
          </View>
          <View style={styles.leftMargin}>
            <Text style={[styles.resizeModeText]}>
              Stretch
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.stretch}
              source={fullImage}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: 'Animated GIF',
    render: function() {
      return (
        <Image
          style={styles.gif}
          source={{uri: 'http://38.media.tumblr.com/9e9bd08c6e2d10561dd1fb4197df4c4e/tumblr_mfqekpMktw1rn90umo1_500.gif'}}
        />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Base64 image',
    render: function() {
      return (
        <Image
          style={styles.base64}
          source={{uri: base64Icon, scale: 3}}
        />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Cap Insets',
    description:
      'When the image is resized, the corners of the size specified ' +
      'by capInsets will stay a fixed size, but the center content and ' +
      'borders of the image will be stretched. This is useful for creating ' +
      'resizable rounded buttons, shadows, and other resizable assets.',
    render: function() {
      return <ImageCapInsetsExample />;
    },
    platform: 'ios',
  },
];

var fullImage = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  },
  gif: {
    flex: 1,
    height: 200,
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
});
```