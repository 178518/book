# React Native

> [基于 React 的构建无线 Web 应用框架](https://github.com/taobaofed/react-web/blob/master/README-zh.md)

### 项目中修改 webpack 配置

> 在 webpack 配置中，需要添加 alias 将 react-native 指向 react-web，其次需要安装 haste-resolver-webpack-plugin 插件。

```
// webpack.config.js
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      'react-native': 'react-web'
    }
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    })
  ]
}
```

### HasteResolverPlugin 的用处？

使用 React Web 组件，需要在我们的组件中去 require('ReactActivityIndicator')，如果目标是 Web 端，那么打包时就会引用 ActivityIndicator.web.js 这个文件。

HasteResolverPlugin 插件就为你做了这件事情，它会：

1、扫描所有组件 @providesModule 信息并记录下来

2、Webpack 编译时，使其可以识别 ReactActivityIndicator 这种写法，而不会报错

3、根据目标平台，帮助 Webpack 打包对应组件文件

你可以在每个组件顶部注释发现类似 @providesModule ReactActivityIndicator 的注释，没错就是给 HasteResolverPlugin 插件用的。

### 使用

```
var AppRegistry = require('ReactAppRegistry');
var View = require('ReactView');
var Text = require('ReactText');
var Platform = require('ReactPlatform');
```

这里我们按需 require 封装后的组件：ReactAppRegistry/ReactView/...。 封装后的组件使我们不再需要关心平台的差异(Web/iOS/Android)。像上面提到的，HasteResolverPlugin 插件会帮助 webpack 做好代码的编译和打包工作。