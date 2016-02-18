# 前置条件

### node&npm版本要求
> node>4.0 npm>3.3

![png](../assets/node/node.png)

### java&android sdk

> JDK 7.0以上

环境变量如下配置：

```
vi ~/.bash_profile

# java环境变量
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home
# maven内存配置
export MAVEN_OPTS='-Xms256m -Xmx1024m'
# Android SDK配置
export ANDROID_HOME=/Users/yunyi/Library/Android/sdk
export PATH=$PATH:/usr/local/mysql/bin
# maven 路径配置
export PATH=$PATH:/Users/yunyi/maven-2.2.1/bin
# android 命令行配置
export PATH=$PATH:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
# for color
export CLICOLOR=1
# \h:\W \u\$
export PS1='\[\033[01;33m\]\u@\h\[\033[01;31m\] \W\$\[\033[00m\] '
# grep
alias grep='grep --color=always'
# nvm快捷方式
source ~/.nvm/nvm.sh
```

### Linux下部署nodejs（两种方式）
1、下载源码，手动编译二进制，即是部署过程。
需要先安装编译环境 比如 node编译依赖于gcc make gcc-c++ openssl-devel等三方模块，因此需要提前自己先安装依赖（使用 sudo apt-get install gcc make gcc-c++ openssl-devel 即可）
  
wget http://nodejs.org/dist/v4.3.0/node-v0.10.33.tar.gz
tar -zxf node-v0.10.33.tar.gz
cd node-v0.10.33
./configure && make && sudo make install

编译时间需要很久
测试一下看装好了没有，用命令查看node和npm版本
node -v
npm -v

2、NodeJS二进制文件的部署安装
uname -a
首先下载NodeJS的二进制文件，https://nodejs.org/dist/v4.3.0/node-v4.3.0-linux-armv6l.tar.gz   在Linux Binaries (.tar.gz)行处根据自己系统的位数选择

sudo wget http://nodejs.org/dist/v4.3.0/node-v4.3.0-linux-armv6l.tar.gz

放在了/opt下面,依次执行如下命令，可看到
tar zxvf node-v4.3.0-linux-armv6l.tar.gz
进入解压后的目录bin目录下，执行ls会看到两个文件node,npm. 然后执行./node -v ，如果显示出 版本号说明我们下载的程序包是没有问题的。 依次运行如下三条命令
```
cd /opt/node-v4.3.0-linux-armv6l/bin
ls
./node -v
```

因为node-v4.3.0-linux-armv7l/bin这个目录是不在环境变量中的，所以只能到该目录下才能node的程序。如果在其他的目录下执行node命令的话 ，必须通过绝对路径访问才可以的

如果要在任意目录可以访问的话，需要将node 所在的目录，添加PATH环境变量里面，或者通过软连接的形式将node和npm链接到系统默认的PATH目录下的一个，以下别介绍

### 软连接方式
```
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/node /usr/local/bin/node
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/npm /usr/local/bin/npm

sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm /usr/local/bin/cnpm
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-check /usr/local/bin/cnpm-check
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-doc /usr/local/bin/cnpm-doc
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-search  /usr/local/bin/cnpm-search 
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-sync  /usr/local/bin/cnpm-sync
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-user  /usr/local/bin/cnpm-user 
sudo ln -s /opt/node-v4.3.0-linux-armv6l/bin/cnpm-web   /usr/local/bin/cnpm-web 
 
简化配置：
将/opt/node-v4.3.0-linux-armv6l/bin加入PATH，执行source .profile，然后echo $PATH看环境变量是否生效。
```
通过如此，就可以访问Node了，同时node部署也已经完毕。

### cnpm配置
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### node 多版本管理
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

编辑
nano .profile
在最后加入
source ~/.nvm/nvm.sh
执行使之生效
source ~/.profile
```

