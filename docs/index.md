

---------

React Native使你能够在Javascript和[React](http://facebook.github.io/react/)的基础上获得完全一致的开发体验，构建世界一流的原生APP。

React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere)

Facebook已经在多项产品中使用了React Native，并且将持续地投入建设React Native。

---------

<div class="buttons-unit">
    <a type="button" href="/docs/getting-started.html#content" class="btn btn-lg btn-primary btn-start">开始使用React Native</a>
</div>

## 原生组件 ##

使用React Native，你可以使用标准的平台组件，例如iOS的UITabBar或安卓的Drawer。
这使你的app获得平台一致的视觉效果和体验，并且获得最佳的性能和流畅性。
使用对应的React component，就可以轻松地把这些原生组件整合到你的React Native应用中，
例如TabBarIOS和DrawerLayoutAndroid。

```javascript
// iOS

import React, {
  Component,
} from 'react';
import {
  TabBarIOS, 
  NavigatorIOS 
} from 'react-native';

class App extends Component {
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="React Native" selected={true}>
          <NavigatorIOS initialRoute={{ title: 'React Native' }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
```

```javascript
// Android

import React, {
  Component,
} from 'react';
import {
  DrawerLayoutAndroid, 
  ProgressBarAndroid, 
  Text 
} from 'react-native';

class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        renderNavigationView={() => <Text>React Native</Text>}>
        <ProgressBarAndroid />
      </DrawerLayoutAndroid>
    );
  }
}
```

## 异步执行##

在Javascript代码和原生平台之间的所有操作都是异步执行的，并且原生模块还可以根据需要创建新的线程。这意味着你可以在主线程解码图片，然后在后台将它保存到磁盘，或者在不阻塞UI的情况下计算文字大小和界面布局等等。所以React Native开发的app天然具备流畅和反应灵敏的优势。Javascript和原生代码之间的通讯是完全可序列化的，这使得我们可以借助Chrome开发者工具去调试应用，而不论应用运行在模拟器还是真机上。

参见[调试](/docs/debugging.html#content)

![](./img/chrome_breakpoint.png)

## 触摸事件处理 ##

React Native实现了一个强大的触摸事件处理系统，可以在复杂的View层次关系下正确地处理触摸事件。同时还提供了高度封装的组件如TouchableHighlight等，可以直接嵌入到ScrollView或者其它的元素中，无需额外配置。

```javascript
// iOS & Android

import React, {
  Component,
} from 'react';
import {
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native';

class TouchDemo extends Component {
  render() {
    return (
      <ScrollView>
        <TouchableHighlight onPress={() => console.log('pressed')}>
          <Text>Proper Touch Handling</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
```  
## 弹性盒(Flexbox)和样式 ##

控制view的布局应当简单易行，这就是为什么React Native从web中借鉴了Flexbox模型。Flexbox让大多数常见的UI布局构建变得简单（譬如带有外衬margin和内衬padding，且堆叠在一起的多个矩形）。React Native还支持多种常见的web样式，例如fontWeight等。抽象样式表提供了一个高性能的机制来声明所有的样式和布局，并且可以直接应用到你的组件中。  

```javascript
// iOS & Android

import React, {
  Component,
} from 'react';
import {
  Image, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

class ReactNative extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Image
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          style={styles.image}
        />
        <View style={styles.text}>
          <Text style={styles.title}>
            React Native
          </Text>
          <Text style={styles.subtitle}>
            Build high quality mobile apps using React
          </Text>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  row: { flexDirection: 'row', margin: 40 },
  image: { width: 40, height: 40, marginRight: 10 },
  text: { flex: 1, justifyContent: 'center'},
  title: { fontSize: 11, fontWeight: 'bold' },
  subtitle: { fontSize: 10 },
});
```

## 兼容通用标准 ##

React Native致力于改进视图代码的编写方式。除此之外，我们还吸纳了web生态系统中的通用标准，并在必要的时候为这些API提供兼容层。如此一来，npm上的许多库就可以在React Native中直接使用。这样的兼容层有XMLHttpRequest, window.requestAnimationFrame, navigator.geolocation等。我们还在努力增加更多的API，并且十分欢迎开源社区进行贡献。  

```javascript
// iOS & Android

import React, {
  Component,
} from 'react';
import {
  Text 
} from 'react-native';

class GeoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { position: 'unknown' };
  },
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => console.error(error)
    );
  }
  render() {
    return (
      <Text>
        Position: {JSON.stringify(this.state.position)}
      </Text>
    );
  }
}
```

## 扩展性 ##

使用React Native，无需编写一行原生代码即可创造一款不错的app。尽管如此，使用自定义的原生视图和模块来扩展React Native也非常容易 —— 这意味着你现有的所有工作都可以被复用，你喜欢的各种原生库都可以被导入。  

### 创建iOS模块 ###

想要创建一个iOS模块，只需要创建一个接口，实现RCTBridgeModule协议，然后把你想在Javascript中使用的任何方法用RCT_EXPORT_METHOD包装。最后，再用RCT_EXPORT_MODULE导出整个模块即可。
  
```objc
// Objective-C

#import "RCTBridgeModule.h"

@interface MyCustomModule : NSObject <RCTBridgeModule>
@end

@implementation MyCustomModule

RCT_EXPORT_MODULE();

// Available as NativeModules.MyCustomModule.processString
RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[input stringByReplacingOccurrencesOfString:@"Goodbye" withString:@"Hello"]]);
}
@end
```

```javascript
// JavaScript

import React, {
  Component,
} from 'react';
import {
  NativeModules,
  Text
} from 'react-native';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Goodbye World.' };
  }
  componentDidMount() {
    NativeModules.MyCustomModule.processString(this.state.text, (text) => {
      this.setState({text});
    });
  }
  render() {
    return (
      <Text>{this.state.text}</Text>
    );
  }
}
```

### 创建iOS View ###

若想自定义iOS View，可以这样来做：首先继承RCTViewManager类，然后实现一个-(UIView *)view方法，并且使用RCT_EXPORT_VIEW_PROPERTY宏导出属性。最后用一个Javascript文件连接并进行包装。  

```objc
// Objective-C

#import "RCTViewManager.h"

@interface MyCustomViewManager : RCTViewManager
@end

@implementation MyCustomViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MyCustomView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(myCustomProperty, NSString);
@end
```

```javascript
// JavaScript

import React, { 
  Component,
  requireNativeComponent
} from 'react-native';

var NativeMyCustomView = requireNativeComponent('MyCustomView', MyCustomView);

export default class MyCustomView extends Component {
  static propTypes = {
    myCustomProperty: React.PropTypes.oneOf(['a', 'b']),
  };
  render() {
    return <NativeMyCustomView {...this.props} />;
  }
}
```

### 创建Android模块 ###

同样的，Android也支持自定义扩展。仅仅是方法略有差异。

创建一个基础的安卓模块，需要先创建一个继承自ReactContentBaseJavaModule的类，然后使用@ReactMethod标注(Annotation)来标记那些你希望通过Javascript来访问的方法。最后，需要在ReactPackage中注册这个模块。   

```java
// Java

public class MyCustomModule extends ReactContextBaseJavaModule {

// Available as NativeModules.MyCustomModule.processString
  @ReactMethod
  public void processString(String input, Callback callback) {
    callback.invoke(input.replace("Goodbye", "Hello"));
  }
}
```

```javascript
// JavaScript

import React, {
  Component,
} from 'react';
import {
  NativeModules,
  Text
} from 'react-native';
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Goodbye World.' };
  },
  componentDidMount() {
    NativeModules.MyCustomModule.processString(this.state.text, (text) => {
      this.setState({text});
    });
  }
  render() {
    return (
      <Text>{this.state.text}</Text>
    );
  }
}
```

### 创建Android View ###

创建自定义的Android View，首先定义一个继承自SimpleViewManager的类，并实现createViewInstance和getName方法，然后使用@ReactProp标注导出属性，最后用一个Javascript文件连接并进行包装。  
  
```java
// Java

public class MyCustomViewManager extends SimpleViewManager<MyCustomView> {
  @Override
  public String getName() {
    return "MyCustomView";
  }

  @Override
  protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
    return new MyCustomView(reactContext);
  }

  @ReactProp(name = "myCustomProperty")
  public void setMyCustomProperty(MyCustomView view, String value) {
    view.setMyCustomProperty(value);
  }
}
```  

```javascript
// JavaScript

import React, {
  Component,
  requireNativeComponent 
} from 'react-native';

var NativeMyCustomView = requireNativeComponent('MyCustomView', MyCustomView);

export default class MyCustomView extends Component {
  static propTypes = {
    myCustomProperty: React.PropTypes.oneOf(['a', 'b']),
  };
  render() {
    return <NativeMyCustomView {...this.props} />;
  }
}
```
