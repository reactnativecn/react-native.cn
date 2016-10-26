# 第四版重构

我们正在对[React Native 中文网](http://react-native.cn/)进行第四版重构，这次重构主要目标是优化,具体方式包括:

1. 减少server-rendering的开销,包括页面静态化和动态页面缓存
2. 引入CI预编译,减少线上服务器的构建开销
3. 移除redux的使用,改用更直接的react方式
4. 在运行环境抛弃babel-register,改为预编译的babel方式

## 提交文档
请访问[文档所在的仓库](https://github.com/reactnativecn/react-native.cn/tree/stable/docs/docs)，fork后新建或修订文档，然后创建Pull Request。我们会在第一时间审阅。欢迎社区的朋友们踊跃贡献！

## 开发环境

#### Windows

Windows下受到一些限制，所以必须要执行以下命令

```bash
npm run webpack
rd /s /q build
```
