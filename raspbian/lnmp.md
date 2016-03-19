# 安装Ngix/PHP5/MySQL5

### chkconfig命令

chkconfig命令主要用来更新（启动或停止）和查询系统服务的运行级信息

使用范例：
chkconfig --list        #列出所有的系统服务
chkconfig --add httpd        #增加httpd服务
chkconfig --del httpd        #删除httpd服务
chkconfig --level httpd 2345 on        #设置httpd在运行级别为2、3、4、5的情况下都是on（开启）的状态
chkconfig --list        #列出系统所有的服务启动情况
chkconfig --list mysql        #列出mysql服务设置情况
chkconfig --level 35 mysql on        #设定mysql在等级3和5为开机运行服务，--level 35表示操作只在等级3和5执行，on表示启动，off表示关闭
chkconfig mysql on        #设定mysql在各等级为on，“各等级”包括2、3、4、5等级

如何增加一个服务：
1.服务脚本必须存放在/etc/ini.d/目录下

Debian 6因为缺少LBS，安装软件时会提示一下错误

解决方法：
编辑/etc/init.d/*** 启动脚本,在前面加入如下内容:

### BEGIN INIT INFO
# Provides: Aria2
# Required-Start: $network $remote_fs $syslog $time
# Required-Stop:
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Aria2 Download
### END INIT INFO

### 准备篇
> 配置防火墙，开启80端口、3306端口

> 说明：debian默认安装是没有开启任何防火墙的，为了服务器的安全，建议大家安装启用防火墙设置，这里推荐使用iptables防火墙。

```
whereis iptables   #查看系统是否安装防火墙
iptables: /sbin/iptables /usr/share/iptables /usr/share/man/man8/iptables.8.gz  #表示已经安装iptables
sudo apt-get install iptables   #如果默认没有安装，请运行此命令安装防火墙
sudo iptables -L  #查看防火墙配置信息，显示如下：
#####################################################
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination

sudo nano /etc/iptables.default.rules    #添加以下内容

*filter
# Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
# Accepts all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# Allows all outbound traffic
# You could modify this to only allow certain traffic
-A OUTPUT -j ACCEPT
# Allows HTTP and MySQLconnections from anywhere (the normal ports for websites)
-A INPUT -p tcp --dport 21 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p udp --dport 137 -j ACCEPT
-A INPUT -p udp --dport 138 -j ACCEPT
-A INPUT -p tcp --dport 139 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 445 -j ACCEPT
-A INPUT -p tcp --dport 3306 -j ACCEPT
-A INPUT -p tcp --dport 6800 -j ACCEPT
-A INPUT -p tcp --dport 8080 -j ACCEPT
-A INPUT -p tcp --dport 8090 -j ACCEPT
# Allows SSH connections for script kiddies
# THE -dport NUMBER IS THE SAME ONE YOU SET UP IN THE SSHD_CONFIG FILE
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
# Now you should read up on iptables rules and consider whether ssh access
# for everyone is really desired. Most likely you will only allow access from certain IPs.
# Allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
# log iptables denied calls (access via 'dmesg' command)
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7
# Reject all other inbound - default deny unless explicitly allowed policy:
-A INPUT -j REJECT
-A FORWARD -j REJECT
COMMIT

ctrl+o  #保存
ctrl+x  #退出
备注：80是指web服务器端口、3306是指MySQL数据库链接端口、22是指SSH远程管理端口
sudo iptables-restore < /etc/iptables.default.rules    #使防火墙规则生效
sudo nano /etc/network/if-pre-up.d/iptables   #创建文件，添加以下内容，使防火墙开机启动

#!/bin/bash
sudo /sbin/iptables-restore < /etc/iptables.default.rules
sudo chmod 777 /etc/network/if-pre-up.d/iptables  #添加执行权限

```

### 安装篇
```
sudo apt-get install mysql-server php5 php5-mysql

安装结束后，新建一个php页面，放入探针代码测试下：
<?php echo phpinfo();?>

chkconfig apache2 on
chkconfig mysql on

nano /etc/mysql/my.cnf

注释bind-address  =127.0.0.1,开启外网访问

重启：/etc/init.d/mysql restart

sudo /etc/init.d/apache2 start/stop/restart
sudo /etc/init.d/mysql start/stop/restart
sudo service apache2 restart
sudo service mysql restart

sudo /etc/apache2/apache2.conf

关闭目录浏览

<Directory /var/www/>
        Options FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>

Linux一键安装包

登陆后运行：screen -S lnmp

如果提示screen: command not found 命令不存在可以执行：sudo apt-get install screen

wget -c http://soft.vpser.net/lnmp/lnmp1.2-full.tar.gz && tar zxf lnmp1.2-full.tar.gz && cd lnmp1.2-full && ./install.sh lnmp
```

1.mysql登录

mysql -u root 

回车进入命令行

2.线上新建一个db，远程telnet xx 3306报错如下

```
[xxx@xxx cacti]$ telnet db01.xx.com 3306  
Trying xx.xx.xx.1...  
Connected to db01.xx.com.  
Escape character is '^]'.  
YHost 'db01.xx.com' is not allowed to connect to this MySQL serverConnection closed by foreign host.  
```

4.解决方法如下

```
mysql>UPDATE mysql.user SET Host='%' WHERE Host='localhost';  
mysql>GRANT ALL PRIVILEGES ON *.* TO root@"%" ;  
mysql>FLUSH PRIVILEGES;  
```
   
> 至此我有了一个基于看门狗的24小时不断网，可以自动重启的服务器，他提供下载，共享，LNAMP，Java等服务，并且可以搭建一个小型NAS，如果放在客厅还可以作为视频播放盒。

### Discuz 3.2X 资源带端口问题

Discuz X2.5用户：打开文件source\class\discuz\discuz_application.php，查找第223行或如下代码

```
$_G['siteport'] 
= empty($_SERVER['SERVER_PORT']) || $_SERVER['SERVER_PORT'] == '80' ? '' : ':'.$_SERVER['SERVER_PORT'];
```

修改为

```
//$_G['siteport'] = empty($_SERVER['SERVER_PORT']) || 
$_SERVER['SERVER_PORT'] == '80' ? '' : ':'.$_SERVER['SERVER_PORT'];
```

前Nginx,后Apache提供服务,家用网络开启外网访问后,速度飕飕的

### 外网访问篇

以上这些仅限局域网使用，比如我们出门或者分享给朋友就需要通过路由器配置虚拟服务器提供服务了。

一般家庭路由在不断网的情况下会分配一个动态IP，这个IP在路由不重启的时候是可以通过路由器进行简单配置，让外网的访问透传到内部指定的机器上，这样我们相当于有一个公网的服务器。

网络拓扑图：

![IP](http://www.192ly.com/wp-content/uploads/2014/07/TL-WR882N-DKYS-TP.png)

虚拟服务器：

![IP](http://www.192ly.com/wp-content/uploads/2014/07/TL-WR882N-DKYS-JC.png)

文献资料
- [LNMP](http://lnmp.org/install.html)
- [LNMP安装了哪些软件？安装目录在哪？](http://lnmp.org/faq/lnmp-software-list.html)
- [LNMP状态管理命令](http://lnmp.org/faq/lnmp-status-manager.html)
- [前nginx后Apache＋Node反向代理](http://www.cnblogs.com/dolphinX/p/4068857.html)
- [正向代理和反向代理](http://blog.csdn.net/newborn2012/article/details/24248961)

