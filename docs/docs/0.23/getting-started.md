## 环境需求

1. OS X - 本向导假设您的操作系统是OS X，因为这是开发iOS应用所必须的。
2. 推荐使用[Homebrew](http://brew.sh) 来安装Watchman和Flow
3. 安装[Node.js](http://nodejs.org/) 4.0或更高版本(译注：如果你并不使用Node.js开发网站，只是用于React Native的开发，那么请先安装homebrew，然后直接使用`brew install node`安装即可，不必按照下面的nvm的安装步骤)
  - 安装 **nvm**（安装向导在[这里](https://github.com/creationix/nvm#installation)）。然后运行`nvm install node && nvm alias default node`，这将会默认安装最新版本的Node.js并且设置好命令行的环境变量，这样你可以输入`node`命令来启动Node.js环境。nvm使你可以同时安装多个版本的Node.js，并且在这些版本之间轻松切换。
  - 如果你从未接触过npm，推荐阅读[npm的文档](https://docs.npmjs.com/)
4. 在命令行中输入`brew install watchman`，我们推荐安装[watchman](https://facebook.github.io/watchman/docs/install.html)，否则你可能会遇到一个Node.js监视文件系统的BUG。
5. 如果你希望使用[flow](http://www.flowtype.org/)来为js代码加上类型检查，那么在命令行中输入`brew install flow`来安装flow。（译注：新手可以跳过这一步）

我们推荐您定期运行`brew update && brew upgrade`来保持上述几个程序为最新版本。

## iOS开发环境准备

你需要安装[Xcode](https://developer.apple.com/xcode/downloads/) 7.0或者更高版本。你可以在App Store中找到并安装Xcode。

_译注：如果您选择从第三方网站/镜像下载Xcode，请务必从正规镜像网站下载验证文件Hash以防止类似XcodeGhost的安全风险发生，不要信任论坛、百度空间等分享渠道_

## Android开发环境准备

要使React Native应用支持Android，首先需要安装Android SDK (如果你不想连接安卓设备，那么还需要一个安卓模拟器)。参见 [Android开发指南](/docs/android-setup.html#content) 了解如何搭建安卓开发环境。

_注：_ 现在[Windows和Linux也在实验性的支持](/docs/linux-windows-support.html#content)Android开发。

_译注：_ Windows用户可以参考[这个帖子](http://bbs.reactnative.cn/topic/10)来搭建环境。


## 快速开始

```bash
    $ npm install -g react-native-cli
    $ react-native init AwesomeProject
```
译注：由于众所周知的网络原因，react-native命令行从npm官方源拖代码时会遇上麻烦。请将npm仓库源替换为国内镜像：  

```bash
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

另，执行init时切记不要在前面加上sudo（否则新项目的目录所有者会变为root而不是当前用户，导致一系列权限问题，请使用chown修复）。  
本站论坛区提供了[完整的绿色纯净新项目包](http://bbs.reactnative.cn/topic/11)。完整打包全部iOS和Android的第三方依赖，只要环境配置正确，无需科学上网漫长等待，解压即可直接运行。

**运行iOS应用**

- `$ cd AwesomeProject`
- 用XCode打开`ios/AwesomeProject.xcodeproj`并点击Run按钮。
- 使用你喜欢的文本编辑器打开`index.ios.js`并随便改上几行。
- 在iOS Emulator中按下`⌘-R`就可以刷新APP并看到你的最新修改！

**运行Android应用**

- `$ cd AwesomeProject`
- `$ react-native run-android`
- 使用你喜欢的文本编辑器打开`index.android.js`并随便改上几行
- 按Menu键（通常是F2，在Genymotion模拟器中是`⌘+M`）然后选择 *Reload JS* 就可以看到你的最新修改。
- 在终端下运行`adb logcat *:S ReactNative:V ReactNativeJS:V`可以看到你的应用的日志。


_注：_: 如果你打算在真实设备而非模拟器上运行，参见[在设备上运行](/docs/running-on-device-android.html#content)

恭喜！现在你已经成功运行并修改了你的第一个React Native应用！

_如果你在以上过程中遇到了任何问题，可以看看论坛里总结的[常见问题](http://bbs.reactnative.cn/topic/130)。_

## 为已有的React Native工程添加Android支持

如果你已经有了一个只有iOS版本的React Native工程，并且希望添加Android支持，你需要在你的工程目录下运行以下命令：

1. 打开`package.json`文件，在dependencies项中找到`react-native`，并将其后的版本号修改为[最新版本](https://www.npmjs.com/package/react-native)。
2. `$ npm install`
3. `$ react-native android`

