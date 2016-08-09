用于控制应用状态栏的组件。

### 与Navigator搭配的用法
`StatusBar`组件可以同时加载多个。此时属性会按照加载顺序合并（后者覆盖前者）。一个典型的用法就是在使用`Navigator`时，针对不同的路由指定不同的状态栏样式，如下：
```js
 <View>
   <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
   <Navigator
     initialRoute={{statusBarHidden: true}}
     renderScene={(route, navigator) =>
       <View>
         <StatusBar hidden={route.statusBarHidden} />
         ...
       </View>
     }
   />
 </View>
```

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="animated"></a>animated <span
            class="propType">bool</span> <a class="hash-link" href="#animated">#</a></h4>
        <div><p>指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="hidden"></a>hidden <span
            class="propType">bool</span> <a class="hash-link" href="#hidden">#</a></h4>
        <div><p>是否隐藏状态栏。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="backgroundcolor"></a><span
            class="platform">android</span>backgroundColor <span class="propType"><a href="colors.html">color</a></span>
        <a class="hash-link" href="#backgroundcolor">#</a></h4>
        <div><p>状态栏的背景色。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="translucent"></a><span
            class="platform">android</span>translucent <span class="propType">bool</span> <a class="hash-link"
                                                                                             href="#translucent">#</a>
    </h4>
        <div><p>指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="barstyle"></a><span class="platform">ios</span>barStyle
        <span class="propType">enum('default', 'light-content')</span> <a class="hash-link" href="#barstyle">#</a></h4>
        <div><p>设置状态栏文本的颜色。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="networkactivityindicatorvisible"></a><span
            class="platform">ios</span>networkActivityIndicatorVisible <span class="propType">bool</span> <a
            class="hash-link" href="#networkactivityindicatorvisible">#</a></h4>
        <div><p>指定是否显示网络活动提示符。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="showhidetransition"></a><span
            class="platform">ios</span>showHideTransition <span class="propType">enum('fade', 'slide')</span> <a
            class="hash-link" href="#showhidetransition">#</a></h4>
        <div><p>通过<code>hidden</code>属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'。</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

const React = require('react-native');
const {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBar,
} = React;

type BarStyle = 'default' | 'light-content';
type ShowHideTransition = 'fade' | 'slide';

type State = {
  animated: boolean,
  backgroundColor: string,
  hidden?: boolean,
  showHideTransition: ShowHideTransition,
  translucent?: boolean,
  barStyle?: BarStyle,
  networkActivityIndicatorVisible?: boolean
};

exports.framework = 'React';
exports.title = '<StatusBar>';
exports.description = 'Component for controlling the status bar';

const colors = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
];

const barStyles = [
  'default',
  'light-content',
];

const showHideTransitions = [
  'fade',
  'slide',
];

const StatusBarExample = React.createClass({
  getInitialState(): State {
    return {
      animated: true,
      backgroundColor: this._getValue(colors, 0),
      showHideTransition: this._getValue(showHideTransitions, 0),
    };
  },

  _colorIndex: 0,
  _barStyleIndex: 0,
  _showHideTransitionIndex: 0,

  _getValue(values: Array<any>, index: number): any {
    return values[index % values.length];
  },

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={this.state.backgroundColor}
          translucent={this.state.translucent}
          hidden={this.state.hidden}
          showHideTransition={this.state.showHideTransition}
          animated={this.state.animated}
          barStyle={this.state.barStyle}
          networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible}
        />
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => this.setState({animated: !this.state.animated})}>
            <View style={styles.button}>
              <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => this.setState({hidden: !this.state.hidden})}>
            <View style={styles.button}>
              <Text>hidden: {this.state.hidden ? 'true' : 'false'}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={styles.title}>iOS</Text>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => {
              this._barStyleIndex++;
              this.setState({barStyle: this._getValue(barStyles, this._barStyleIndex)});
            }}>
            <View style={styles.button}>
              <Text>style: '{this._getValue(barStyles, this._barStyleIndex)}'</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => this.setState({
              networkActivityIndicatorVisible: !this.state.networkActivityIndicatorVisible,
            })}>
            <View style={styles.button}>
              <Text>
                networkActivityIndicatorVisible:
                {this.state.networkActivityIndicatorVisible ? 'true' : 'false'}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => {
              this._showHideTransitionIndex++;
              this.setState({
                showHideTransition:
                this._getValue(showHideTransitions, this._showHideTransitionIndex),
              });
            }}>
            <View style={styles.button}>
              <Text>
                showHideTransition:
                '{this._getValue(showHideTransitions, this._showHideTransitionIndex)}'
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={styles.title}>Android</Text>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => {
              this._colorIndex++;
              this.setState({backgroundColor: this._getValue(colors, this._colorIndex)});
            }}>
            <View style={styles.button}>
              <Text>backgroundColor: '{this._getValue(colors, this._colorIndex)}'</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.wrapper}
            onPress={() => {
              this.setState({
                translucent: !this.state.translucent,
                backgroundColor: !this.state.translucent ? 'rgba(0, 0, 0, 0.4)' : 'black',
              });
            }}>
            <View style={styles.button}>
              <Text>translucent: {this.state.translucent ? 'true' : 'false'}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
});

exports.examples = [{
  title: 'Status Bar',
  render() {
    return <StatusBarExample />;
  },
}];

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});
```