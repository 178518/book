# 迅雷远程下载


### 迅雷远程下载安装

下载 Xware1.0.31_armel_v5te_glibc.zip 到你的树莓派

### 解压获取安全吗

这里有一个坑,标准的官方系统没有问题,Xbian老是提示文件不存在,可以按照这个解决.

-bash: xware/portal: No such file or directory

```
# 进入了/lib目录
cd /lib 
sudo ln -s ld-linux-armhf.so.3 ld-linux.so
```

### 启动迅雷

./portal

### 查看迅雷启动状态

IP:9000/getsysinfo

[ 0, 1, 1, 0, "激活码", 1, "2.215.3.310", "", 0, "0", 0 ]

### 查看迅雷挂载目录
IP:9000getusedpartitioninfo

其中有用的几项为：

第一项：0表示返回结果成功

第二项：1表示检测网络正常，0表示检测网络异常

第四项：1表示已绑定成功，0表示未绑定

第五项：未绑定的情况下，为绑定的需要的激活码

第六项：1表示磁盘挂载检测成功，0表示磁盘挂载检测失败

### debian底下创建下载目录

#### 创建用户
sudo useradd thunder

#### 改变迅雷下载目录权限
su chown thunder:thunder yuancheng

#### 挂载目录设置
sudo mkdir /home/debian/download
sudo mkdir /media/thunder/download
sudo chown thunder:thunder /home/debian/download
sudo chown thunder:thunder /media/thunder
sudo mount --bind /home/debian/download /media/thunder

### 启动迅雷
sudo su thunder -c ./portal

### 资料文献

- [迅雷固件Xware安装](http://shumeipai.nxez.com/2014/06/25/raspberries-come-remotely-download-thunder.html?variant=zh-cn)
- [迅雷固件Xware安装](http://bbs.ickey.cn/community/forum.php?mod=viewthread&tid=45011)
- [树莓派3搭建迅雷远程下载服务器](http://www.zorin.xin/%E6%A0%91%E8%8E%93%E6%B4%BE/2017/10/15/%E6%A0%91%E8%8E%93%E6%B4%BE3%E6%90%AD%E5%BB%BA%E8%BF%85%E9%9B%B7%E8%BF%9C%E7%A8%8B%E4%B8%8B%E8%BD%BD%E6%9C%8D%E5%8A%A1%E5%99%A8.html?utm_source=tuicool&utm_medium=referral)
- [ubuntu14.04折腾迅雷xware](http://www.cnblogs.com/coding-my-life/p/4430794.html)