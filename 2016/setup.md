# 安装步骤

### 1、使用cnpm代理npm，并切换到国内源
```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 2、安装webpack和各种依赖
> 推荐"node-dev"这个工具，代码改动会自动重启node进程

```javascript
cnpm install -g webpack gulp node-dev
```

### 3、安装本地热部署和各种依赖工具包
> webpack必选安装到本地，前面只是安装webpack命令，这里需要特别注意

```javascript
cnpm install
```

### 5、编译工程
> 基于gulp对整个工程进行线下预处理，预编译，同时基于内容进行hash解决线上缓存问题。

```javascript
cnpm run build
```

### 6、启动应用
```javascript
cnpm run start
```
### 7、启动应用，模拟生产环境
```javascript
cnpm run production
```

### 10、npm包预处理
```javascript
cnpm run prepublish
```

### 10、npm包发布
```javascript
cnpm run npmpublish
```