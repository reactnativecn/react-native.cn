---
layout: post
title:  "React Native Android生成发行包"
author: tdzl2003
date:   2015-09-18 08:00:00
categories: tutorials
---

## 生成bundle ##

目前npm上的版本以及官方的master均不能直接bundle android包。群友有[利用packager server下载bundle后的文件的实现](https://github.com/Spikef/envirs-react-native-cli/blob/master/usage/release-android-apk-cn.md)，使用此工具可以完成打包工作，但由于需要用到packager server，不适合用于持续集成(CI)打包的工作方式。

目前在[我的fork](http://www.github.com/hzerica/react-native)上，已经支持了react-native bundle方式的安卓打包，提交到官方的PR在[#2809](https://github.com/facebook/react-native/pull/2809),[#2812](https://github.com/facebook/react-native/pull/2812)，需要进行如下操作：

1. 配置好安卓开发环境，Windows用户参考[我昨天发的帖子](http://react-native.cn/tutorials/2015/09/16/react-native-android-on-windows.html),Mac用户参考[群友的教程](https://github.com/ggchxx/React-Native-Android-Config)

2. 进入工程目录，运行以下命令：

{% highlight bash %}
npm install git+https://github.com/hzerica/react-native.git
{% endhighlight %}

3. 需要打包时以下命令：

{% highlight bash %}
react-native bundle --platform android --minify
{% endhighlight %}

其中--minify参数决定生成的bundle是否被压缩混淆。

## 创建keystore ##

如果已经创建过keystore，可以跳过这一步。如果使用命令行创建，可以参考[网上的各种教程](https://www.baidu.com/s?wd=%E7%94%9F%E6%88%90keystore)。这里介绍使用Android Studio创建的方式。

```
点击菜单"Build-Generate Signed APK"，点击"Create New"按钮，选择保存的路径，填写密码、Alias、Alias密码、以及证书的详情（Name和Organization至少填一个），最后点击OK保存即可。
```

此时如果继续Generate Signed APK，config选择release，就已经可以生成可以运行的发行包了，不过为了支持持续集成，我们还需要更多工作。

## 设置keystore ##

```
在Project窗口中，右键点击app，点击菜单"Open Module Settings"，选择"Signing"标签，按"+"按钮，并填入刚才创建的Keystore和Alias，以及对应的密码。
```

```
不要关闭对话框，点击"Build Types"标签，左侧选择release，在右侧的Signing Config中选择刚刚创建的config
```

## 解决Lint error ##

React Native for Android的依赖库okio不能通过lint检测，因此需要添加例外。

在项目文件夹/android/app文件夹下创建lint.xml，内容如下：

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<lint>
    <issue id="InvalidPackage">
        <ignore regexp="okio-1.5.0.jar" />
    </issue>
</lint>
{% endhighlight %}

## 打包 ##

在工程目录下运行

{% highlight bash %}
gradlew build
{% endhighlight %}

即可完成打包。
