## Cmd-R在模拟器里不能重新加载应用

在菜单`Hardware > KeyboardMenu`中启用iOS模拟器的"Connect hardware keyboard"。

![Keyboard Menu](https://cloud.githubusercontent.com/assets/1388454/6863127/03837824-d409-11e4-9251-e05bd31d978f.png)

如果你使用的键盘不是QWERTY或AZERTY布局，你可以在菜单中选择`Hardware > Shake Gesture`来打开开发者菜单，然后点击"Reload"刷新应用。

## 端口已被使用

可能别的进程正在使用8081端口，你可以尝试关闭它或者尝试修改packager所监听的端口。

##### 关闭使用8081端口的进程

```bash
$ sudo lsof -n -i4TCP:8081 | grep LISTEN`
```

然后

```bash
$ kill -9 <上面显示的进程ID>
```

##### Windows用户

```bash
> netstat -o -p TCP
```

结果的第二列中冒号后面的部分为端口号，找到端口号为8081的行，该行最后一列的数字为进程ID

```bash
> tskill <进程ID>
```

##### 在XCode中改变端口号

编辑`AppDelegate.m`来更换端口号

```
  // OPTION 1
  // Load from development server. Start the server from the repository root:
  //
  // $ npm start
  //
  // To run on device, change `localhost` to the IP address of your computer, and make sure your computer and
  // iOS device are on the same Wi-Fi network.
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:9381/index.ios.bundle"];
```

## Mac系统下提示错误提示“Watchman took to long to load”

某些版本的Watchman存在一个BUG，权限设置会导致它无法正常启动。最近的一个更新解决了这个问题，如果你遇到了这个错误提示，重新安装最新版本的Watchman：

```bash
brew uninstall watchman
brew install --HEAD watchman
```

## NPM locking error

如果你在执行`react-native init <project>`的过程中遇到npm报错："npm WARN locking Error: EACCESS"，可以尝试执行：

```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

## 在Chrome中调试卡住或者不能正常调试

有可能你的某个Chrome扩展正在和调试器进行意外的交互。如果你遇到了这个问题，可以尝试禁用你的全部扩展，然后逐个启用，直到找到导致问题的扩展。

## XCode构建失败

检查导致构建失败的具体原因，在左侧边栏进入"Issue"页面

##### 缺少React库

如果你使用CocoaPods，检查你是否已经在`Podfile`中增加了React的相关声明。举例来说，如果你正在使用`<Text />`， `<Image />`和`fetch()`三个API，你需要在`Podfile`中增加以下内容：

```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

接下来，确保你执行过`pod install`命令，并且`Pods/`目录已经被创建，并且React的相关库已经被安装。CocoaPods会引导你从此使用生成的`.xcworkspace`文件，以使用刚刚安装的依赖。

如果你手动添加React库，确保你已经引用了全部的相关依赖，譬如`RCTText.xcodeproj`，`RCTImage.xcodeproj`。要添加哪些依赖取决于你使用了哪些功能。接下来，每个依赖工程所产生的二进制文件要被链接到你的应用程序中。在XCode的工程设置里，找到`Linked Frameworks and Binarys`区域。更多的详细步骤参考[使用链接库](/docs/linking-libraries-ios.html#content)。

##### 报错：“Argument list too long: recursive header expansion failed”

在工程的`Build Settings`面板中，`User Search Header Paths`和`Header Search Paths`选项用于控制XCode在什么目录下寻找代码中`#import`所引用的头文件。对Pods来说，CocoaPods会配置一个默认的查找目录的数组。检查这个选项确保它没有被一个新配置覆盖，并且其中没有配置一个很大的目录。如果其中的某个目录很大，XCode在尝试递归搜索整个目录结构的时候可能会报出以上的错误。

要想把`User Search Header Paths`和`Header Search Paths`恢复到CocoaPods所指定的默认值，首先选中Build Settings面板中的这两个字段，然后按下Delete键。这将会删除自定义的配置，然后恢复到CocoaPods所指定的默认配置。

## 无法连接到开发服务器

##### iOS

确保你的设备和你的电脑在同一个网段下。如果你的设备正在使用2G/3G/4G上网，就没有办法访问你的电脑的本地IP。

##### Android

对于Android 5.0以上设备，你可以运行`adb reverse tcp:8081 tcp:8081`来使得你的设备可以访问到你的电脑。

## 使用`WebSocket`的模块（譬如Firebase）抛出了异常

React Native实现了一套WebSockets的接口兼容(POLYFILLS)。这些兼容组件作为react-native模块的一部分来初始化，所以如果你在`require('react-native')`之前引用了使用WebSockets的模块，就可能会产生错误。确保在你的程序中，最先`require('react-native')`

像这样：

```
var ReactNative = require('react-native');
var Firebase = require('firebase');
```

感谢Issue [#3645](https://github.com/facebook/react-native/issues/3645)发现此问题。如果你对相关内容好奇，可以阅读[InitializeJavaScriptAppEngine.js](https://github.com/facebook/react-native/blob/master/Libraries/JavaScriptAppEngine/Initialization/InitializeJavaScriptAppEngine.js)，WebSocket的接口兼容在这个文件中被初始化。