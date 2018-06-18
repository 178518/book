# 目录结构规范

LEGO 推荐使用以下目录结构

```
├── scripts
│   └── start.js
├── src                                   <--源码目录
│   ├── Components                        <--组件
│   │   └── ComponentName                 <--组件名
│   │       ├── ComponentName.android.js  <--组件对应各端的实现
│   │       ├── ComponentName.ios.js
│   │       └── ComponentName.web.js
│   ├── DemoApp.android.js                <--对应各端的项目入口文件
│   ├── DemoApp.ios.js
│   ├── DemoApp.web.js
│   ├── __tests__
│   │   └── app-test.js
│   └── index.html                        <--对应web端的demo页
├── assets.map.json                       <--基于wepack的打包配置映射关系文件
├── webpack.config.js                     <--webpack配置文件
├── node_modules
├── package.json
└── README.md
```