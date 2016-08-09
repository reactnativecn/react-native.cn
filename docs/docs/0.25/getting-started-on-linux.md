### 准备工作

本指南以Ubuntu Linux 14.04 LTS为例。

在阅读本指南之前，你至少应该安装过了Android SDK，并且运行了一个用Java写的"Hello World"的Android应用。具体可以参阅[安卓环境配置](android-setup.html)。

#### 安装NodeJS

首先要做的是安装NodeJS，这是一个目前很流行的JavaScript的实现。

启动终端，粘贴下面的命令，以从[NodeSource](https://nodesource.com/) 仓库来下载安装NodeJS：

```sh
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
```
__注__：上面的命令是针对Ubuntu的。如果你使用的是其他的发行版本，则请参考[NodeJS 官网的安装说明](https://nodejs.org/en/download/)。

#### 安装Watchman

[watchman](https://facebook.github.io/watchman/docs/install.html)是一个Facebook制作的工具，用来监测文件系统的变更。安装这一工具可以提高性能，并避免node中的一个监视文件的bug。

将下面的命令粘贴到终端中，以通过源代码来编译并安装watchman：

```sh
sudo apt-get install -y automake python-dev
git clone https://github.com/facebook/watchman.git
cd watchman
git checkout v4.1.0  # the latest stable release
./autogen.sh
./configure
make
sudo make install
```
__注__：上面的```apt-get install```命令是针对Ubuntu/Debian的。如果你使用的是其他的发行版本，则可能需要使用不同的包安装命令。

#### 安装Flow

Flow是针对JavaScript的静态类型检查工具。运行下面的命令来安装Flow：

```sh
sudo npm install -g flow-bin
```

## 配置一个Android设备

下面我们来配置一个Android设备来运行第一个项目。

首先将你的设备接入电脑，使用`lsusb`来查看制造商代码。这一命令的运行结果看起来是这样的：

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 22b8:2e76 Motorola PCS 
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```
以上这些行代码代表了目前连接在你电脑上的USB设备。

那么如何找到代表你的手机的那一行呢？此时试着拔掉你的手机，再运行这一命令：

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```
可以看到在拔掉手机之后，对应的那一行就不见了（上面这个例子里是"Motorola PCS"）。那就是我们要找的。 

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

上面这一行里，我们要找的是设备ID中的前四个数字：

`22b8:2e76` 

也就是`22b8`—— 对应的就是Motorola。

你需要把这个写入udev rule才能正常使用：

```sh
echo SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev" | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

记得把上面的`22b8`替换为你的设备的制造商代码。

下面检查你的设备是否能正确连接到ADB（Android Debug Bridge），使用`adb devices`命令：

```bash
List of devices attached
TA9300GLMK	device
```

更多细节可以参阅这篇文档：[在设备上运行](running-on-device-android.html)。

## 之后的步骤

现在你的Android和工具都已就绪。你可以照着[快速入门](getting-started.html#quick-start)的文档来安装React Native，开始第一个项目了。
