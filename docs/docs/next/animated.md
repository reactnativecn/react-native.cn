The `Animated` library is designed to make animations fluid, powerful, and easy to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and simple `start/stop` methods to control time-based animation execution.

The simplest workflow for creating an animation is to to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`:

```javascript
Animated.timing(                            // Animate value over time
  this.state.fadeAnim,                      // The value to drive
  {
    toValue: 1,                             // Animate to final value of 1
  }
).start();                                  // Start the animation
```

Refer to the [动画](animations.html)文档 guide to see additional examples of Animated in action.

## 概览
There are two value types you can use with `Animated`:  

- `Animated.Value()` for single values  
- `Animated.ValueXY()` for vectors  

`Animated.Value` can bind to style properties or other props, and can be interpolated as well. A single `Animated.Value` can drive any number of properties.

### 配置动画

`Animated` provides three types of animation types. Each animation type provides a particular animation curve that controls how your values animate from their initial value to the final value:

- `Animated.decay()` starts with an initial velocity and gradually slows to a stop.
- `Animated.spring()` provides a simple spring physics model.
- `Animated.timing()` animates a value over time using [easin函数](easing.html).

In most cases, you will be using `timing()`. By default, it uses a symmetric easeInOut curve that conveys the gradual acceleration of an object to full speed and concludes by gradually decelerating to a stop.

### Working with animations 

Animations are started by calling `start()` on your animation. `start()` takes a completion callback that will be called when the animation is done. If the animation finished running normally, the completion callback will be invoked with `{finished: true}`. If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.

### Using the native driver 

By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

You can use the native driver by specifying `useNativeDriver: true` in your animation configuration. See the [Animations](animations.html#使用原生动画驱动) guide to learn more.

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="decay"></a><span class="propType">static </span>decay<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: DecayAnimationConfig)</span> <a class="hash-link" href="#decay">#</a></h4>
		<div>
			<p>推动一个值以一个初始的速度和一个衰减系数逐渐变为0。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="timing"></a><span class="propType">static </span>timing<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: TimingAnimationConfig)</span> <a class="hash-link" href="#timing">#</a></h4>
		<div>
			<p>推动一个值按照一个过渡曲线而随时间变化。<code>Easing</code>模块定义了一大堆曲线，你也可以使用你自己的函数。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="spring"></a><span class="propType">static </span>spring<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: SpringAnimationConfig)</span> <a class="hash-link" href="#spring">#</a></h4>
		<div>
			<p>产生一个基于Rebound和Origami实现的Spring动画。它会在<code>toValue</code>值更新的同时跟踪当前的速度状态，以确保动画连贯。可以链式调用。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="add"></a><span class="propType">static </span>add<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#add">#</a></h4><div>
	<p>将两个动画值相加计算，创建一个新的动画值。</p></div></div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="multiply"></a><span class="propType">static </span>multiply<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#multiply">#</a></h4><div>
<p>将两个动画值相乘计算，创建一个新的动画值。</p></div></div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="delay"></a><span class="propType">static </span>delay<span class="propType">(time: number)</span> <a class="hash-link" href="#delay">#</a></h4>
		<div>
			<p>在指定的延迟之后开始动画。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="sequence"></a><span class="propType">static </span>sequence<span class="propType">(animations: Array&lt;CompositeAnimation&gt;)</span> <a class="hash-link" href="#sequence">#</a></h4>
		<div>
			<p>按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="parallel"></a><span class="propType">static </span>parallel<span class="propType">(animations: Array&lt;CompositeAnimation&gt;, config?: ParallelConfig)</span> <a class="hash-link" href="#parallel">#</a></h4>
		<div>
			<p>同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。你可以通过<code>stopTogether</code>选项来改变这个效果。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stagger"></a><span class="propType">static </span>stagger<span class="propType">(time: number, animations: Array&lt;CompositeAnimation&gt;)</span> <a class="hash-link" href="#stagger">#</a></h4>
		<div>
			<p>一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。用来制作拖尾效果非常合适。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="event"></a><span class="propType">static </span>event<span class="propType">(argMapping: Array&lt;Mapping&gt;, config?: EventConfig)</span> <a class="hash-link" href="#event">#</a></h4>
		<div>
			<p>接受一个映射的数组，对应的解开每个值，然后调用所有对应的输出的<code>setValue</code>方法。例如：</p>
			<pre><code class="lang-javascript"> onScroll={<span class="hljs-keyword">this</span>.AnimatedEvent(
   [{nativeEvent: {contentOffset: {x: <span class="hljs-keyword">this</span>._scrollX}}}]
   {listener},          <span class="hljs-comment">// 可选的异步监听函数</span>
 )
 ...
 onPanResponderMove: <span class="hljs-keyword">this</span>.AnimatedEvent([
   <span class="hljs-literal">null</span>,                <span class="hljs-comment">// 忽略原始事件</span>
   {dx: <span class="hljs-keyword">this</span>._panX},    <span class="hljs-comment">// 手势状态参数</span>
 ]),
</code></pre>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="createanimatedcomponent"></a><span class="propType">static </span>createAnimatedComponent<span class="propType">(Component: any)</span> <a class="hash-link" href="#createanimatedcomponent">#</a></h4>
		<div>
			<p>使得任何一个React组件支持动画。用它来创建<code>Animated.View</code>等等。</p>
		</div>
	</div>
</div>

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="value"></a>Value<span class="propType">: AnimatedValue</span> <a class="hash-link" href="#value">#</a></h4>
		<div>
			<p>表示一个数值的类，用于驱动动画。通常用<code>new Animated.Value(0);</code>来初始化。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="valuexy"></a>ValueXY<span class="propType">: AnimatedValueXY</span> <a class="hash-link" href="#valuexy">#</a></h4>
		<div>
			<p>表示一个2D值的类，用来驱动2D动画，例如拖动操作等。</p>
		</div>
	</div>
</div>

## class AnimatedValue

用于驱动动画的标准值。一个`Animated.Value`可以用一种同步的方式驱动多个属性，但同时只能被一个行为所驱动。启用一个新的行为（譬如开始一个新的动画，或者运行`setValue`）会停止任何之前的动作。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(value: number)</span> <a class="hash-link" href="#constructor">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setvalue"></a>setValue<span class="propType">(value: number)</span> <a class="hash-link" href="#setvalue">#</a></h4>
		<div>
			<p>直接设置它的值。这个会停止任何正在进行的动画，然后更新所有绑定的属性。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setoffset"></a>setOffset<span class="propType">(offset: number)</span> <a class="hash-link" href="#setoffset">#</a></h4>
		<div>
			<p>设置一个相对值，不论接下来的值是由<code>setValue</code>、一个动画，还是<code>Animated.event</code>产生的，都会加上这个值。常用来在拖动操作一开始的时候用来记录一个修正值（譬如当前手指位置和View位置）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="flattenoffset"></a>flattenOffset<span class="propType">()</span> <a class="hash-link" href="#flattenoffset">#</a></h4>
		<div>
			<p>把当前的相对值合并到值里，并且将相对值设为0。最终输出的值不会变化。常在拖动操作结束后调用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addlistener"></a>addListener<span class="propType">(callback: ValueListenerCallback)</span> <a class="hash-link" href="#addlistener">#</a></h4>
		<div>
			<p>添加一个异步监听函数，这样你就可以监听动画值的变更。这有时候很有用，因为你没办法同步的读取动画的当前值，因为有时候动画会在原生层次运行。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removelistener"></a>removeListener<span class="propType">(id: string)</span> <a class="hash-link" href="#removelistener">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removealllisteners"></a>removeAllListeners<span class="propType">()</span> <a class="hash-link" href="#removealllisteners">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stopanimation"></a>stopAnimation<span class="propType">(callback?: ?(value: number) =&gt; void)</span> <a class="hash-link" href="#stopanimation">#</a></h4>
		<div>
			<p>停止任何正在运行的动画或跟踪值。<code>callback</code>会被调用，参数是动画结束后的最终值，这个值可能会用于同步更新状态与动画位置。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="interpolate"></a>interpolate<span class="propType">(config: InterpolationConfigType)</span> <a class="hash-link" href="#interpolate">#</a></h4>
		<div>
			<p>在更新属性之前对值进行插值。譬如：把0-1映射到0-10。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="animate"></a>animate<span class="propType">(animation: Animation, callback: EndCallback)</span> <a class="hash-link" href="#animate">#</a></h4>
		<div>
			<p>一般仅供内部使用。不过有可能一个自定义的动画类会用到此方法。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stoptracking"></a>stopTracking<span class="propType">()</span> <a class="hash-link" href="#stoptracking">#</a></h4>
		<div>
			<p>仅供内部使用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="track"></a>track<span class="propType">(tracking: Animated)</span> <a class="hash-link" href="#track">#</a></h4>
		<div>
			<p>仅供内部使用。</p>
		</div>
	</div>
</div>

## class AnimatedValueXY

用来驱动2D动画的2D值，譬如滑动操作等。API和普通的`Animated.Value`几乎一样，只不过是个复合结构。它实际上包含两个普通的`Animated.Value`。

例子：

```javascript
class DraggableView extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       pan: new Animated.ValueXY(), // inits to zero
     };
     this.state.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: Animated.event([null, {
         dx: this.state.pan.x, // x,y are Animated.Value
         dy: this.state.pan.y,
       }]),
       onPanResponderRelease: () => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {toValue: {x: 0, y: 0}} // Back to zero
         ).start();
       },
     });
   }
   render() {
     return (
       <Animated.View
         {...this.state.panResponder.panHandlers}
         style={this.state.pan.getLayout()}>
         {this.props.children}
       </Animated.View>
     );
   }
 }
```

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(valueIn?: ?{x: number | AnimatedValue; y: number | AnimatedValue})</span> <a class="hash-link" href="#constructor">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setvalue"></a>setValue<span class="propType">(value: {x: number; y: number})</span> <a class="hash-link" href="#setvalue">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setoffset"></a>setOffset<span class="propType">(offset: {x: number; y: number})</span> <a class="hash-link" href="#setoffset">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="flattenoffset"></a>flattenOffset<span class="propType">()</span> <a class="hash-link" href="#flattenoffset">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stopanimation"></a>stopAnimation<span class="propType">(callback?: ?() =&gt; number)</span> <a class="hash-link" href="#stopanimation">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addlistener"></a>addListener<span class="propType">(callback: ValueXYListenerCallback)</span> <a class="hash-link" href="#addlistener">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removelistener"></a>removeListener<span class="propType">(id: string)</span> <a class="hash-link" href="#removelistener">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getlayout"></a>getLayout<span class="propType">()</span> <a class="hash-link" href="#getlayout">#</a></h4>
		<div>
			<p>将一个<code>{x, y}</code>组合转换为<code>{left, top}</code>以用于样式。例如：</p>
			<pre><code class="lang-javascript"> style={<span class="hljs-keyword">this</span>.state.anim.getLayout()}
</code></pre>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="gettranslatetransform"></a>getTranslateTransform<span class="propType">()</span> <a class="hash-link" href="#gettranslatetransform">#</a></h4>
		<div>
			<p>将一个<code>{x, y}</code> 组合转换为一个可用的位移变换(translation transform)，例如：</p>
			<pre><code class="lang-javascript"> style={{
   transform: <span class="hljs-keyword">this</span>.state.anim.getTranslateTransform()
 }}
</code></pre>
		</div>
	</div>
</div>

 ### 例子

 ```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} = ReactNative;
var UIExplorerButton = require('./UIExplorerButton');

exports.framework = 'React';
exports.title = 'Animated - Examples';
exports.description = 'Animated provides a powerful ' +
  'and easy-to-use API for building modern, ' +
  'interactive user experiences.';

exports.examples = [
  {
    title: 'FadeInView',
    description: 'Uses a simple timing animation to ' +
      'bring opacity from 0 to 1 when the component ' +
      'mounts.',
    render: function() {
      class FadeInView extends React.Component {
        state: any;

        constructor(props) {
          super(props);
          this.state = {
            fadeAnim: new Animated.Value(0), // opacity 0
          };
        }
        componentDidMount() {
          Animated.timing(       // Uses easing functions
            this.state.fadeAnim, // The value to drive
            {
              toValue: 1,        // Target
              duration: 2000,    // Configuration
            },
          ).start();             // Don't forget start!
        }
        render() {
          return (
            <Animated.View   // Special animatable View
              style={{
                opacity: this.state.fadeAnim,  // Binds
              }}>
              {this.props.children}
            </Animated.View>
          );
        }
      }
      class FadeInExample extends React.Component {
        state: any;

        constructor(props) {
          super(props);
          this.state = {
            show: true,
          };
        }
        render() {
          return (
            <View>
              <UIExplorerButton onPress={() => {
                  this.setState((state) => (
                    {show: !state.show}
                  ));
                }}>
                Press to {this.state.show ?
                  'Hide' : 'Show'}
              </UIExplorerButton>
              {this.state.show && <FadeInView>
                <View style={styles.content}>
                  <Text>FadeInView</Text>
                </View>
              </FadeInView>}
            </View>
          );
        }
      }
      return <FadeInExample />;
    },
  },
  {
    title: 'Transform Bounce',
    description: 'One `Animated.Value` is driven by a ' +
      'spring with custom constants and mapped to an ' +
      'ordered set of transforms.  Each transform has ' +
      'an interpolation to convert the value into the ' +
      'right range and units.',
    render: function() {
      this.anim = this.anim || new Animated.Value(0);
      return (
        <View>
          <UIExplorerButton onPress={() => {
            Animated.spring(this.anim, {
              toValue: 0,   // Returns to the start
              velocity: 3,  // Velocity makes it move
              tension: -10, // Slow
              friction: 1,  // Oscillate a lot
            }).start(); }}>
            Press to Fling it!
          </UIExplorerButton>
          <Animated.View
            style={[styles.content, {
              transform: [   // Array order matters
                {scale: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                })},
                {translateX: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500],
                })},
                {rotate: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    '0deg', '360deg' // 'deg' or 'rad'
                  ],
                })},
              ]}
            ]}>
            <Text>Transforms!</Text>
          </Animated.View>
        </View>
      );
    },
  },
  {
    title: 'Composite Animations with Easing',
    description: 'Sequence, parallel, delay, and ' +
      'stagger with different easing functions.',
    render: function() {
      this.anims = this.anims || [1,2,3].map(
        () => new Animated.Value(0)
      );
      return (
        <View>
          <UIExplorerButton onPress={() => {
            var timing = Animated.timing;
            Animated.sequence([ // One after the other
              timing(this.anims[0], {
                toValue: 200,
                easing: Easing.linear,
              }),
              Animated.delay(400), // Use with sequence
              timing(this.anims[0], {
                toValue: 0,
                easing: Easing.elastic(2), // Springy
              }),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(
                  anim, {toValue: 200}
                )).concat(
                this.anims.map((anim) => timing(
                  anim, {toValue: 0}
                ))),
              ),
              Animated.delay(400),
              Animated.parallel([
                Easing.inOut(Easing.quad), // Symmetric
                Easing.back(1.5),  // Goes backwards first
                Easing.ease        // Default bezier
              ].map((easing, ii) => (
                timing(this.anims[ii], {
                  toValue: 320, easing, duration: 3000,
                })
              ))),
              Animated.delay(400),
              Animated.stagger(200,
                this.anims.map((anim) => timing(anim, {
                  toValue: 0,
                  easing: Easing.bounce, // Like a ball
                  duration: 2000,
                })),
              ),
            ]).start(); }}>
            Press to Animate
          </UIExplorerButton>
          {['Composite', 'Easing', 'Animations!'].map(
            (text, ii) => (
              <Animated.View
                key={text}
                style={[styles.content, {
                  left: this.anims[ii]
                }]}>
                <Text>{text}</Text>
              </Animated.View>
            )
          )}
        </View>
      );
    },
  },
  {
    title: 'Continuous Interactions',
    description: 'Gesture events, chaining, 2D ' +
      'values, interrupting and transitioning ' +
      'animations, etc.',
    render: () => (
      <Text>Checkout the Gratuitous Animation App!</Text>
    ),
  }
];

var styles = StyleSheet.create({
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
 ```