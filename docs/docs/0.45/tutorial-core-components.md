组件是React Native应用的基石。一个典型的RN应用的用户界面(UI)是如何产生的？首先是声明组件（以及嵌套组件），然后组件被转换为了对应平台的原生UI组件。

下面介绍的是一些React Native应用中常用的核心组件，它们既可以单独使用，也可以组合使用。

## Text

React Native中最基础的组件莫过于[`Text`](text.html#content)组件了。`Text` 就是用于显示文本。

下面的代码演示了如何在设备上显示一个`"Hello"`。

```JavaScript
import React from 'react';
import { AppRegistry, Text } from 'react-native';

const App = () => {
  return (
    <Text>Hello World!</Text>
  );
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('MyApp', () => App);
```

## Image

另一个基础的React Native组件就是[`Image`](image.html#content)组件了。类似`Text`，`Image`也就是用于显示图片。

> `Image`就好比是网站中的`img`标签。

最简单的渲染图片的方法就是在`source`属性中指定一个源文件。

下面的代码在设备上显示了一个名为`check.png`的图片。

```JavaScript
import React from 'react';
import { AppRegistry, Image } from 'react-native';

const App = () => {
  return (
    <Image source={require('./img/check.png')} />
  );
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('MyApp', () => App);
```

## View

[`View`](view.html#content)是React Native应用中最基础的“容器”。`View`是对不同目标平台基础视图控件的抽象封装，比如它对应iOS上的`UIView` 。

> `View`就好比是网站中的`div`标签。

虽然像`Text`和`Image`这样的基础组件无需包装在`View`里也可以正常显示，但这并不是我们提倡的做法。将它们包装在`View`组件里，才更好控制其样式和布局。

下面的例子创建了一个`View`组件并将`Hello`这串字符对齐到了设备的顶端中部，而这如果仅仅依靠`Text`组件自身是实现不了的。（你尝试在这里只放一个`Text`组件而不用`View`包装起来，则文字只会显示在左上角):

```JavaScript
import React from 'react';
import { AppRegistry, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello!</Text>
    </View>
  );
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('MyApp', () => App);
```

## TextInput

很多应用还离不开用户的直接输入。发帖或者写评论就是一个典型的例子。[`TextInput`](textinput.html#content)就是让用户输入文本的基础组件。

下面的例子创建了一个简单的`TextInput`输入框，其中有空白时的占位文字`Hello`。

```JavaScript
import React from 'react';
import { AppRegistry, TextInput, View } from 'react-native';

const App = () => {
  return (
      <View>
        <TextInput placeholder="Hello" />
      </View>
  );
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('MyApp', () => App);
```

## ListView

在很多移动应用中，列表是个非常核心的元素。[`ListView`](listview.html#content) 组件是一个特制的[`View`](view.html#content)，用于显示数据可变的垂直滚动列表。

`ListView`组件有两个必需的属性：`dataSource`和`renderRow`。`dataSource`即为列表内容的实际数据来源。`renderRow`则根据数据渲染实际内容。

下面的例子创建了一个简单的`ListView`，并预设了一些模拟数据。它会首先初始化`datasource`，然后根据其数据来渲染`ListView` 。

> 要使用`ListView`，`rowHasChanged`函数也是必须的。这里我们只是简单的比较两行数据是否是同一个数据（===符号只比较基本类型数据的值，和引用类型的地址）来判断某行数据是否变化了。

```JavaScript
import React from 'react';
import { AppRegistry, Text, View, ListView} from 'react-native';

class SimpleList extends React.Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie'])
    };
  }
  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('MyApp', () => SimpleList);
```
