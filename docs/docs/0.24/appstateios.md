`AppStateIOS`能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。

AppStateIOS通常在处理推送通知的时候用来决定内容和对应的行为。

### iOS App States

* `active` - 应用正在前台运行
* `background` - 应用正在后台运行。用户既可能在别的应用中，也可能在桌面。
* `inactive` - 这是一个过渡状态，发生在前后台切换时期，比如（双击HOME键）进入多任务窗口或是此时有来电。

要了解更多信息，可以阅读[Apple的文档](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)。

### 基本用法

要获取当前的状态，你可以使用`AppStateIOS.currentState`，这个变量会一直保持更新。不过在启动的过程中，`currentState`可能为null，直到`AppStateIOS`从原生代码得到通知为止。

```javascript
getInitialState: function() {
  return {
    currentAppState: AppStateIOS.currentState,
  };
},
componentDidMount: function() {
  AppStateIOS.addEventListener('change', this._handleAppStateChange);
},
componentWillUnmount: function() {
  AppStateIOS.removeEventListener('change', this._handleAppStateChange);
},
_handleAppStateChange: function(currentAppState) {
  this.setState({ currentAppState, });
},
render: function() {
  return (
    <Text>Current state is: {this.state.currentAppState}</Text>
  );
},
```

上面的这个例子只会显示"Current state is: active"，这是因为应用只有在`active`状态下才能被用户看到。并且null状态只会在一开始的一瞬间出现。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#addeventlistener">#</a></h4>
		<div>
			<p>添加一个监听函数，用于监听应用状态的变化。type参数应填<code>`change`</code> 。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4>
		<div>
			<p>移除一个监听函数。type参数应填<code>change</code>。</p>
		</div>
	</div>
</div>

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="currentstate"></a>currentState<span class="propType">: TypeCastExpression</span> <a class="hash-link" href="#currentstate">#</a></h4>
	</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react-native');
var {
  AppStateIOS,
  Text,
  View
} = React;

var AppStateSubscription = React.createClass({
  getInitialState() {
    return {
      appState: AppStateIOS.currentState,
      previousAppStates: [],
      memoryWarnings: 0,
    };
  },
  componentDidMount: function() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
    AppStateIOS.addEventListener('memoryWarning', this._handleMemoryWarning);
  },
  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
    AppStateIOS.removeEventListener('memoryWarning', this._handleMemoryWarning);
  },
  _handleMemoryWarning: function() {
    this.setState({memoryWarnings: this.state.memoryWarnings + 1});
  },
  _handleAppStateChange: function(appState) {
    var previousAppStates = this.state.previousAppStates.slice();
    previousAppStates.push(this.state.appState);
    this.setState({
      appState,
      previousAppStates,
    });
  },
  render() {
    if (this.props.showMemoryWarnings) {
      return (
        <View>
          <Text>{this.state.memoryWarnings}</Text>
        </View>
      );
    }
    if (this.props.showCurrentOnly) {
      return (
        <View>
          <Text>{this.state.appState}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>{JSON.stringify(this.state.previousAppStates)}</Text>
      </View>
    );
  }
});

exports.title = 'AppStateIOS';
exports.description = 'iOS app background status';
exports.examples = [
  {
    title: 'AppStateIOS.currentState',
    description: 'Can be null on app initialization',
    render() { return <Text>{AppStateIOS.currentState}</Text>; }
  },
  {
    title: 'Subscribed AppStateIOS:',
    description: 'This changes according to the current state, so you can only ever see it rendered as "active"',
    render(): ReactElement { return <AppStateSubscription showCurrentOnly={true} />; }
  },
  {
    title: 'Previous states:',
    render(): ReactElement { return <AppStateSubscription showCurrentOnly={false} />; }
  },
  {
    title: 'Memory Warnings',
    description: 'In the simulator, hit Shift+Command+M to simulate a memory warning.',
    render(): ReactElement { return <AppStateSubscription showMemoryWarnings={true} />; }
  },
];
```