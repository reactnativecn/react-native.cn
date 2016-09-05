本指南主要介绍在Android模拟器上运行React Native Android应用所必须的准备步骤。

### 安装Git

  - **Mac**上如果你已经安装了[XCode](https://developer.apple.com/xcode/)，那么Git也就随之安装了，否则请使用homebrew进行安装：

         brew install git

  - **Linux**上请使用你系统对应的[包管理器](https://git-scm.com/download/linux)来安装Git。

  - **Windows**上请下载并安装[Git for Windows](https://git-for-windows.github.io/)。在安装过程中，请务必记得勾选`Run Git from Windows Command Prompt`，这样会把Git的可执行程序加入到`PATH`环境变量中，这样其他程序才能在命令行中正确调用Git。 
  

### 安装Android SDK(已安装的请跳过这一步)

1. [安装最新版的JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

2. 安装Android SDK: 
  - **Mac**: `brew install android-sdk`  
  - **Linux或Windows**: [从Android开发者官网下载](https://developer.android.com/sdk/installing/index.html)  
__译注__：国内用户推荐从[AndroidDevTools](http://androiddevtools.cn/)下载。

### 定义ANDROID_HOME环境变量

__重要__: 确保`ANDROID_HOME`环境变量指向你已经安装的Android SDK目录:

  - **Mac**, 往你的`~/.bashrc`, `~/.bash_profile` 或者你终端所用的其它配置文件中增加以下内容:  
 (__译注__：~表示用户目录，即`/Users/你的用户名/`，而小数点开头的文件在Finder中是隐藏的，并且这两个文件有可能还没有被创建。请在终端下使用`sudo vi ~/.bashrc`命令创建或编辑。如不熟悉vi操作，请点击[这里](http://www.eepw.com.cn/article/48018.htm)学习)  
	
        # 如果你是通过Homebrew安装SDK的，则加入下列路径
        export ANDROID_HOME=/usr/local/opt/android-sdk
        # 否则可能是（当然具体视你把SDK放在哪）：
        export ANDROID_HOME=~/Library/Android/sdk
  - **Linux**，往你的`~/.bashrc`, `~/.bash_profile` 或者你终端所用的其它配置文件中增加以下内容：

        export ANDROID_HOME=<你把Android SDK解压后放置的位置>

  - **Windows**，打开控制面板，选择`系统和安全`->`系统`->`高级系统设置`->`高级`->`环境变量`->`新建`，变量名填写ANDROID_HOME，变量值填写你把Android SDK解压后放置的位置。

__译注__: 如果你在windows下找不到对应的控制面板项，也可以右键点击`我的电脑`，然后在菜单中选择`属性`，然后选择`高级系统设置`->`高级`->`环境变量`->`新建`。__注意__：必须将现有的CMD窗口全部关闭，重新打开后新的环境变量才能生效。


### 开启gradle daemon

React Native Android使用的构建系统是[gradle](https://docs.gradle.org)。我们建议你开启gradle daemon功能，它可以带来高达50%的java编译速度提升。点击[这里](https://docs.gradle.org/2.9/userguide/gradle_daemon.html)来了解如何针对你的平台开启这一功能。


### 设置SDK

1. 打开Android SDK Manager(**Mac**用户在终端下输入`android`)。
2. 选中以下项目：
    * Android SDK Build-tools version 23.0.1（这个必须版本严格匹配23.0.1）
    * Android 6.0 (API 23)
    * Local Maven repository for Support Libraries(之前叫做Android Support Repository)
3. 点击"Install Packages"
 (__译注__：国内用户推荐使用[腾讯Bugly的镜像](http://android-mirror.bugly.qq.com:8080/include/usage.html)来加速下载) 
![SDK Manager窗口](img/AndroidSDK1.png) ![SDK Manager 窗口](img/AndroidSDK2.png)

### 安装Genymotion

Genymotion是一个第三方模拟器，它比Google官方的模拟器更易设置且性能更好。但是，它只针对个人用户免费。如果你想使用Google模拟器，请往下看。

1. 下载并安装[Genymotion](https://www.genymotion.com/)。
2. 打开Genymotion。如果你尚未安装VirtualBox，它有可能会提示你安装。
3. 创建一个模拟器并启动。
4. 按下`⌘+M`可以打开开发者菜单（在安装并启动了React Native应用之后）。

### 备选方案：使用Google官方模拟器

1. 打开Android SDK Manager(参见"设置SDK"一步)
2. 选中以下项目：
    * Intel x86 Atom System Image (for Android 5.1.1 - API 22)
    * Intel x86 Emulator Accelerator (HAXM installer)
3. 点击"Install Packages"
4. [配置硬件加速(HAXM)](http://developer.android.com/tools/devices/emulator.html#vm-mac)，否则模拟器会运行的相当缓慢。
5. 创建Android虚拟设备(AVD):
    1. 运行`android avd`并且点击**Create...**
    （__译注__：在Windows系统下，android.bat在Android SDK的`tools`文件夹下，请注意设置PATH环境变量以便于使用）
    ![创建虚拟设备对话框](img/CreateAVD.png)
    2. 选中新创建的虚拟设备，并点击`Start...`  

__译注__：对于Windows用户而言，Intel x86 Emulator Accelerator和HyperV（系统内置的虚拟机功能）不能同时启用。所以要么选择关闭HyperV（控制面板-程序-启动和关闭Windows功能，取消选择HyperV并点确定），要么选择Genymotion、Bluestacks或Visual Studio Emulator for Android作为模拟器。

### 在Android Studio中编辑Java代码

对于JavaScript代码，你可以使用任何编辑器来编辑。如果你想在Android Studio中编辑原生Java代码的话，请在Android Studio的欢迎屏幕上选择"Import project"，然后选择你的项目目录中的`android`文件夹即可。
