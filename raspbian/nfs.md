# NFS挂载

1.服务端安装
apt-get install nfs-common nfs-kernel-server

创建需要共享的目录：

mkdir /home/pi/share
 
chmod a+w /home/pi/share

sudo nano /etc/exports

/nfs/public 192.168.16.0/24(rw,async) *(ro)

[NFS配置](http://blog.sina.com.cn/s/blog_517e2e1b0100p7dm.html)

2.客户端安装
apt-get install nfs-common

mkdir /mnt/upload

sudo /etc/init.d/rpcbind stop

sudo /etc/init.d/nfs-kernel-server stop

sudo /etc/init.d/rpcbind start

sudo /etc/init.d/nfs-kernel-server start

sudo exportfs

sudo showmount -e 192.168.1.118

在/etc/rc.local下输入：

sudo nano /etc/rc.local

sudo -u root mount -t nfs 192.168.1.118:/var/www/html/discuz/data /var/www/html/discuz/data

sudo umount /var/www/html/discuz/data