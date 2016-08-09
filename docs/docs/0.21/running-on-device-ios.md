注意在iOS设备上运行React Native应用需要一个[Apple Developer account](https://developer.apple.com/register)并且把你的设备注册为测试设备。本向导只包含React Native相关的主题。

_译注_：从XCode 7起，在自己的设备上调试App不再需要开发者账户了。

## 从设备访问开发服务器

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上查看结果。这样做的前提是你的电脑和设备必须在同一个wifi环境下。

1. 打开`AwesomeApp/ios/AwesomeApp/AppDelegate.m`
2. 修改里面的URL，把`localhost`改为你的电脑的IP。在Mac系统下，你可以在系统设置/网络里找到电脑的IP地址。
3. 在XCode里选中你的设备作为运行目标，然后点击“Build and Run”。

> 提示
>
> 摇晃设备来打开开发菜单(重新加载、调试，等等……)

## 使用离线包

当你在真机上运行app时，所有的JavaScript代码和图片都会自动打包到App内部。这样可以脱离开发服务器运行，并最终提交到AppStore进行发布。

1. 打开`AwesomeApp/ios/AwesomeApp/AppDelegate.m`
2. 取消注释`jsCodeLocation = [[NSBundle mainBundle] ...`这一行。
3. 根据你的app选择的scheme的不同，会生成不同的离线包（Debug会生成带有警告的开发模式的包，Release则会生成压缩优化过的包）。要修改scheme的话，选择Xcode顶部菜单中的`Product > Scheme > Edit Scheme...`，在`Build Configuration`选项中切换选择`Debug`或是`Release`。

## 禁用应用内的开发者菜单

当我们发布应用之前，你应该把应用的“Schema”设置为`Release`，来禁用开发者菜单。文档[调试](debugging.html#debugging-react-native-apps)讲述了一些详细的操作方式。
