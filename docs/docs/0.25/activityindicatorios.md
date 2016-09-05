### 截图
![activityindicatorios](img/components/activityindicatorios.png)

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="animating"></a>animating <span class="propType">bool</span> <a class="hash-link" href="#animating">#</a></h4>
        <div>
            <p>是否要显示指示器，默认为true，表示显示。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="color"></a>color <span class="propType">string</span> <a class="hash-link" href="#color">#</a></h4>
        <div>
            <p>滚轮的前景颜色（默认为灰色）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="hideswhenstopped"></a>hidesWhenStopped <span class="propType">bool</span> <a class="hash-link" href="#hideswhenstopped">#</a></h4>
        <div>
            <p>在没有动画的时候，是否要隐藏指示器（默认为true）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当组件挂载或者布局发生变化时调用，参数为：</p>
            <p>  {nativeEvent: { layout: {x, y, width, height}}}.</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="size"></a>size <span class="propType">enum('small', 'large')</span> <a class="hash-link" href="#size">#</a></h4>
        <div>
            <p>指示器的大小。small的高度为20，large为36。</p>
        </div>
    </div>
</div>

### 例子

```javascript
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');

var ToggleAnimatingActivityIndicator = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      animating: true,
    };
  },

  setToggleTimeout: function() {
    this.setTimeout(
      () => {
        this.setState({animating: !this.state.animating});
        this.setToggleTimeout();
      },
      1200
    );
  },

  componentDidMount: function() {
    this.setToggleTimeout();
  },

  render: function() {
    return (
      <ActivityIndicatorIOS
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<ActivityIndicatorIOS>';
exports.description = 'Animated loading indicators.';

exports.examples = [
  {
    title: 'Default (small, white)',
    render: function() {
      return (
        <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, {height: 40}]}
          color="white"
          />
      );
    }
  },
  {
    title: 'Gray',
    render: function() {
      return (
        <View>
          <ActivityIndicatorIOS
            style={[styles.centering, {height: 40}]}
          />
          <ActivityIndicatorIOS
            style={[styles.centering, {backgroundColor: '#eeeeee', height: 40}]}
          />
        </View>
      );
    }
  },
  {
    title: 'Custom colors',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicatorIOS color="#0000ff" />
          <ActivityIndicatorIOS color="#aa00aa" />
          <ActivityIndicatorIOS color="#aa3300" />
          <ActivityIndicatorIOS color="#00aa00" />
        </View>
      );
    }
  },
  {
    title: 'Large',
    render: function() {
      return (
        <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, {height: 80}]}
          color="white"
          size="large"
        />
      );
    }
  },
  {
    title: 'Large, custom colors',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicatorIOS
            size="large"
            color="#0000ff"
          />
          <ActivityIndicatorIOS
            size="large"
            color="#aa00aa"
          />
          <ActivityIndicatorIOS
            size="large"
            color="#aa3300"
          />
          <ActivityIndicatorIOS
            size="large"
            color="#00aa00"
          />
        </View>
      );
    }
  },
  {
    title: 'Start/stop',
    render: function(): ReactElement {
      return <ToggleAnimatingActivityIndicator />;
    }
  },
];

var styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
```