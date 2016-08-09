React Native并没有完整实现CSS，而是使用JavaScript来给应用添加样式。这是一个有争议的决定，你可以看一下这个[幻灯片](http://pan.baidu.com/s/1mg5xcKC)来了解一下我们这样做的理由。

## 声明样式

在React Native里声明样式就是像下面这样：

```javascript
var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  background: {
    backgroundColor: '#222222',
  },
  active: {
    borderWidth: 2,
    borderColor: '#00ff00',
  },
});
```

`StyleSheet.create`这个构造函数并不是必须的，但它提供了一些非常有用的好处。它可以把这些样式值转化为普通的数字id，这些数字id则指向一个内部的样式表，以此来使得样式值变得**不可更改（immutable）** 和 **不可见（opaque）**。把样式声明放到文件的末尾还可以确保它们只会在应用中被创建一次，而不是在每次渲染（render方法中）时都被重新创建。  
所有的属性名称和值都是web里的常用样式的一部分。在布局上， React Native还实现了[弹性盒模型（Flexbox）](flexbox.html).

## 使用样式

所有的核心组件都可以接受style属性。

```javascript
<Text style={styles.base} />
<View style={styles.background} />
```

还可以接受数组形式的多个style。

```javascript
<View style={[styles.base, styles.background]} />
```

其行为和`Object.assign`方法是一致的：为了避免多个值的冲突，最右边的元素优先级最高，而否定型的取值如`false`、`undefined`和`null`则会被忽略。一个通常的做法是根据某些条件选择性地添加样式。（如下面的代码，当this.state.active为false时，styles.active就会被忽略掉）

```javascript
<View style={[styles.base, this.state.active && styles.active]} />
```

最后，如果你坚持的话，你也可以在render方法中创建样式对象，但最好不要这样做（每次渲染都会被重复创建）。如果有多个样式，记得把这样动态创建的样式对象放到数组的最后。

```javascript
<View
  style={[styles.base, {
    width: this.state.width,
    height: this.state.width * this.state.aspectRatio
  }]}
/>
```

## 将样式作为参数传递

为了能够在调用组件的地方对其子组件样式进行自定义，你还可以将样式作为参数进行传递。可以使用`View.propTypes.style`和`Text.propTypes.style`来确保传递的参数确实是style类型的。(propTypes是对props的类型检查和限制，[参考文档点这里](http://facebook.github.io/react/docs/reusable-components.html#prop-validation))

```javascript
var List = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    elementStyle: View.propTypes.style,
  },
  render: function() {
    return (
      <View style={this.props.style}>
        {elements.map((element) =>
          <View style={[styles.element, this.props.elementStyle]} />
        )}
      </View>
    );
  }
});

// ... 在别的文件中引用List组件 ...
<List style={styles.list} elementStyle={styles.listElement} />
```
## 支持的属性

你可以在下面这些链接中查看最新支持的CSS属性。

- [View的属性](view.html#style)
- [Image的属性](image.html#style)
- [Text的属性](text.html#style)
- [Flex的属性](flexbox.html#content)
- [Transform的属性](transforms.html#content)
