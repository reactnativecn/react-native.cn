### Chrome开发工具中的"React"选项无法使用
目前[无法使用](https://github.com/facebook/react-devtools/issues/229)开发工具中的"React"选项来查看App的组件。这是由于脚本在开发工具插件中的运行方式改变了;它们现在在Web Worker内部运行，插件并不知道，因此无法很好的和React Native进行通讯。  
即便如此，你仍然可以使用开发工具的Console和Sources选项，而且可以使用断点来调试JavaScript。为了能够使用Console功能，你必须确认在开发工具下拉菜单中选择入口文件为 ⚙debuggerWorker.js，（默认选择为&lt;top frame&gt;）。


### 缺失的Android模块和视图

虽然React Native的Android版本的开发工作晚于iOS版本，但目前大多数视图都在Android上实现了，除了下面几个例外：

#### 视图

- Maps —— 我们推荐使用Leland Richardson的[react-native-maps](https://github.com/lelandrichardson/react-native-maps)，它比我们内部实现的map功能更完善。   


#### 模块  
- Android推送通知 (请使用第三方模块，比如[react-native-jpush](https://github.com/reactnativecn/react-native-jpush))


### 某些属性仅仅支持单个平台

有些属性只能在单个平台上使用，这是由于这些特性仅有单个平台支持或者是尚未在其他平台上实现。所有这些都在JS文档中被`@platform`标注，并且左侧有一个小标记。

### 平台一致性
以下是一些本该（或将要）设计得更通用的API或组件：

- `<ViewPagerAndroid>`和`<ScrollView pagingEnabled={true}>`功能类似。我们或许希望统一成`<ViewPager>`。

- `ActivityIndicator`可以跨平台地渲染一个原生的加载（loading）指示器（目前在iOS上使用`ActivityIndicatorIOS`，而在Android上使用`ProgressBarAndroid`）

- `ProgressBar`可以跨平台渲染一个水平的进度条（目前只在iOS上支持，使用`ProgressViewIOS `） 


### 使用第三方的原生模块

[JS.coach](https://js.coach/react-native)上有很多非常优秀的第三方模块。  
在你的项目中集成这些模块应该并不困难，这里有一个[实际应用的例子](https://github.com/apptailor/react-native-google-signin)。

### overflow样式在Android默认为hidden而且无法更改

这是Android本身的渲染机制所致。我们没有实现这一特性，因为这是个大工程，而且我们还有很多其他重要的任务。  
Android的`overflow:hidden`还有另外一个问题：如果父容器有`borderRadius`圆角边框样式，那么即便开启了`overflow:hidden`也仍然无法把子视图超出圆角边框的部分裁切掉。这个问题只存在于Android上，iOS并没有这个问题（子视图的内容不会超出父容器的圆角边框）。你可以在[这里](https://rnplay.org/apps/BlGjdQ)看到问题的演示，以及在[这里](https://github.com/facebook/react-native/issues/3198)查看这个问题的报告以及后续进展。

### 视图阴影

`shadow`开头的[样式](view.html#style)现在可以在iOS上应用，而Android上对应的属性(props)是`elevation`。设置`elevation`属性就等价于使用原生的[`elevation API`](https://developer.android.com/training/material/shadows-clipping.html#Elevation)，因而也有同样的限制（比如最明显的就是需要Android 5.0以上版本）。此外还会影响到层叠视图在空间z轴上的顺序。  

### Android M（6.0）的权限

当前版本的React Native还不支持Android M的[权限模型](http://developer.android.com/training/permissions/requesting.html)。

### Android纯布局（Layout-only）节点

Android版本的React Native有一个优化的特性：有些视图，只起布局作用而没有对应的原生视图，那么只有它们的布局属性会被传递给子视图。这个优化对于深层次的视图的稳定性很重要因此默认开启。要关闭这个特性，请设置`collapsable`为false:  

```
<View collapsable={false}>
    ...
</View>
```

### PNG图片的内存问题
React Native Android 依靠[Fresco](https://github.com/facebook/fresco)载入和显示图片。目前我们关闭了下采样（downsampling）（这一特性还不稳定），因此有可能载入较大的PNG图片时会出现内存问题。  

### react-native init时卡住

尝试运行`react-native init`时加上`--verbose`参数，点这里[#2797](https://github.com/facebook/react-native/issues/2797)查看一般可能的原因。  
译注：由于众所周知的网络原因，react-native命令行从npm官方源拖代码时会遇上麻烦。请将npm仓库源替换为国内镜像：  

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```
另，执行init时切记不要在前面加上sudo（否则新项目的目录所有者会变为root而不是当前用户，导致一系列权限问题，请使用chown修复）。
又，react-native.cn中文网提供了完整的[绿色纯净新项目包](http://bbs.reactnative.cn/topic/11)。完整打包全部iOS和Android的第三方依赖，只要环境配置正确，无需科学上网漫长等待，解压后即可直接运行。

### 文本框的边界（border）

文本框默认的边界在视图的底部。这个边界有一个内衬（padding），这个padding由系统提供的背景图片所设定，并且无法改变。解决这个问题有两个方案，一是可以不指定高度，这样系统会自动处理，在恰当的位置显示边界；或者干脆通过设定[underlineColorAndroid](textinput.html#underlinecolorandroid)为透明来隐藏边界。
