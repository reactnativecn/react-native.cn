Detect hardware button presses for back navigation.

Android: Detect hardware back button presses, and programmatically invoke the default back button functionality to exit the app if there are no listeners or if none of the listeners return true.

tvOS: Detect presses of the menu button on the TV remote. (Still to be implemented: programmatically disable menu button handling functionality to exit the app if there are no listeners or if none of the listeners return true.)

iOS: Not applicable.

The event subscriptions are called in reverse order (i.e. last registered subscription first), and if one subscription returns true then subscriptions registered earlier will not be called.

```javascript
BackHandler.addEventListener('hardwareBackPress', function() {
 // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
 // Typically you would use the navigator here to go to the last state.

 if (!this.onMainScreen()) {
   this.goBack();
   return true;
 }
 return false;
});
```

__译注__：以上的`this.onMainScreen()`和`this.goBack()`两个方法都只是伪方法，需要你自己去实现！具体可以参考这篇[博文](http://bbs.reactnative.cn/topic/480)。

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="exitapp"></a><span class="propType">static </span>exitApp<span class="propType">()</span> <a class="hash-link" href="#exitapp">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(eventName, handler)</span> <a class="hash-link" href="#addeventlistener">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(eventName, handler)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4></div>
</div>
