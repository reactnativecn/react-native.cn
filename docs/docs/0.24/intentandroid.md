注：`IntentAndroid`现已过时，请使用跨平台的[`Linking`](linking.html)组件。  

`IntentAndroid`提供了一个通用接口来调用外部链接。

### 基本用法
#### 处理深度链接（deep link）
如果你的应用是通过一个已注册的外部链接调起的，那么可以用下面的方法来读取和处理这个链接：
```javascript
componentDidMount() {
  var url = IntentAndroid.getInitialURL(url => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  });
}
```
注：要了解更多如何支持深度链接的说明，请参阅[Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters)。
下面是一个添加深度链接的例子，编辑`android/app/src/main/AndroidManifest.xml`文件：

```
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <!-- 以下设置用于接受一个以http://www.facebook.com/react 开头的url-->
    <data android:scheme="http"
       android:host="www.facebook.com"
       android:pathPrefix="/react" />
    <!-- 注意：pathPrefix中的"/"符号是必须的-->

    <!-- 以下设置用于接受以"facebook://react 开头的url-->
    <!-- <data android:scheme="facebook" android:host="react" /> -->
  </intent-filter>
 ```
#### 打开外部链接 

要启动链接对应的活动（网址、邮件或是联系人等），直接调用以下方法即可：  

```javascript
IntentAndroid.openURL(url)
```  

如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：  

```javascript
IntentAndroid.canOpenURL(url, (supported) => {
  if (!supported) {
    console.log('无法打开这个url: ' + url);
  } else {
    IntentAndroid.openURL(url);
  }
});
```
### 方法
<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="openurl"></a><span class="propType">static </span>openURL<span
            class="propType">(url: string)</span> <a class="hash-link" href="#openurl">#</a></h4>
        <div><p>根据给定的URL启动对应的应用。</p>
            <p>比如一个这样的URL："<a href="https://www.facebook.com">https://www.facebook.com</a>"会启动系统浏览器，或是弹出一个“选择打开程序”的对话框。</p>
            <p>你还可以使用其他类型的URL，比如一个地理位置（形如"geo:37.484847,-122.148386"或是一个通讯录名片，只要是可以通过{@code Intent.ACTION_VIEW}打开的即可。</p>
            <p>注：如果系统不知道如何处理给定的URL，则此方法会调用失败。如果你传入的URL不是一个http链接，则最好先通过{@code canOpenURL}方法检查一下。</p>
            <p>注：对于web链接来说，协议头("http://", "https://")不能省略！</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="canopenurl"></a><span
            class="propType">static </span>canOpenURL<span class="propType">(url: string, callback: Function)</span> <a
            class="hash-link" href="#canopenurl">#</a></h4>
        <div><p>判断是否有已安装的应用可以处理传入的URL。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getinitialurl"></a><span
            class="propType">static </span>getInitialURL<span class="propType">(callback: Function)</span> <a
            class="hash-link" href="#getinitialurl">#</a></h4>
        <div><p>如果当前应用是通过深度链接和{@code Intent.ACTION_VIEW}调起的，则此方法会返回这个链接的值，否则返回<code>null</code></p>
            <p>更多说明可参阅<a href="http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents">http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents</a>
            </p></div>
    </div>
</div>

### 例子
```javascript
'use strict';

var React = require('react-native');
var {
  IntentAndroid,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} = React;
var UIExplorerBlock = require('./UIExplorerBlock');

var OpenURLButton = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
  },

  handleClick: function() {
    IntentAndroid.canOpenURL(this.props.url, (supported) => {
      if (supported) {
        IntentAndroid.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  },

  render: function() {
    return (
      <TouchableNativeFeedback
        onPress={this.handleClick}>
        <View style={styles.button}>
          <Text style={styles.text}>Open {this.props.url}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
});

var IntentAndroidExample = React.createClass({

  statics: {
    title: 'IntentAndroid',
    description: 'Shows how to use Android Intents to open URLs.',
  },

  render: function() {
    return (
      <UIExplorerBlock title="Open external URLs">
        <OpenURLButton url={'https://www.facebook.com'} />
        <OpenURLButton url={'http://www.facebook.com'} />
        <OpenURLButton url={'http://facebook.com'} />
        <OpenURLButton url={'geo:37.484847,-122.148386'} />
      </UIExplorerBlock>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});

module.exports = IntentAndroidExample;
```
