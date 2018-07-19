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
        <div><p>Add an event handler. Supported events:</p>
            <ul>
                <li><code>change</code>: Fires when the state of the screen reader changes. The argument
                    to the event handler is a boolean. The boolean is <code>true</code> when a screen
                    reader is enabled and <code>false</code> otherwise.
                </li>
                <li><code>announcementFinished</code>: iOS-only event. Fires when the screen reader has
                    finished making an announcement. The argument to the event handler is a dictionary
                    with these keys:
                    <ul>
                        <li><code>announcement</code>: The string announced by the screen reader.</li>
                        <li><code>success</code>: A boolean indicating whether the announcement was successfully made.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="setaccessibilityfocus"></a><span
            class="methodType">static </span>setAccessibilityFocus<span class="methodType">(reactTag)</span> <a
            class="hash-link" href="#setaccessibilityfocus">#</a></h4>
        <div><p>iOS-Only. Set accessibility focus to a react component.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="announceforaccessibility"></a><span
            class="methodType">static </span>announceForAccessibility<span class="methodType">(announcement)</span> <a
            class="hash-link" href="#announceforaccessibility">#</a></h4>
        <div><p>iOS-Only. Post a string to be announced by the screen reader.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="removeeventlistener"></a><span class="methodType">static </span>removeEventListener<span
            class="methodType">(eventName, handler)</span> <a class="hash-link"
                                                              href="#removeeventlistener">#</a>
    </h4>
        <div><p>Remove an event handler.</p></div>
    </div>
</div>
