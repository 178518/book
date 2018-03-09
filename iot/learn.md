# 泛IOT全链路知识栈

### 服务端渲染（Server Rendering）
React中提出了 虚拟DOM 的概念，虚拟DOM以对象树的形式保存在内存中，与真实DOM相映射，通过ReactDOM的Render方法，渲染到页面中，并维护DOM的创建、销毁、更新等过程，以最高的效率，得到相同的DOM结构。

虚拟DOM 给页面带来了前所未有的性能提升，但它的精髓不仅局限于此，还给我们带来了另一个福利： 服务端渲染 。

不同于ReactDOM.render将DOM结构渲染到页面，React中还提供了另外两个方法：[ReactDOMServer.renderToString](https://reactjs.org/docs/react-api.html#reactdomserver.rendertostring) 和 [ReactDOMServer.renderToStaticMarkup](https://reactjs.org/docs/react-api.html#reactdomserver.rendertostaticmarkup) 。二者将虚拟DOM渲染为一段字符串，代表了一段完整的HTML结构。

### 同构（Isomorphic）
通过React提供的服务端渲染方法，我们可以在服务器上生成DOM结构，让用户尽早看到页面内容，但是一个能够work的页面不仅仅是DOM结构，还包括了各种事件响应、用户交互。那么意味着，在客户端上，还得执行一段JS代码绑定事件、处理异步交互，在React中，意味着整个页面的组件需要重新渲染一次，反而带来了额外的负担。

因此，在服务端渲染中，有一个十分重要的概念， 同构(Isomorphic) ，在服务端和客户端中，使用完全一致的React组件，这样能够保证两个端中渲染出的DOM结构是完全一致的，而在这种情况下，客户端在渲染过程中，会判断已有的DOM结构是否和即将渲染出的结构相同，若相同，不重新渲染DOM结构，只是进行事件绑定。

在同构应用中，一套代码（不局限于组件），能够同时在客户端和服务端运行，总体结构如下：

![React&React-Router&Redux](http://s.qunarzz.com/iconfont/blog/universal-app/react-everything.png)

![Isomorphic](https://img.alicdn.com/tps/TB1oi6PMXXXXXXDXXXXXXXXXXXX-589-511.png)

![Webpack](https://raw.githubusercontent.com/DiscipleD/image-storage/master/blog/ssr/ssr-architecture.png)

### ﻿Koa2-React-Isomorphic
![﻿Koa2-React-Isomorphic](https://gw.alicdn.com/tfs/TB1TIjccpuWBuNjSspnXXX1NVXa-1942-1378.png)

### 为什么是Redux

什么是Redux?

你们可以看看官网的解释

![Redux](https://img.alicdn.com/tps/TB1JuYfNVXXXXbmaXXXXXXXXXXX-801-259.jpg)

看了一脸懵逼。

一句话概括，redux只是一个实现了Flux思想的数据流框架。

既然是一个数据流框架，那么数据是如何流动的？

![Redux](https://img.alicdn.com/tps/TB1kYfaNVXXXXcLaXXXXXXXXXXX-604-352.png)

所谓 Redux，就是将动作(action) 变换成 state 转换函数(reducer)，然后放到一个统一的地方(store)来 setState 而已。

理解的Redux的3个特性：

1、单向性
单向数据流其实并不是redux的特性，而是react本身的思想。

2、唯一性

指的是应用的数据都会集中存储在一个地方，这个数据Store就像一个池子，任何组件都可以通过固定的管道来传输或者获取这个池子里面的数据。

3、时间旅行

这个“时间旅行”另外的意思是可预测（predictable），即容易理解的代码。在redux里，任何一个数据都有状态。一个用户操作或者程序需要去修改数据，都必须触发Action，这时在redux看来，其实数据是从一个状态，变化成另一个状态。这么一来，数据就变得可预测，可以知道数据的前置状态(prev state)和后置状态(next state)分别是什么，如果在这里加上单元测试，也是极其容易的一件事情。

Redux的确限定了开发者如何去编写程序。Redux提供了一个权衡方案。它规定：

- 用简单的对象和数组来描述应用状态

- 用简单的对象来描述应用中的状态变化

- 用纯函数来描述应用中逻辑变化

![戏说Redux](https://img.alicdn.com/tps/TB1NzjHNVXXXXa6XpXXXXXXXXXX-1399-581.png)

![正版Redux](https://img.alicdn.com/tps/TB1tRDBNVXXXXX9XFXXXXXXXXXX-799-391.png)

### Koa2 要学习什么

![Koa2](../assets/koa2/koa2.jpg)

从上面的对比，我们其实就发现了 Koa2 独具魅力的地方，这些魅力一方面跟框架设计理念有关，一方面跟语言特性有关，语言特性，无外乎下面几个：

- 箭头函数
- Promise 规范
- 迭代器生成器函数执行原理
- 异步函数 Async Function
- 以及 Koa2 的应用上下文 ctx 的常用 API（也即它的能力）
- koa-compose 工具函数的递归特征
- 中间件执行的进出顺序和用法

### Koa2 流程

![Koa2流程](https://camo.githubusercontent.com/707ab384df1cffd60ba1c19f188fd6edbce34d3d/687474703a2f2f62657277696e2e6769746875622e696f2f707074732f6b6f612f696d672f6b6f612d666c6f772e6a7067)

### ctx对象

![Koa2流程](https://camo.githubusercontent.com/270554efef8e3112443c22e695b401ba7e8847bd/687474703a2f2f62657277696e2e6769746875622e696f2f707074732f6b6f612f696d672f636f6e746578742e706e67)

### 对象之间关系

![对象之间关系](https://sfault-image.b0.upaiyun.com/135/226/1352261008-594a32c87b693_articlex)

### 一张图看懂Koa2

![Koa2脑图](https://loulanyijian.github.io/images/koa2.svg)


### 资料文献

- [Koa2 还有多久取代 Express](https://zhuanlan.zhihu.com/p/33316664)
- [如何使用koa2+es6/7打造高质量Restful API](https://www.jianshu.com/p/f59594b90500)
- [图解Redux数据流](https://alisec-ued.github.io/2016/11/23/图解Redux数据流(一)/)
- [React+Redux 同构应用开发](http://www.aliued.com/?p=3077)
- [前后端同构之路](https://malcolmyu.github.io/2016/10/24/Create-React-Universal-App/)
- [从源码入手探索koa2应用的实现](https://blog.kaolafed.com/2017/12/29/%E4%BB%8E%E6%BA%90%E7%A0%81%E5%85%A5%E6%89%8B%E6%8E%A2%E7%B4%A2koa2%E5%BA%94%E7%94%A8%E7%9A%84%E5%AE%9E%E7%8E%B0/#more)