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

其中有用的几项为：

第一项：0表示返回结果成功

第二项：1表示检测网络正常，0表示检测网络异常

第四项：1表示已绑定成功，0表示未绑定

第五项：未绑定的情况下，为绑定的需要的激活码

第六项：1表示磁盘挂载检测成功，0表示磁盘挂载检测失败

### 资料文献

- [迅雷固件Xware安装](http://shumeipai.nxez.com/2014/06/25/raspberries-come-remotely-download-thunder.html?variant=zh-cn)
- [迅雷固件Xware安装](http://bbs.ickey.cn/community/forum.php?mod=viewthread&tid=45011)