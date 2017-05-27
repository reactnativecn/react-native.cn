对于新手来讲[Navigator](navigator.html)和[NavigatorIOS](navigatorios.html)是一个很容易弄混的问题。

`Navigator`和`NavigatorIOS`都可以用来管理应用中“场景”的导航（也可以称作屏幕）。导航器建立了一个路由栈，用来弹出，推入或者替换路由状态。它们和html5中的[history API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)很类似。主要的区别在于`NavigatorIOS`使用了iOS中的[UINavigationController](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UINavigationController_Class/)类，而`Navigator`则完全用js重写了一个类似功能的React组件。因此`Navigator`可以兼容iOS和Android，而`NavigatorIOS`只能用于iOS。下面是两者具体的不同点：

# Navigator
- 扩展性的API设计使得它完全可以通过js定制。  
- React Native团队正在积极开发。  
- 使用JavaScript编写。
- iOS和Android都可以使用。
- 包含一个简单的导航栏`Navigator.NavigationBar`，类似`NavigatorIOS`的导航栏。同时也包含一个面包屑导航叫做`Navigator.BreadcrumbNavigationBar`。参考`UIExplorer demo`来学习如何使用它们。
	- 目前的动画效果不错并且还在改进中，但是还是没有苹果实现的`NavigatorIOS`精确。
- 你可以通过向`navigationBar`传递属性来提供你自己的导航栏。


# NavigatorIOS

- 轻量、受限的API设置，使其相对`Navigator`来说不太方便定制。
- 由开源社区主导开发 —— React Native的官方团队并不在自己的应用中使用。
	- 这样的结果是导致目前有一些积压的bug，而且没有人负责处理。
- 封装了UIKit，因此和其他原生应用表现完全一致。依赖Objective-C和JavaScript。
	- 因此你只能使用苹果开发好的动画和行为。
- 只支持iOS。
- 默认包含一个导航栏：这个导航栏不是React Native视图组件，因此只能稍微修改样式。

对于大多数正式的App开发，我们建议使用`Navigator` —— 使用`NavigatorIOS`实现复杂的需求很容易碰到麻烦。

