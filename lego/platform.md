# 平台差异处理

构建跨平台的应用时，往往需要针对不同的平台写一些差异化的代码。常见的方式有：

将组件在不同平台的实现放到相对应的目录下

```
/common/components/
/android/components/
/ios/components/
```

或者在组件命名上做区分，如

```
TextIOS.js
TextAndroid.js
```

###添加平台后缀(推荐)
***

当 require 一个组件的时候，如果文件有 .ios. 或 .android 这样的后缀，React Native 会根据当前运行的平台，来加载特定平台下的实现。

你可以这样来组织文件：

```
Text.ios.js
Text.android.js
Text.web.js
```

基于这一步，就可以像下面的方式来 require 文件了，而无需关心将哪个平台被运行。

```
var Text = require('./components/Text');
```
React Native 会根据当前运行的平台来加载正确的组件。

### 调用 Platform 模块
***

React Native 提供了 Platform 模块，来检测 App 当前运行在哪个平台。这个方法非常适为代码片段增加平台判断。

```
var {Platform} = React;

var styles = StyleSheet.create({
  height: (Platform.OS === 'ios') ? 200 : 100,
});
```

不同平台下 Platform.OS 的值分别为：

Web ： web

iOS ： ios

Android ： android

### 检测 Android 版本

在 Android 设备，通过 Platform 模块还可以检测当前运行设备的 Android 版本。

```
var {Platform} = React;

if(Platform.Version === '5.0'){
  console.log('Running on Lollipop!');
}
```

### Web 差异点
***

在 Web 中，你可能需要为以下场景加入平台判断：

1、pageX/pageY 不是直接挂在 nativeEvent 下
```
if (Platform.OS == 'web') {
 var touch = event.nativeEvent.changedTouches[0];
 pageX = touch.pageX;
 pageY = touch.pageY;
} else {
 startX = event.nativeEvent.pageX;
 startY = event.nativeEvent.pageY;
}
```

2、应用初始化
```
AppRegistry.registerComponent('Game2048', () => Game2048);
if(Platform.OS == 'web'){
 var app = document.createElement('div');
 document.body.appendChild(app);
 AppRegistry.runApplication('Game2048', {
  rootTag: app
 });
}
```

3、fetch 的跨域问题
```
var fetch = Platform.OS === 'web'? require('***Jsonp'): require('***Fetch');
```
