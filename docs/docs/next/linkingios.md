注：`LinkingIOS `现已过时，请使用跨平台的[`Linking`](linking.html)组件。 

`LinkingIOS`提供了一个通用的接口来与传入和传出的App链接进行交互。

### 基本用法

#### 处理链接

如果你的应用被其注册过的外部url调起，则可以在任何组件内这样获取和处理它：

```javascript
componentDidMount() {
 var url = LinkingIOS.popInitialURL();
}
```

如果要在App启动后也监听传入的App链接，那么需要在`AppDelegate.m`中增加以下代码：

```objective-c
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
   sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
 {
   return [RCTLinkingManager application:application openURL:url
                       sourceApplication:sourceApplication annotation:annotation];
 }

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
 {
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
 }
```

然后你的React组件就可以监听`LinkingIOS`的相关事件：

```javascript
componentDidMount() {
  LinkingIOS.addEventListener('url', this._handleOpenURL);
},
componentWillUnmount() {
  LinkingIOS.removeEventListener('url', this._handleOpenURL);
},
_handleOpenURL(event) {
  console.log(event.url);
}
```

#### 触发应用链接

要触发一个App链接（打开浏览器、邮箱或者其它的应用），只需调用：

```javascript
LinkingIOS.openURL(url)
```
如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：

```javascript
LinkingIOS.canOpenURL(url, (supported) => {
  if (!supported) {
    AlertIOS.alert('Can\'t handle url: ' + url);
  } else {
    LinkingIOS.openURL(url);
  }
});
```

### 方法

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#addeventlistener">#</a></h4>
        <div>
            <p>添加一个监听LinkingIOS变化的事件。type参数应填<code>`url`</code>，并提供一个处理函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4>
        <div>
            <p>删除一个事件处理函数。type参数应填<code>`url`</code>。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="openurl"></a><span class="propType">static </span>openURL<span class="propType">(url: string)</span> <a class="hash-link" href="#openurl">#</a></h4>
        <div>
            <p>尝试使用设备上已经安装的应用打开指定的<code>url</code>。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="canopenurl"></a><span class="propType">static </span>canOpenURL<span class="propType">(url: string, callback: Function)</span> <a class="hash-link" href="#canopenurl">#</a></h4>
        <div>
            <p>判断设备上是否有已经安装的应用可以处理指定的URL。回调函数的参数只有一个：<code>bool supported</code></p>
            <p>注：对于iOS 9以上版本，你还需要在<code>Info.plist</code>中添加<code>LSApplicationQueriesSchemes</code>字段。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="popinitialurl"></a><span class="propType">static </span>popInitialURL<span class="propType">()</span> <a class="hash-link" href="#popinitialurl">#</a></h4>
        <div>
            <p>如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回<code>null</code>。</p>
        </div>
    </div>
</div>