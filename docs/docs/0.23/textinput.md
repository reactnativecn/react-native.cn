TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

最简单的用法就是丢一个`TextInput`到应用里，然后订阅它的`onChangeText`事件来读取用户的输入。它还有一些其它的事件，譬如`onSubmitEditing`和`onFocus`。一个简单的例子如下：

```javascript
 <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
  />
```

注意有些属性仅在`multiline`为true或者为false的时候有效。

### 截图
![](img/components/textinput.png)

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autocapitalize"></a>autoCapitalize <span class="propType">enum('none', 'sentences', 'words', 'characters')</span> <a class="hash-link" href="#autocapitalize">#</a></h4>
        <div>
            <p>控制TextInput是否要自动将特定字符切换为大写：</p>
            <ul>
                <li>characters: 所有的字符。</li>
                <li>words: 每个单词的第一个字符。</li>
                <li>sentences: 每句话的第一个字符（默认）。</li>
                <li>none: 不自动切换任何字符为大写。</li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autocorrect"></a>autoCorrect <span class="propType">bool</span> <a class="hash-link" href="#autocorrect">#</a></h4>
        <div>
            <p>如果为false，会关闭拼写自动修正。默认值是true。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autofocus"></a>autoFocus <span class="propType">bool</span> <a class="hash-link" href="#autofocus">#</a></h4>
        <div>
            <p>如果为true，在componentDidMount后会获得焦点。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="bluronsubmit"></a>blurOnSubmit <span class="propType">bool</span> <a class="hash-link" href="#bluronsubmit">#</a></h4>
        <div>
            <p>如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="defaultvalue"></a>defaultValue <span class="propType">string</span> <a class="hash-link" href="#defaultvalue">#</a></h4>
        <div>
            <p>提供一个文本框中的初始值。当用户开始输入的时候，值就可以改变。</p>
            <p>在一些简单的使用情形下，如果你不想用监听消息然后更新value属性的方法来保持属性和状态同步的时候，就可以用defaultValue来代替。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="editable"></a>editable <span class="propType">bool</span> <a class="hash-link" href="#editable">#</a></h4>
        <div>
            <p>如果为false，文本框是不可编辑的。默认值为true。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboardtype"></a>keyboardType <span class="propType">enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search')</span> <a class="hash-link" href="#keyboardtype">#</a></h4>
        <div>
            <p>决定弹出的何种软键盘的，譬如<code>numeric</code>（纯数字键盘）。</p>
            <p>这些值在所有平台都可用：</p>
            <ul>
            <li>default</li>
            <li>numeric</li>
            <li>email-address</li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="maxlength"></a>maxLength <span class="propType">number</span> <a class="hash-link" href="#maxlength">#</a></h4>
        <div>
            <p>限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="multiline"></a>multiline <span class="propType">bool</span> <a class="hash-link" href="#multiline">#</a></h4>
        <div>
            <p>如果为true，文本框中可以输入多行文字。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onblur"></a>onBlur <span class="propType">function</span> <a class="hash-link" href="#onblur">#</a></h4>
        <div>
            <p>当文本框失去焦点的时候调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onchange"></a>onChange <span class="propType">function</span> <a class="hash-link" href="#onchange">#</a></h4>
        <div>
            <p>当文本框内容变化时调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onchangetext"></a>onChangeText <span class="propType">function</span> <a class="hash-link" href="#onchangetext">#</a></h4>
        <div>
            <p>当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onendediting"></a>onEndEditing <span class="propType">function</span> <a class="hash-link" href="#onendediting">#</a></h4>
        <div>
            <p>当文本输入结束后调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onfocus"></a>onFocus <span class="propType">function</span> <a class="hash-link" href="#onfocus">#</a></h4>
        <div>
            <p>当文本框获得焦点的时候调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当组件挂载或者布局变化的时候调用，参数为<code>{x, y, width, height}</code>。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onsubmitediting"></a>onSubmitEditing <span class="propType">function</span> <a class="hash-link" href="#onsubmitediting">#</a></h4>
        <div>
            <p>此回调函数当软键盘的`确定`/`提交`按钮被按下的时候调用此函数。如果<code>multiline={true}</code>，此属性不可用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="placeholder"></a>placeholder <span class="propType">string</span> <a class="hash-link" href="#placeholder">#</a></h4>
        <div>
            <p>如果没有任何文字输入，会显示此字符串。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="placeholdertextcolor"></a>placeholderTextColor <span class="propType">string</span> <a class="hash-link" href="#placeholdertextcolor">#</a></h4>
        <div>
            <p>占位字符串显示的文字颜色。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="securetextentry"></a>secureTextEntry <span class="propType">bool</span> <a class="hash-link" href="#securetextentry">#</a></h4>
        <div>
            <p>如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false。</p>
        </div>
    </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="selectioncolor"></a>selectionColor <span class="propType">string</span> <a class="hash-link" href="#selectioncolor">#</a></h4>
		<div>
			<p>设置输入框高亮时的颜色（在iOS上还包括光标）</p>
		</div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType"><a href="text.html#style">Text#style</a></span> <a class="hash-link" href="#style">#</a></h4>
        <div>
            <p>Styles</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
        <div>
            <p>用来在端到端测试中定位这个视图。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="value"></a>value <span class="propType">string</span> <a class="hash-link" href="#value">#</a></h4>
        <div>
            <p>文本框中的文字内容。</p>
            <p>TextInput是一个受约束的(Controlled)的组件，意味着如果提供了value属性，原生值会被强制与value属性保持一致。在大部分情况下这都工作的很好，不过有些情况下会导致一些闪烁现象——一个常见的原因就是通过不改变value来阻止用户进行编辑。如果你希望阻止用户输入，可以考虑设置<code>editable={false}</code>；如果你是希望限制输入的长度，可以考虑设置<code>maxLength</code>属性，这两个属性都不会导致闪烁。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="clearbuttonmode"></a><span class="platform">ios</span>clearButtonMode <span class="propType">enum('never', 'while-editing', 'unless-editing', 'always')</span> <a class="hash-link" href="#clearbuttonmode">#</a></h4>
        <div>
            <p>是否要在文本框右侧显示“清除”按钮。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="cleartextonfocus"></a><span class="platform">ios</span>clearTextOnFocus <span class="propType">bool</span> <a class="hash-link" href="#cleartextonfocus">#</a></h4>
        <div>
            <p>如果为true，每次开始输入的时候都会清除文本框的内容。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="enablesreturnkeyautomatically"></a><span class="platform">ios</span>enablesReturnKeyAutomatically <span class="propType">bool</span> <a class="hash-link" href="#enablesreturnkeyautomatically">#</a></h4>
        <div>
            <p>如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboardappearance"></a><span class="platform">ios</span>keyboardAppearance <span class="propType">enum('default', 'light', 'dark')</span> <a class="hash-link" href="#keyboardappearance">#</a></h4>
        <div>
            <p>指定键盘的颜色。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="numberoflines"></a><span class="platform">android</span>numberOfLines <span class="propType">number</span> <a class="hash-link" href="#numberoflines">#</a></h4>
        <div>
            <p>设置输入框的行数。当multiline设置为true时使用它，可以占据对应的行数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onkeypress"></a><span class="platform">ios</span>onKeyPress <span class="propType">function</span> <a class="hash-link" href="#onkeypress">#</a></h4>
        <div>
            <p>当一个键被按下的时候调用此回调。被按下的键会作为参数传递给回调函数。会在onChange之前调用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="returnkeytype"></a><span class="platform">ios</span>returnKeyType <span class="propType">enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call')</span> <a class="hash-link" href="#returnkeytype">#</a></h4>
        <div>
            <p>决定“确定”按钮显示的内容。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="selecttextonfocus"></a><span class="platform">ios</span>selectTextOnFocus <span class="propType">bool</span> <a class="hash-link" href="#selecttextonfocus">#</a></h4>
        <div>
            <p>如果为true，当获得焦点的时候，所有的文字都会被选中。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="selectionstate"></a><span class="platform">ios</span>selectionState <span class="propType">DocumentSelectionState</span> <a class="hash-link" href="#selectionstate">#</a></h4>
        <div>
            <p>参见DocumentSelectionState.js，可以控制一个文档中哪段文字被选中的状态。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="underlinecolorandroid"></a><span class="platform">android</span>underlineColorAndroid <span class="propType">string</span> <a class="hash-link" href="#underlinecolorandroid">#</a></h4>
        <div>
            <p>文本框的下划线颜色(译注：如果要去掉文本框的边框，请将此属性设为透明transparent)。</p>
        </div>
    </div>
</div>
