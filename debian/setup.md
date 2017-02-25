### sudo 命令无法使用

网络安装的镜像安完的debian是什么都没有的，包括gcc和sudo。 首先你需要切换到root用户，输入root用户的口令。

```
apt-get install sudo

nano /etc/sudoers

root    ALL=(ALL:ALL) ALL

%sudo   ALL=(ALL:ALL) ALL

username ALL=(ALL) NOPASSWD: ALL
```

### ifconfig: command not found

原因：ifconfig命令所在路径/sbin未包含在系统环境变量PATH中

```
nano ~/.bashrc

PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

让配置生效

source ~/.bashrc
```