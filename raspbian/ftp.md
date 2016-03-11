# 安装FTP

### 安装ftp
```
sudo apt-get install vsftpd
sudo apt-get install db-util
```

### 配置FTP
```
sudo nano /etc/vsftpd.conf

listen=YES
listen_ipv6=NO
#开启断点续传
local_umask=022
# 不允许匿名访问 
anonymous_enable=NO 
# 设定可以进行写操作
write_enable=YES 
# 设定本地用户可以访问
local_enable=YES 
ascii_upload_enable=YES 
ascii_download_enable=YES
#最后一行设置共享目录
local_root=/home/xbian/share
```

### 配置FTP账户(基于安全考虑，使用虚拟账户方式)
sudo db_load -T -t hash -f /etc/vsftpd/vusers.list /etc/vsftpd/vsftpd_login.db

1、增加组(不需要) 
```
sudo groupadd ftpgroup
```

2、修改/etc/vsftpd.conf
```
#chroot_list_enable=YES
# (default follows)
#chroot_list_file=/etc/vsftpd.chroot_list
改为
chroot_list_enable=YES
# (default follows)
chroot_list_file=/etc/vsftpd.chroot_list
```

3、增加用户
```
cat /etc/passwd 可以查看所有用户的列表
cat /etc/group 查看用户组
cat /etc/ftpusers FTP USER组

永久性删除用户账号
sudo userdel lego

sudo groupdel ftpgroup

#注-s /sbin/nologin是让其不能登陆系统，-d 是指定用户目录为/home/xbian/share
sudo useradd -d /home/xbian/share -s /sbin/nologin lego

虚拟账户登录不了的原因：

cat /etc/ftpusers 中发现有root，于是登陆被deny了

将/etc/ftpusers 中的root删除即可
```

4、设置用户口令 
```
sudo passwd lego
```

5、编辑文件
```
sudo nano /etc/vsftpd.chroot_list
```

内容为ftp用户名,每个用户占一行,如：

lego

6、重新启动vsftpd

### 重启
```
sudo service vsftpd start/stop/restart
```