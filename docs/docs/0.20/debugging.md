如何访问App内的开发菜单：

1. 在iOS中晃动设备或者在模拟器上按下`control + ⌘ + z`。  
2. 在Android中晃动设备或者按下硬件菜单键（一般只有老设备或者大多数模拟器还有这个键。比如，在[genymotion](https://www.genymotion.com) 中你可以通过按下`⌘ + m`来模拟点击硬件菜单）。PC键盘上也有这个键，一般在标准键盘右边的Ctrl和右Windows键之间，即模拟鼠标右键的键。

> 提示


> 如何在成品（production builds）中关掉开发者菜单：


> 1. 对于iOS来说，在Xcode中打开你的项目，选择`Product → Scheme → Edit Scheme...` (或者按下 `⌘ + <`)。接着选择菜单上左边的`Run`，然后将构建设置(Build Configuration)更改为`Release`.
> 2. 在Android中，默认情况下gradle的release版本（比如使用gradle的`assembleRelease`任务来构建）就会关闭开发者菜单。你也可以通过给`ReactInstanceManager#setUseDeveloperSupport`传递需要的参数来定制这一行为。

## 刷新

选择开发者菜单中的`Reload`选项(或者在iOS模拟器上按下`⌘ + r`)即可重新加载应用的js代码。但如果你增加了新的资源(比如给iOS的`Images.xcassets`或是Andorid的`res/drawable`文件夹添加了图片)或者更改了任何的原生代码（objective-c/swift/java），那么就需要通过重新编译才能生效。

## Chrome开发者工具

在Chrome上调试js代码，需要在开发菜单中选择`Debug in Chrome`，这会打开一个新的[http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui)tab页。

在Chrome中，按下`⌘ + option + i`或者选择`视图(View) -> 开发者(Developer) -> 开发工具(Developer Tools)`来打开开发工具控制台。打开[有异常时暂停（Pause On Caught Exceptions）](http://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511)选项，能够获得更好的开发体验。  

__译注__：Chrome中并不能直接看到App的用户界面，而只能提供console的输出，以及在sources项中断点调试js脚本。

在真机上调试：

1. 在iOS上 —— 打开`RCTWebSocketExecutor.m`文件，将其中的`localhost`替换为你电脑的ip地址。然后晃动设备打开开发菜单，即可开始调试。
2. 对于Android设备 —— 如果你通过usb连接了一个Android 5.0或更高版本的设备，则可以通过`adb`命令建立一个从设备向电脑转发的端口：`adb reverse tcp:8081 tcp:8081`(点击[这里](http://developer.android.com/tools/help/adb.html)查看`adb`命令的帮助)。或者，你可以通过摇晃打开开发者菜单，选择`Dev Settings`，然后在`Debug server host for device`中设置你电脑的`ip地址:端口号`。

### React开发工具（可选的）

在Chrome上安装[React开发工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)。这个工具会在Chrome开发控制台中添加一个`React`选项卡，在这个选项卡里可以浏览组件的层级结构（点击[这里](https://github.com/facebook/react-devtools)查看更多信息）。__提示__：安装这一扩展可能需要科学上网，但是`调试并不需要安装这个扩展`，而且由于React Native目前迭代变化较大，`某些版本中可能无法开启这一调试扩展`。

## 实时刷新
这个选项可以在你的js代码变更了之后，自动触发所连设备或者模拟器自动刷新。以下是开启方法：

1. iOS平台上选择开发菜单中的`Enable Live Reload`即可开启js代码自动刷新。
2. Android平台上，先打开开发菜单，选择`Dev Settings`，然后选择`Auto reload on JS change`选项。

## FPS（每秒帧数）监视器
从`0.5.0-rc`及以上版本开始，你可以打开开发者选项中的FPS覆盖层来帮助你调试性能问题。
