# 树莓派上安装 Docker

树莓派官方系统并不支持Docker,需要安装[集成Dcoker的树莓派系统](http://blog.hypriot.com/downloads/)

### 1.Mac 安装Docker
```
brew install boot2docker
# 初始化
boot2docker init
# 启动
boot2docker start  
# 测试
docker run hello-world
# 排错
boot2docker -v info
# 进入虚拟机控制台
boot2docker ssh 
# 查看虚拟机IP
boot2docker ip 
```

### 2.安装Docker
```
sudo apt-get install docker.io
```

### 3.检查安装版本信息
```
docker --version
```

### 4.docker信息查看
```
sudo docker info
```

### 5.启动docker守护进程
```
sudo docker -d
```

### 6.注册docker账户

填写[注册表单](https://hub.docker.com/account/signup/)，选择您的用户名和密码并指定您的电子邮箱。你也可以报名参加 Docker 邮件列表，会有很多关于 Docker 的信息。

### 7.升级docker
```
sudo apt-get install apt-transport-https
  
# Add the Docker repository key to your local keychain  
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9  

# Add the Docker repository to your apt sources list.  
sudo sh -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"  

# update your sources list  
sudo apt-get update  
   
# 之后通过下面命令来安装最新版本的docker：  
sudo apt-get install -y lxc-docker  

# 以后更新则：  
sudo apt-get update -y lxc-docker  
  
# 启用新版docker  
sudo ln -sf /usr/bin/docker /usr/local/bin/docker  
```

# 参考资料

* [Docker](http://docker.widuu.com/)