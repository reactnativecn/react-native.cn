由于React并没有假设你其余部分的技术栈——它通常只作为`MVC`模型中的`V`存在——它也很容易嵌入到一个并非由React Native开发的应用当中。

## 需求

* 一个已有的、基于gradle构建的Android应用
* Node.js，参见[开始使用React Native](getting-start.md)来了解相关的设置操作。

## 准备你的App

在你的App里的`build.gradle`文件中，添加React Native依赖：

    compile 'com.facebook.react:react-native:0.20.+'

你可以在[Maven中央库](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22com.facebook.react%22%20AND%20a%3A%22react-native%22) [国内镜像](http://maven.oschina.net/index.html#nexus-search;quick~React native) 查询到React Native库的最新版本。然后，在你的`AndroidManifest.xml`里增加Internet访问权限：

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

这个仅仅在调试模式从开发服务器加载JavaScript代码的时候用到，所以你可以在构建发行包的时候把这条语句去掉。

## 添加原生代码

你需要添加一些原生代码来启动React Native运行库以及让它渲染出东西来。我们接下来创建一个`Activity`和一个`ReactRootView`，然后在里面启动一个React应用并把它设置为`Activity`的主要内容视图。

```java
public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, "MyAwesomeApp", null);

        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

接下来，我们需要传递一些Activity的生命周期事件到`ReactInstanceManager`：

```java
@Override
protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onPause();
    }
}

@Override
protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onResume(this, this);
    }
}
```

我们还需要把Back按钮事件传递给React native：

```java
@Override
 public void onBackPressed() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
    } else {
        super.onBackPressed();
    }
}
```

这使得JavaScript代码可以控制当用户按下返回键的时候作何处理（譬如控制导航的切换等等）。如果JavaScript端不处理相应的事件，你的`invokeDefaultOnBackPressed` 方法会被调用。默认情况下，这会直接结束你的`Activity`。

最后，我们需要改动一下开发者菜单。默认情况下，开发者菜单可以通过摇晃设备来触发，不过这对模拟器不是很有用。所以我们让它在按下Menu键的时候也可以被显示：

```java
@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
        mReactInstanceManager.showDevOptionsDialog();
        return true;
    }
    return super.onKeyUp(keyCode, event);
}
```

到此为止，你的Activity已经可以启动并运行一些JavaScript代码。

## 把JS代码添加到你的应用

在你的工程根目录，运行以下代码：

```
$ npm init
$ npm install --save react-native
$ curl -o .flowconfig https://raw.githubusercontent.com/facebook/react-native/master/.flowconfig
```

上面的代码会创建一个node模块，然后`react-native`作为npm依赖添加。现在打开新创建的`package.json`文件然后在`scripts`字段下添加如下内容：

```javascript
"start": "node node_modules/react-native/local-cli/cli.js start"
```

复制并粘贴下面的这段代码到你工程根目录下的`index.android.js`——这是一个简单的React Native应用：

```js
'use strict';

var React = require('react-native');
var {
  Text,
  View
} = React;

class MyAwesomeApp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, World</Text>
      </View>
    )
  }
}
var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

React.AppRegistry.registerComponent('MyAwesomeApp', () => MyAwesomeApp);
```

## 运行你的应用

为了运行你的应用，首先要启动开发服务器。只需要在你的工程目录下运行这段代码：

    $ npm start

现在来构建和运行你的Android应用（譬如`./gradlew installDebug`）。一旦启动了React Native制作的Activity，它应该会从开发服务器加载代码并显示：

![Screenshot](img/EmbeddedAppAndroid.png)

## 在多个Activity/Fragment之间共享一个ReactInstance

你可以有多个Activity或者Fragment，它们可以使用同一个`ReactInstancemanager`。譬如你想创建自定义的"ReactFragmenet"或者"ReactActivity"，那么可能需要创建一个单例对象来保存`ReactInstanceManager`的引用。当你需要ReactInstanceManager或者传递一些Activity或者Fragment的生命周期事件的时候，可以使用单例对象所提供的引用。
