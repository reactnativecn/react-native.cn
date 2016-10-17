## 准备正式发布应用

当你使用React Native做好一个漂亮的应用之后，一定跃跃欲试想要在App Store上发布了吧。发布的流程和其他iOS原生应用完全一样，除了以下一些注意事项。

### 禁用应用内的开发者菜单

在我们发布应用之前，应该把应用的“Schema”设置为`Release`，来禁用开发者菜单。[调试](debugging.html#debugging-react-native-apps)文档中讲述了详细的操作方式。

### 使用离线包

可以设置将所有的JavaScript代码和图片都打包到App内部，这样可以脱离开发服务器运行，并最终提交到AppStore进行公测或发布。

1. 打开`AwesomeApp/ios/AwesomeApp/AppDelegate.m`
2. 取消注释`jsCodeLocation = [[NSBundle mainBundle] ...`这一行。
3. 根据你的app选择的scheme的不同，会生成不同的离线包（Debug会生成带有警告的开发模式的包，Release则会生成压缩优化过的包）。要修改scheme的话，选择Xcode顶部菜单中的`Product > Scheme > Edit Scheme...`，在`Build Configuration`选项中切换选择`Debug`或是`Release`。


### App Transport Security

**App Transport Security**(简称ATS)是iOS 9中新增的一项安全特性。在默认设置下，只允许HTTPS的请求，而所有HTTP的请求都会被拒绝。详情可参考[这篇帖子](https://segmentfault.com/a/1190000002933776)。