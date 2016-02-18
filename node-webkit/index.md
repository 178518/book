# node-webkit是什么？

![node-webkit](http://nwjs.io/img/logo.png)

基于node.js和chromium的应用程序实时运行环境，可运行通过HTML(5)、CSS(3)、Javascript来编写的本地应用程序。node.js和webkit的结合体，webkit提供DOM操作，node.js提供本地化操作；且将二者的context完全整合，可在HTML代码中直接使用node.js的API。

### 前提条件，安装 NW.js
```
npm install nw -g
安装时间较长
nw 模块就安装在 /usr/local/lib/node_modules/nw 目录下了，以后可以直接用 nw 命令来测试程序。

/usr/local/lib/node_modules/nw/nwjs/nwjs.app 是一个可用来打包应用的壳，与 Atom Shell 基本一至。
```

### 运行程序
   
命令行下进到项目所在的项目，直接执行 nw
$ nw 
或者为 nw 指定应用目录，如
$ nw /***/**/nwjs-app

### 打包应用程序

如果是自己的工具，上面的步骤已经足够了，要是别的机器上安装了 NodeJS 和 NW.js，拷贝工程目录也可以的。

与 Atom Shell 基本是一样的，以 /usr/local/lib/node_modules/nw/nwjs/nwjs.app 为壳 — 可以在 nwjs.io 上下载，把项目打包成 app.nw 放到前面那个壳的 Contents/Resources 目录中。

操作步骤

1) 拷贝出  nwjs.app 并重命名为 hello-nwjs.app

$cp -R /usr/local/lib/node_modules/nw/nwjs/nwjs.app ./lego.app

2) 打包项目文件到上面的 hello-nwjs.app/Contents/Resources 中

在项目目录下：

$zip -r lego.app/Contents/Resources/app.nw *

这时候就可以双击lego.app来执行了，或者open lego.app命令打开

### 资料文献

- [官网](http://nwjs.io/)
- [gitHub](https://github.com/nwjs/nw.js)