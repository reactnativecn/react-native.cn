---
layout: post
title:  "在Windows下搭建React Native Android开发环境"
author: tdzl2003
date:   2015-09-16 22:52:43
categories: tutorials
---

## 安装JDK ##

从[Java官网](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)下载JDK并安装。请注意选择x86还是x64版本。

推荐将JDK的bin目录加入系统PATH环境变量。

## 安装Android SDK ##

可以单独安装Android SDK，也可以通过Eclipse ADT或者Android Studio一并安装。推荐使用Android Studio，以下说明会默认以Android Studio的方式说明。请注意选择x86还是x64版本。

为了加速下载，推荐从[AndroidDevTools](http://androiddevtools.cn/)下载。

然后进入SDKManager(可通过Android Studio菜单Tools-Android-SDK Manager)，确保以下项目已经安装并更新到最新：

* Tools/Android SDK Tools (24.3.3)

* Tools/Android SDK Platform-tools (22)

* Tools/Android SDK Build-tools (23.0.1)

* Android 6.0 (API 23)/SDK Platform (1)

* Extras/Android Support Library(23.0.1)

推荐使用腾讯Bugly的镜像加速下载。[查看说明](http://android-mirror.bugly.qq.com:8080/include/usage.html)

推荐将SDK的platform-tools子目录加入系统PATH环境变量。

## 安装C++环境 ##

推荐从[itellyou](http://msdn.itellyou.cn/)下载并安装Visual Studio 2013或2015。也可选择Windows SDK、cygwin或mingw等其他C++环境。编译node.js的C++模块时需要用到。

## 安装node.js ##

从[官网](https://nodejs.org/)下载node.js的官方4.1版本或更高版本。

## 安装react-native命令行工具 ##

官方的安装方法是

{% highlight bash %}
npm install -g react-native-cli
{% endhighlight %}

但是由于npm上的版本在windows下存在BUG，因此需要安装github上的master支线，否则会在下一步骤报一下错误：

{% highlight bash %}
This will walk you through creating a new React Native project in ***
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: spawn npm ENOENT
    at exports._errnoException (util.js:837:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:178:32)
    at onErrorNT (internal/child_process.js:344:16)
    at doNTCallback2 (node.js:429:9)
    at process._tickCallback (node.js:343:17)
    at Function.Module.runMain (module.js:477:11)
    at startup (node.js:117:18)
    at node.js:951:3
{% endhighlight %}


如果您看到本文时0.12已经发布，那很可能直接输入上面的命令就行了。如果0.12还没有发布，请进行以下步骤：

在[React Native的Github页面](http://www.github.com/facebook/react-native)右侧点击Download ZIP，下载后解压，并执行以下代码：

{% highlight bash %}
cd **解压的目录**
cd react-native-cli
npm install -g
{% endhighlight %}


## 创建项目 ##

进入你的工作目录，运行

{% highlight bash %}
react-native init MyProject
{% endhighlight %}

并耐心等待数分钟。

## 运行packager ##

首先要修复package在windows下的两处BUG。

1、参考[这个commit](https://github.com/hzerica/react-native/commits/master-pr-5)，在node_modules/react-native/packager/react-packager/src/DependencyResolver/Module.js的getName()方法中，将

{% highlight javascript %}
            return path.join(name, path.relative(p.root, this.path));
{% endhighlight %}

修改为

{% highlight javascript %}
            return path.join(name, path.relative(p.root, this.path)).replace(/\\/g, '/');
{% endhighlight %}

注意，如果你在修改此行代码之前运行过packager，那你可能需要去C:\Users\你的用户名\AppData\Local\Temp中找到并删除所有 react-packager-cache 开头的文件。

2、参考[这个commit](https://github.com/hzerica/react-native/commit/4e852162d1f787e8d598a110db6296fa8c1bf9ae)，在node_modules/react-native/packager/react-packager/src/DependencyResolver/DependencyGraph/ResolutionRequest.js的_resolveNodeDependency(fromModule, toModuleName)方法中，将

{% highlight javascript %}
            for (let currDir = path.dirname(fromModule.path);
                currDir !== '/';
                currDir = path.dirname(currDir)) {
{% endhighlight %}

修改为

{% highlight javascript %}
			for (let currDir = path.dirname(fromModule.path);
                path.dirname(currDir) != currDir;
                currDir = path.dirname(currDir)) {
{% endhighlight %}

随后可以运行packager。

如果你有cygwin，可以在cygwin环境中进入工程目录，运行

{% highlight bash %}
npm start
{% endhighlight %}

如果没有cygwin或不在cygwin环境中，可以进入工程目录，运行

{% highlight bash %}
node node_modules\react-native\packager\packager.js
{% endhighlight %}

可以用浏览器访问[http://localhost:8081/index.android.bundle?platform=android](http://localhost:8081/index.android.bundle?platform=android)看看是否可以看到打包后的脚本。第一次访问通常需要十几秒，并且在packager的命令行可以看到进度条。如果迟迟看不到进度条，请检查上面的修改是否已经做到。

## 运行模拟器 ##

推荐使用[BlueStacks](http://bluestacks.com/)不过要小心它推送的广告和垃圾应用。

如果有真机，可以不必运行模拟器，要配置好驱动，使得adb devices可以看到对应的设备。

## 安卓真机运行 ##

保持packager开启，另外打开一个命令行窗口，然后在工程目录下运行

{% highlight bash %}
react-native run-android
{% endhighlight %}

首次运行需要等待数分钟并从网上下载gradle依赖。

运行完毕后可以在模拟器或真机上看到应用自动启动了。

如果gradle依赖下载出现报错，请多试几次，或者设置VPN加速。

如果apk安装运行出现报错，请检查platform-tools是否已经设到了PATH环境变量中，运行adb devices能否看到设备。

至此，应该能看到APP运行，并报错 Unable to download JS bundle

摇晃设备或按Menu键（Bluestacks模拟器按键盘上的菜单键，通常在右Ctrl的左边 或者左Windows键旁边），可以打开调试菜单，点击Dev Settings，选Debug server host for device，输入你的局域网IP，再按back键返回，再按Menu键，在调试菜单中选择Reload JS，就应该可以看到运行的结果了。

