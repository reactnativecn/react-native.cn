__注：本向导主要介绍安卓开发环境。要开发iOS应用，你依然需要一个Mac电脑__

由于React Native开发iOS需要Mac电脑，并且大部分Facebook和为React Native贡献代码的工程师使用的都是Mac电脑，所以支持OS X是最高优先级的。尽管如此，我们也希望Linux和Windows能够得到支持。我们相信最好的对于Linux和Windows的支持，一定来自于日常习惯于使用这些系统的人们。

这就是为什么对于Linux和Windows的支持需要来自社区不间断的共同努力。给我们提交任何的问题报告，并且提交解决问题的Pull Request，我们会协助检验和合并这些修改。我们期待在未来能看到您的贡献并且非常感谢您在这个过程中付出的耐心和努力。

从**0.14版本**起，Android开发环境已经基本可以在Linux和Windows环境下运行。你需要安装4.0或更高版本的[Node.js](https://nodejs.org/)。在Linux上，我们建议你安装[watchman](https://facebook.github.io/watchman/docs/install)，否则你可能会遇到Node.js监视文件系统的一个BUG。


## 在Windows平台上还缺少什么

在Windows平台上，在你运行`react-native run-android`之后，packager不会自动启动。你需要这样自行启动它：  

	#对于React Native版本 < 0.14的
    cd MyAwesomeApp
    node node_modules/react-native/packager/packager.js

    
    #对于React Native版本 >= 0.14的 (这个版本移除了packager.js)
    cd MyAwesomeApp
    react-native start

如果你碰到了`ERROR  Watcher took too long to load`的报错，请尝试将[这个文件](https://github.com/facebook/react-native/blob/0.17-stable/packager/react-packager/src/FileWatcher/index.js#L17)中的MAX_WAIT_TIME值改得更大一些 (文件的具体路径是`node_modules\react-native\packager\react-packager\src\DependencyResolver\FileWatcher\index.js`或`node_modules/react-native/packager/react-packager/src/FileWatcher/index.js`)。
