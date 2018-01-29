使用React Native替代基于WebView的框架来开发App的一个强有力的理由，就是为了使App可以达到每秒60帧（足够流畅），并且能有类似原生App的外观和手感。因此我们也尽可能地优化React Native去实现这一目标，使开发者能集中精力处理App的业务逻辑，而不用费心考虑性能。但是，总还是有一些地方有所欠缺，以及在某些场合React Native还不能够替你决定如何进行优化（用原生代码写也无法避免），因此人工的干预依然是必要的。
本文的目的是教给你一些基本的知识，来帮你排查性能方面的问题，以及探讨这些问题产生的原因和推荐的解决方法。

## 关于“帧”你所需要知道的

老一辈人常常把电影称为“移动的画”，是因为视频中逼真的动态效果其实是一种幻觉，这种幻觉是由一组静态的图片以一个稳定的速度快速变化所产生的。我们把这组图片中的每一张图片叫做一帧，而每秒钟显示的帧数直接的影响了视频（或者说用户界面）的流畅度和真实感。iOS设备提供了每秒60的帧率，这就留给了开发者和UI系统大约16.67ms来完成生成一张静态图片（帧）所需要的所有工作。如果在这分派的16.67ms之内没有能够完成这些工作，就会引发‘丢帧’的后果，使界面表现的不够流畅。

下面要讲的事情可能更为复杂：请先调出你应用的开发菜单，打开`Show FPS Monitor`. 你会注意到有两个不同的帧率.

### JavaScript 帧率

对大多数React Native应用来说，业务逻辑是运行在JavaScript线程上的。这是React应用所在的线程，也是发生API调用，以及处理触摸事件等操作的线程。更新数据到原生支持的视图是批量进行的，并且在事件循环每进行一次的时候被发送到原生端，这一步通常会在一帧时间结束之前处理完（如果一切顺利的话）。如果JavaScript线程有一帧没有及时响应，就被认为发生了一次丢帧。 例如，你在一个复杂应用的根组件上调用了`this.setState`，从而导致一次开销很大的子组件树的重绘，可想而知，这可能会花费200ms也就是整整12帧的丢失。此时，任何由JavaScript控制的动画都会卡住。只要卡顿超过100ms，用户就会明显的感觉到。

这种情况经常发生在Navigator的切换过程中：当你push一个新的路由时，JavaScript需要绘制新场景所需的所有组件，以发送正确的命令给原生端去创建视图。由于切换是由JavaScript线程所控制，因此经常会占用若干帧的时间，引起一些卡顿。有的时候，组件会在`componentDidMount`函数中做一些额外的事情，这甚至可能会导致页面切换过程中多达一秒的卡顿。

另一个例子是触摸事件的响应：如果你正在JavaScript线程处理一个跨越多个帧的工作，你可能会注意到TouchableOpacity的响应被延迟了。这是因为JavaScript线程太忙了，不能够处理主线程发送过来的原始触摸事件。结果TouchableOpacity就不能及时响应这些事件并命令主线程的页面去调整透明度了。

### 主线程 (也即UI线程) 帧率

很多人会注意到，`NavigatorIOS`的性能要比Navigator好的多。原因就是它的切换动画是完全在主线程上执行的，因此不会被JavaScript线程上的掉帧所影响。（[阅读关于为何你仍然需要使用Navigator](using-navigators.html)）

同样，当JavaScript线程卡住的时候，你仍然可以欢快的上下滚动ScrollView，因为ScrollView运行在主线程之上（尽管滚动事件会被分发到JS线程，但是接收这些事件对于滚动这个动作来说并不必要）。

## 性能问题的常见原因

### console.log语句

在运行打好了离线包的应用时，控制台打印语句可能会极大地拖累JavaScript线程。注意有些第三方调试库也可能包含控制台打印语句，比如[redux-logger](https://github.com/evgenyrodionov/redux-logger)，所以在发布应用前请务必仔细检查，确保全部移除。


> 这里有个小技巧可以在发布时屏蔽掉所有的`console.*`调用。React Native中有一个全局变量`__DEV__`用于指示当前运行环境是否是开发环境。我们可以据此在正式环境中替换掉系统原先的console实现。

```js
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
```

这样在打包发布时，所有的控制台语句就会被自动替换为空函数，而在调试时它们仍然会被正常调用。


> 还有个[babel插件](https://babeljs.io/docs/plugins/transform-remove-console/)可以帮你移除所有的`console.*`调用。首先需要使用`yarn add --dev babel-plugin-transform-remove-console`来安装，然后在项目根目录下编辑（或者是新建）一个名为·.babelrc`的文件，在其中加入：

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

这样在打包发布时，所有的控制台语句就会被自动移除，而在调试时它们仍然会被正常调用。

### 开发模式 (dev=true) 

JavaScript线程的性能在开发模式下是很糟糕的。这是不可避免的，因为有许多工作需要在运行的时候去做，譬如使你获得良好的警告和错误信息，又比如验证属性类型（propTypes）以及产生各种其他的警告。

### 缓慢的导航器(Navigator)切换

如之前说，`Navigator`的动画是由JavaScript线程所控制的。想象一下“从右边推入”这个场景的切换：每一帧中，新的场景从右向左移动，从屏幕右边缘开始（不妨认为是320单位宽的的x轴偏移），最终移动到x轴偏移为0的屏幕位置。切换过程中的每一帧，JavaScript线程都需要发送一个新的x轴偏移量给主线程。如果JavaScript线程卡住了，它就无法处理这项事情，因而这一帧就无法更新，动画就被卡住了。

长远的解决方法，其中一部分是要允许基于JavaScript的动画从主线程分离。同样是上面的例子，我们可以在切换动画开始的时候计算出一个列表，其中包含所有的新的场景需要的x轴偏移量，然后一次发送到主线程以某种优化的方式执行。由于JavaScript线程已经从更新x轴偏移量给主线程这个职责中解脱了出来，因此JavaScript线程中的掉帧就不是什么大问题了 —— 用户将基本上不会意识到这个问题，因为用户的注意力会被流畅的切换动作所吸引。

新的[React Navigation](https://reactnavigation.org/)库的一大目标就是为了解决这个问题。React Navigation中的视图是原生组件，同时用到了运行在原生线程上的`Animated`动画库，因而性能表现十分流畅。

### ListView初始化渲染太慢以及列表过长时滚动性能太差
这是一个频繁出现的问题。因为iOS配备了UITableView，通过重用底层的UIViews实现了非常高性能的体验（相比之下ListView的性能没有那么好）。用React Native实现相同效果的工作仍正在进行中，但是在此之前，我们有一些可用的方法来稍加改进性能以满足我们的需求。

#### initialListSize 

这个属性定义了在首次渲染中绘制的行数。如果我们关注于快速的显示出页面，可以设置`initialListSize`为1，然后我们会发现其他行在接下来的帧中被快速绘制到屏幕上。而每帧所显示的行数由`pageSize`所决定。

#### pageSize 

在初始渲染也就是`initialListSize`被使用之后，ListView将利用`pageSize`来决定每一帧所渲染的行数。默认值为1 —— 但是如果你的页面很小，而且渲染的开销不大的话，你会希望这个值更大一些。稍加调整，你会发现它所起到的作用。

#### scrollRenderAheadDistance 

“在将要进入屏幕区域之前的某个位置，开始绘制一行，距离按像素计算。”

如果我们有一个2000个元素的列表，并且立刻全部渲染出来的话，无论是内存还是计算资源都会显得很匮乏。还很可能导致非常可怕的阻塞。因此`scrollRenderAheadDistance`允许我们来指定一个超过视野范围之外所需要渲染的行数。

#### removeClippedSubviews 

“当这一选项设置为true的时候，超出屏幕的子视图（同时`overflow`值为`hidden`）会从它们原生的父视图中移除。这个属性可以在列表很长的时候提高滚动的性能。默认为false。（0.14版本后默认为true）”

这是一个应用在长列表上极其重要的优化。Android上，`overflow`值总是`hidden`的，所以你不必担心没有设置它。而在iOS上，你需要确保在行容器上设置了`overflow: hidden`。

### 我的组件渲染太慢，我不需要立即显示全部

这在初次浏览ListView时很常见，适当的使用它是获得稳定性能的关键。就像之前所提到的，它可以提供一些手段在不同帧中来分开渲染页面，稍加改进就可以满足你的需求。此外要记住的是，ListView也可以横向滚动。

### 在重绘一个几乎没有什么变化的页面时，JS帧率严重降低

如果你正在使用一个ListView，你必须提供一个`rowHasChanged`函数，它通过快速的算出某一行是否需要重绘，来减少很多不必要的工作。如果你使用了不可变的数据结构，这项工作就只需检查其引用是否相等。

同样的，你可以实现`shouldComponentUpdate`函数来指明在什么样的确切条件下，你希望这个组件得到重绘。如果你编写的是纯粹的组件（返回值完全由props和state所决定），你可以利用`PureComponent`来为你做这个工作。再强调一次，不可变的数据结构在提速方面非常有用 —— 当你不得不对一个长列表对象做一个深度的比较，它会使重绘你的整个组件更加快速，而且代码量更少。

### 由于在JavaScript线程中同时做很多事情，导致JS线程掉帧

“导航切换极慢”是该问题的常见表现。在其他情形下，这种问题也可能会出现。使用`InteractionManager`是一个好的方法，但是如果在动画中，为了用户体验的开销而延迟其他工作并不太能接受，那么你可以考虑一下使用`LayoutAnimation`。

`Animated`的接口一般会在JavaScript线程中计算出所需要的每一个关键帧，而`LayoutAnimation`则利用了`Core Animation`，使动画不会被JS线程和主线程的掉帧所影响。

举一个需要使用这项功能的例子：比如需要给一个模态框做动画（从下往上划动，并在半透明遮罩中淡入），而这个模态框正在初始化，并且可能响应着几个网络请求，渲染着页面的内容，并且还在更新着打开这个模态框的父页面。了解更多有关如何使用LayoutAnimation的信息，请查看[动画指南](/docs/animations.html)。

注意：  
  
 - `LayoutAnimation`只工作在“一次性”的动画上（"静态"动画） -- 如果动画可能会被中途取消，你还是需要使用`Animated`。

### 在屏幕上移动视图（滚动，切换，旋转）时，UI线程掉帧

当具有透明背景的文本位于一张图片上时，或者在每帧重绘视图时需要用到透明合成的任何其他情况下，这种现象尤为明显。设置`shouldRasterizeIOS`或者`renderToHardwareTextureAndroid`属性可以显著改善这一现象。
注意不要过度使用该特性，否则你的内存使用量将会飞涨。在使用时，要评估你的性能和内存使用情况。如果你没有需要移动这个视图的需求，请关闭这一属性。

### 使用动画改变图片的尺寸时，UI线程掉帧

在iOS上，每次调整Image组件的宽度或者高度，都需要重新裁剪和缩放原始图片。这个操作开销会非常大，尤其是大的图片。比起直接修改尺寸，更好的方案是使用`transform: [{scale}]`的样式属性来改变尺寸。比如当你点击一个图片，要将它放大到全屏的时候，就可以使用这个属性。

### Touchable系列组件不能很好的响应 

有些时候，如果我们有一项操作与点击事件所带来的透明度改变或者高亮效果发生在同一帧中，那么有可能在`onPress`函数结束之前我们都看不到这些效果。比如在`onPress`执行了一个`setState`的操作，这个操作需要大量计算工作并且导致了掉帧。对此的一个解决方案是将`onPress`处理函数中的操作封装到`requestAnimationFrame`中：


```javascript
handleOnPress() {
  // 谨记在使用requestAnimationFrame、setTimeout以及setInterval时
  // 要使用TimerMixin（其作用是在组件unmount时，清除所有定时器）
  this.requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

## 分析

可以使用内置的分析器来同时获得有关在JavaScript线程和主线程代码执行的详细信息（通过从调试菜单中选择`perf monitor`来访问它）。

对于ios，`Instruments`是一个宝贵的工具，在android上，你应该学会使用`systrace`。

但首先，确保开发模式已经关闭！通过开发者面板`Dev Settings`关闭`JS Dev Mode`选项，你应该看到`__DEV__ === false, development-level warning are OFF, performance optimizations are ON` 在您的应用程序日志中。

另一种剖析javascript的方法是在调试时使用 Chrome profiler。这个结果是**不准确**的，因为代码运行在 Chrome 中，但会给你一个瓶颈可能发生的一般概念。在Chrome的`Performance`标签下运行profiler。在`User Timing`下会出现火焰图。要以表格形式查看更多详细信息，请单击下部上方的`Bottom Up`标签，然后在左上方菜单中选择`DedicatedWorker Thread`。

![Chrome Performance](https://user-images.githubusercontent.com/19166761/35501868-269a6bf6-0516-11e8-9f45-1c020c76b997.jpg)


### 用`systrace`分析Android UI性能

Android 支持10k+不同的手机，并且被广泛应用于软件渲染：框架体系结构和跨多终端的需求，意味着相对于 iOS 你会有更少的自由度。但是有时候，有些东西是可以改进的——很多时候它不是原生代码的问题！

调试的第一步是回答你的时间在每个16ms帧期间开销情况的问题。为此，我们将使用称为`systrace`的标准 Android 分析工具。

`systrace`是一个基于标记的 Android 标准分析工具（当你安装Android平台工具包的时候安装）。代码块被开始/结束标记包围，然后以彩色图表格式显示。Android SDK 和 React Native 框架都提供了可视化的标准标记。

#### 1. 运行 systrace

首先，将显示您想要调查的出现卡顿的设备通过USB连接到您的计算机，并在您想要进行收集信息的导航/动画之前将其启动。通过如下命令运行`systrace`：

```Bash
$ <path_to_android_sdk>/platform-tools/systrace/systrace.py --time=10 -o trace.html sched gfx view -a <your_package_name>
```

这个命令的快速分解：

- `time`收集trace的时间，以秒为单位
- `sched`, `gfx`和 `view` 是我们希望了解的Android SDK标记（标记集合）：`sched`为您提供了有关手机每个核心运行的信息，`gfx`为您提供了图形信息，例如框架边界，并且`view`为您提供了有关测量、布局及渲染方面的信息
- `-a <your_package_name>` 启动特定的应用程序标记, 特别是使用React Native 框架的应用。 `your_package_name` 可以在 `AndroidManifest.xml` 中找到，类似`com.example.app`

一旦 trace 开始收集，执行您关心的动画或交互。在追踪结束时，systrace将会给你一个你可以在 Chrome 中打开的跟踪链接。

#### 2. 查看 trace

在浏览器（最好是Chrome）打开 trace.html ，你会看到如下信息：

![Example](https://facebook.github.io/react-native/docs/assets/SystraceExample.png)

>**提示**：使用WASD键可以进行拖动和缩放

如果 trace.html打开失败，检查浏览器的consoles是否有：

![ObjectObserveError](https://facebook.github.io/react-native/docs/assets/ObjectObserveError.png)

由于在最近的浏览器中不推荐使用`object.observe`，所以您可能需要从Google Chrome跟踪工具中打开该文件。你可以这样做：

- 在Chrome中打开链接 [chrome://tracing](chrome://tracing/)
- 选择 Load
- 选择之前生成的trace文件（trace.html）

> **勾选 VSync highlighting**
>
> 选中该屏幕右上角的复选框以突出显示16ms帧边界：
>
> ![Enable VSync Highlighting](https://facebook.github.io/react-native/docs/assets/SystraceHighlightVSync.png)
>
> 你应该看到上面的截图斑马条纹。 如果你不这样做，试着在不同的设备上进行分析：三星已经知道显示vsyncs的问题，而Nexus系列通常非常可靠（译者：然而未必不见得）。



#### 3. 找到程序进程

找到程序的包名（或一部分）。 在这个例子里，我的包名是`com.facebook.adsmanager`，但因为内核线程名称限制的问题显示为 `book.adsmanager`。

在左边，你会看到一组与右边的时间线相对应的线程。有几个线程是我们关心的：`UI thread`（它有你的包名称或名称 UI 线程），`mqt_js ` 和 `mqt_native_modules`。如果你在Android 5+上运行，我们也关心 Render Thread。

- **UI Thread.**  这里记录了Android标准 measure/layout/draw 的发生。在右边的线程名称将是您的包名称（在我的案例是 book.adsmanager）或 UI Thread。在这个线程上看到的事件应该看起来像这样，具有`Choreographer`, `traversals`和 `DispatchUI`:

  ![UI Thread Example](https://facebook.github.io/react-native/docs/assets/SystraceUIThreadExample.png)

- **JS Thread.**  这里是JavaScript的执行情况，线程名称将是`mqt_j`或`<…>`，具体取决于设备上内核的协作方式。找出它，如果它没有一个名字，寻找像`JSCall`, `Bridge.executeJSCall`的标记：

  ![JS Thread Example](https://facebook.github.io/react-native/docs/assets/SystraceJSThreadExample.png)



- **Native Modules Thread.**  这里显示原生模块的调用 (比如 `UIManager`)。 线程名称是 `mqt_native_modules` 或 `<...>`。在后一种情况下识别它，寻找像 `NativeCall`, `callJavaModuleMethod`,  `onBatchComplete`的标记：![Native Modules Thread Example](https://facebook.github.io/react-native/docs/assets/SystraceNativeModulesThreadExample.png)



- **Bonus: Render Thread.** 如果你在使用 Android L (5.0) 或以上， 你的应用程序中也会有一个渲染线程，这个线程生成用来绘制你的UI的实际的OpenGL命令。 线程名称是 `RenderThread` 或 `<...>`. 在后一种情况下识别它，寻找像  `DrawFrame` 和 `queueBuffer`的标记:

  ![Render Thread Example](https://facebook.github.io/react-native/docs/assets/SystraceRenderThreadExample.png)

#### 找到罪魁祸首

一个流畅的动画应该看起来像下面这样：

![Smooth Animation](https://facebook.github.io/react-native/docs/assets/SystraceWellBehaved.png)

每一个颜色的变化都是一个帧——请记住，为了显示一帧，我们所有的UI工作都需要在这个16ms周期结束的时候完成。注意，没有线程靠近每帧的边界。trace 像这样的应用程序会以60fps呈现。

如果你感觉卡顿，你可能会看到这样的trace：

![Choppy Animation from JS](https://facebook.github.io/react-native/docs/assets/SystraceBadJS.png)

注意到 JS 线程基本上一直在执行，并跨越了单帧边界！这个应用程序不是在60帧/秒运行。在这种情况下，**问题在于 JS**。

你也可能会看到这样的情况：

![Choppy Animation from UI](https://facebook.github.io/react-native/docs/assets/SystraceBadUI.png)

在这种情况下，UI和渲染线程是跨越框架边界的工作线程。我们试图在每一帧上渲染的UI需要做太多的工作。在这种情况下，**问题在于原生视图渲染**。

在这一点上，你会有一些非常有用的信息来通知你的下一个步骤。



#### 解决 JavaScript 引起的问题

如果你发现了一个 JS 问题，在你正在执行的特定 JS 中寻找线索。在上面的情况中，我们看到 `RCTEventEmitter`每帧被多次调用。这里是跟踪放大的js线程：

![Too much JS](https://facebook.github.io/react-native/docs/assets/SystraceBadJS2.png)

这似乎不正确。为什么这么频繁呢？他们实际上是不同的事件？这些问题的答案可能取决于您的产品代码。很多时候，你会想看看  [shouldComponentUpdate](https://facebook.github.io/react/component-specs.md#updating-shouldcomponentupdate)。


#### 解决原生 UI 引起的问题

如果你确定了一个原生 UI 问题，通常有两种情况：

1. 你试图绘制每一帧的 UI 涉及太多的任务在 GPU 上，或者…
2. 您正在构建新的UI，在动画/交互期间（例如在滚动期间加载新内容）。

##### 太多 GPU 任务引起的问题

在第一种情况下，你将看到具有 UI thread 和/或 Render Thread 的跟踪，如下所示：

![Overloaded GPU](https://facebook.github.io/react-native/docs/assets/SystraceBadUI.png)

注意到，跨越每帧边界的`DrawFrame`花费的时间很长。这是等待 GPU 从前一帧消耗其命令缓冲区的时间。

为了减轻这一点，你应该：

- 使用 `renderToHardwareTextureAndroid` 对正在进行 animated/transformed 的复杂静态内容（例如，`Navigator` slide/ alpha 动画）
- 确保你**没有**使用 `needsOffscreenAlphaCompositing`，默认情况下它是禁用的，因为在大多数情况下，它大大增加了GPU上的每帧负载。

如果这些没有帮助，而且你想更深入地了解 GPU 究竟在做什么，那么你可以查看一下 [Tracer for OpenGL ES](http://developer.android.com/tools/help/gltracer.html)。

##### 构建新的 UI 引起的问题

在第二种情况下，你会看到更像这样的东西：

![Creating Views](https://facebook.github.io/react-native/docs/assets/SystraceBadCreateUI.png)

注意到，首先 JS thread 持续运行了一段时间，然后你看到一些工作在 native modules thread 上完成，之后在 UI thread 上进行了昂贵的遍历。

除非您能够推迟在交互之后创建新的 UI ，或者您可以简化创建的UI，否则没有一种简单的方法来减轻这种情况。React Native 团队正在为此设计一个基础架构级别的解决方案，这将允许在主线程（main thread）中创建和配置新的 UI，从而使交互顺利进行。


