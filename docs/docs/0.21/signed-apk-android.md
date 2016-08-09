要通过[Google Play store](https://play.google.com/store)或者其它渠道发布应用，你需要生成一个签名的发行版APK包。Android开发者文档中的[为你的应用程序签名](https://developer.android.com/tools/publishing/app-signing.html)已经说明了相应的内容。本向导会简略的介绍这些过程，然后着重讲解如何打包JavaScript代码。

### 生成一个签名密钥

你可以用`keytool`命令生成一个私有密钥。

    $ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-release-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为10000天。--alias参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

_注：请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。_、

### 设置gradle变量

1. 把`my-release-key.keystore`文件放到你工程中的`android/app`文件夹下。
2. 编辑`~/.gradle/gradle.properties`，添加如下的代码（注意把其中的`****`替换为相应密码）

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

上面的这些会作为全局的gradle变量，我们在后面的步骤中可以用来给应用签名。

_注：一旦你在Play Store发布了你的应用，如果想修改签名，就必须用一个不同的包名来重新发布你的应用。所以请务必备份好你的签名库和密码。_

### 添加签名到应用的gradle配置文件

编辑你工程目录下的`android/app/build.gradle`，添加如下的内容：

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### 生成发行APK包

#### 如果你在`android/app`下有一个`react.gradle`

只要在终端下运行以下命令：

```sh
$ cd android && ./gradlew assembleRelease
```

如果你希望改变JavaScript代码包或者资源文件被打包的方式（譬如你想改变这些文件存放的目录或者整个工程的文件结构），你可以读一下`android/app/build.gradle`看看你可以做什么配置来应用这些修改。

#### 如果你*没有*`react.gradle`文件：

你可以[升级](/docs/upgrading.html)到最新版本的React Native来获得这一文件。或者，你也可以选择自行在终端里运行下述命令来打包JavaScript代码和资源文件：

```sh
$ mkdir -p android/app/src/main/assets
$ react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/
$ cd android && ./gradlew assembleRelease
```

不论哪种情况，你都应该能在`android/app/build/outputs/apk/app-release.apk`中找到生成的APK文件，并且它已经可以用来被发布。

### 测试应用的发行版本

在把发行版本提交到Play Store之前，你应该做一次最终测试。输入以下命令可以在设备上安装发行版本：

```sh
$ cd android && ./gradlew installRelease
```

注意`installRelease`命令只能在你完成了上面的签名配置之后才可以使用。
你可以结束掉任何的packager实例，所有你的代码和框架代码已经都被打包到了apk资源中。

### 启用Proguard代码混淆来缩小APK文件的大小（可选）

Proguard是一个Java字节码混淆压缩工具，它可以移除掉React Native Java（和它的依赖库中）中没有被使用到的部分，最终有效的减少APK的大小。

_**重要**：启用Proguard之后，你必须再次全面地测试你的应用。Proguard有时候需要为你引入的每个原生库做一些额外的配置。参见`app/proguard-rules.pro`文件。_

要启用Proguard，编辑`android/app/build.gradle`文件：

```
/**
 * 运行Proguard来减小发布版本的Java字节码大小
 */
def enableProguardInReleaseBuilds = true
```
