# 第三版重构

我们正在对[React Native 中文网](http://react-native.cn/)进行第三版重构，这次重构的目标有：

1. 在github开源，接受issue和pull-request（主要是文档）。
2. 重构server-rendering，实现同构而非独立的SEO页面。
3. 和论坛进行较深入整合，绑定更多动态内容。

## 提交文档
请访问[文档所在的仓库](https://github.com/reactnativecn/react-native-docs-cn)，fork后新建或修订文档，然后创建Pull Request。我们会在第一时间审阅。欢迎社区的朋友们踊跃贡献！

## 开发环境

打开两个命令行终端，分别运行（要启用redux dev tool，在webpack-dev后增加--showDevTool参数）：

```bash
$ node bin/cli webpack-dev [--showDevTool]
```

```bash
$ node bin/cli development
```

然后打开[http://localhost:3000/](http://localhost:3000/) 查看结果。

修改部分模块代码后，页面会自动刷新。要测试server rendering，则可以手动刷新页面。

## 部署环境(测试)

```bash
$ node bin/cli build-client
$ node bin/cli productionWithAssets
```

## 部署环境(运行)

```bash
$ node bin/cli build-client
$ node bin/cli production
```

注意要对应配置Nginx或Apache前端，端口映射到本地3000，并且导向`scripts`目录到`build-release`目录，`static`目录到`static`目录。

