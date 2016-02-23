[NPM](https://www.npmjs.com/)的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。

### 生成配置文件
```
npm init
```

### 添加帐户到npm
```
npm adduser
```

### 登陆用户
```
npm login
```

### 推送文件到npm
```
npm publish
```

> 最后，如果你报错
> no_perms Private mode enable, only admin can publish this module
> 那么可能是你用了国内的镜像地址了，只需要重新把地址注册回npmjs即可。
> npm config set registry http://registry.npmjs.org

### 撤销发布模块
```
npm unpublish rc-lego@0.0.1
```

### 废弃某个版本的模块
> 运行上面的命令以后，小于0.0.3版本的模块的package.json都会写入一行警告，用户安装这些版本时，这行警告就会在命令行显示。

```
npm deprecate rc-lego@"<0.0.3" "bug fixed in v0.0.3"
```

### aeproxy & whistle 启动停止
aeproxy start/restart/stop
whistle start/restart/stop

简化版
w2 start/restart/stop
w2 start -p 9527(在指定端口上提供服务)
