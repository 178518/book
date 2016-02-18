# 安装Ngix/PHP5/MySQL5

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
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p udp --dport 137 -j ACCEPT
-A INPUT -p udp --dport 138 -j ACCEPT
-A INPUT -p tcp --dport 139 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 3306 -j ACCEPT
-A INPUT -p tcp --dport 6800 -j ACCEPT
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
sudo nano  /etc/network/if-pre-up.d/iptables   #创建文件，添加以下内容，使防火墙开机启动

#!/bin/bash
sudo /sbin/iptables-restore < /etc/iptables.default.rules

sudo chmod 777 /etc/network/if-pre-up.d/iptables  #添加执行权限
```

### 安装篇
```
登陆后运行：screen -S lnmp

如果提示screen: command not found 命令不存在可以执行：sudo apt-get install screen

wget -c http://soft.vpser.net/lnmp/lnmp1.2-full.tar.gz && tar zxf lnmp1.2-full.tar.gz && cd lnmp1.2-full && ./install.sh lnmp
```

文献资料
- [LNMP](http://lnmp.org/install.html)
- [LNMP安装了哪些软件？安装目录在哪？](http://lnmp.org/faq/lnmp-software-list.html)
- [LNMP状态管理命令](http://lnmp.org/faq/lnmp-status-manager.html)

