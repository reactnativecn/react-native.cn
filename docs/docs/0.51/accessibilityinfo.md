有时我们很希望知道设备是否拥有屏幕阅读器与它的开启状态， `AccessibilityInfo` API因此而设计。 您不但可以查询屏幕阅读器的当前状态，而且可以监听屏幕阅读器状态的改变。

这里有一个小例子解释如何使用 `AccessibilityInfo`:

```js
class ScreenReaderStatusExample extends React.Component {
  state = {
    screenReaderEnabled: false,
  }

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'change',
      this._handleScreenReaderToggled
    );
    AccessibilityInfo.fetch().done((isEnabled) => {
      this.setState({
        screenReaderEnabled: isEnabled
      });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'change',
      this._handleScreenReaderToggled
    );
  }

  _handleScreenReaderToggled = (isEnabled) => {
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  }

  render() {
    return (
      <View>
        <Text>
          The screen reader is {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }
}
```

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="fetch"></a><span class="methodType">static </span>fetch<span
            class="methodType">()</span> <a class="hash-link" href="#fetch">#</a></h4>
        <div><p>查询屏幕阅读器是否可用，返回一个布尔值的异步结果。当结果为 <code>true</code> 表示可用，反之为不可。</div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="addeventlistener"></a><span class="methodType">static </span>addEventListener<span
            class="methodType">(eventName, handler)</span> <a class="hash-link"
                                                              href="#addeventlistener">#</a>
    </h4>
        <div><p>添加事件处理函数. 支持以下事件:</p>
            <ul>
                <li><code>change</code>: 当屏幕阅读器状态发生改变时的监听函数，回调的参数为一个布尔值，当为<code>true</code> 时表示屏幕阅读器可用，反之为不可。
                </li>
                <li><code>announcementFinished</code>: 仅限iOS可用。屏幕阅读器播报完成的监听函数，回调的参数为一个包含了以下值的dictionary：
                    <ul>
                        <li><code>announcement</code>: 屏幕阅读器的播报字符串</li>
                        <li><code>success</code>: 是否被成功播报的布尔值
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="setaccessibilityfocus"></a><span
            class="methodType">static </span>setAccessibilityFocus<span class="methodType">(reactTag)</span> <a
            class="hash-link" href="#setaccessibilityfocus">#</a></h4>
        <div><p>仅限iOS可用。 设置焦点位置。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="announceforaccessibility"></a><span
            class="methodType">static </span>announceForAccessibility<span class="methodType">(announcement)</span> <a
            class="hash-link" href="#announceforaccessibility">#</a></h4>
        <div><p>仅限iOS可用。设置屏幕阅读器播报的字符串。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="removeeventlistener"></a><span class="methodType">static </span>removeEventListener<span
            class="methodType">(eventName, handler)</span> <a class="hash-link"
                                                              href="#removeeventlistener">#</a>
    </h4>
        <div><p>移除一个监听函数。</p></div>
    </div>
</div>
