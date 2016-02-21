# Raspbian的配置

> Raspbian第一次启动需要用有线连接的方式

> 默认用户是pi 密码为raspberry

> 默认用户名是xbian 密码是raspberry

> 用命令：sudo service xbmc restart 来重启xbmc
  
  重新开启root账号，可由pi用户登录后，在命令行下执行

### 树莓派登录
```
sudo passwd root
```
执行此命令后系统会提示输入两遍的root密码，输入你想设的密码即可，然后在执行

```
sudo passwd --unlock root
```

这样就可以解锁root账户了。切换root命令

```
su root
```

### 树莓派重启

```
sudo reboot
sudo shutdown -r now
```

### 树莓派关机

```
sudo shutdown -h now
sudo halt
sudo poweroff
```

### 源更改

```
sudo nano /etc/apt/sources.list

deb http://mirrors.ustc.edu.cn/raspbian/raspbian/ jessie main contrib non-free rpi
```
Ctrl+O保存，Ctrl+X退出

### 更新软件
```
# 更新软件源数据
sudo apt-get update
# 更新已安装软件
sudo apt-get upgrade
这三个命令主要清理升级缓存以及无用包的。
# 清理旧版本的软件缓存
apt-get autoclean
# 清理所有软件缓存
apt-get clean
# 删除系统不再使用的孤立软件
apt-get autoremove
```

### 使用raspi-config配置树莓派
```
sudo raspi-config
sudo xbian-config
```

### 无线网卡配置

无线网卡插入树莓派
```
sudo nano /etc/network/interfaces

内容如下：
auto lo
auto eth0

iface eth0 inet dhcp
iface lo inet loopback

allow-hotplug wlan0
iface wlan0 inet dhcp
wpa_conf /etc/wpa_supplicant/wpa_supplicant.conf

iface default inet dhcp

sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
内容如下：

ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
 ssid="无线SSID"
 psk="无线密码"
 priority=5
}

重启网关
sudo /etc/init.d/networking restart

priority 是指连接优先级，数字越大优先级越高（不可以是负数）。

连接WiFi
sudo ifup wlan0
断开WiFi
sudo ifdown wlan0

到这里，一切都配置好了。下次开机的时候，树莓派将自动连接有效的WiFi。

你可以试验一下WiFi的掉线自动重连功能，比如重启一下无线路由器，看树莓派还能不能重新连接上无线路由器。
```

### aria2 apache2 git安装
```
sudo apt-get install aria2 apache2 nginx git 

ps -ef|grep apache

启动：sudo apache2ctl -k start

停止：sudo apache2ctl -k stop

重新启动：sudo apache2ctl -k restart

Web默认的是/var/www/html

配置文件保存在：/etc/apache2

aria2配置

备注：file-allocation=none，大容量磁盘不要预分配，会造成大文件无法下载。

mkdir /home/xbian/.aria2
touch /home/xbian/.aria2/aria2.session
nano  /home/xbian/.aria2/aria2.conf
aria2.conf里面写这些：
## '#'开头为注释内容, 选项都有相应的注释说明, 根据需要修改 ##
## 被注释的选项填写的是默认值, 建议在需要修改时再取消注释  ##

## 文件保存相关 ##

# 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置
dir=/home/xbian/hdd/download
# 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
#disk-cache=32M
# 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
# 预分配所需时间: none < falloc ? trunc < prealloc
# falloc和trunc则需要文件系统和内核支持
# NTFS建议使用falloc, EXT3/4建议trunc, MAC 下需要注释此项
file-allocation=none
# 断点续传
continue=true

## 下载连接相关 ##

# 最大同时下载任务数, 运行时可修改, 默认:5
max-concurrent-downloads=10
# 同一服务器连接数, 添加时可指定, 默认:1
max-connection-per-server=10
# 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M
# 单个任务最大线程数, 添加时可指定, 默认:5
split=10
# 整体下载速度限制, 运行时可修改, 默认:0
#max-overall-download-limit=0
# 单个任务下载速度限制, 默认:0
#max-download-limit=0
# 整体上传速度限制, 运行时可修改, 默认:0
#max-overall-upload-limit=0
# 单个任务上传速度限制, 默认:0
#max-upload-limit=0
# 禁用IPv6, 默认:false
#disable-ipv6=true

## 进度保存相关 ##

# 从会话文件中读取下载任务
input-file=/home/xbian/.aria2/aria2.session 
# 在Aria2退出时保存`错误/未完成`的下载任务到会话文件
save-session=/home/xbian/.aria2/aria2.session 
# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
#save-session-interval=60

## RPC相关设置 ##

# 启用RPC, 默认:false
enable-rpc=true
# 允许所有来源, 默认:false
rpc-allow-origin-all=true
# 允许非外部访问, 默认:false
rpc-listen-all=true
# 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同
#event-poll=select
# RPC监听端口, 端口被占用时可以修改, 默认:6800
#rpc-listen-port=6800
# 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
#rpc-secret=<TOKEN>
# 设置的RPC访问用户名, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-user=<USER>
# 设置的RPC访问密码, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-passwd=<PASSWD>

## BT/PT下载相关 ##

# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
#follow-torrent=true
# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
listen-port=51413
# 单个种子最大连接数, 默认:55
#bt-max-peers=55
# 打开DHT功能, PT需要禁用, 默认:true
enable-dht=false
# 打开IPv6 DHT功能, PT需要禁用
#enable-dht6=false
# DHT网络监听端口, 默认:6881-6999
#dht-listen-port=6881-6999
# 本地节点查找, PT需要禁用, 默认:false
#bt-enable-lpd=false
# 种子交换, PT需要禁用, 默认:true
enable-peer-exchange=false
# 每个种子限速, 对少种的PT很有用, 默认:50K
#bt-request-peer-speed-limit=50K
# 客户端伪装, PT需要
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
seed-ratio=0
# 强制保存会话, 即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
#force-save=false
# BT校验相关, 默认:true
#bt-hash-check-seed=true
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true

完了后运行：sudo aria2c –-conf-path=/home/xbian/.aria2/aria2.conf
测试有没有错误，如果没有错误的话Ctrl + C终止程序继续下一步，有错误会提示你conf文件哪里错误。
把aria2做成系统的服务：
sudo nano /etc/init.d/aria2c
case "$1" in
start)

echo -n "Starting aria2c"
sudo -u root aria2c --conf-path=/home/xbian/.aria2/aria2.conf -D
;;
stop)
 
echo -n "Shutting down aria2c "
killall aria2c
;;
restart)
 
killall aria2c
sudo -u root aria2c --conf-path=/home/xbian/.aria2/aria2.conf -D
;;
esac
exit

Ctrl + O 保存后退出
然后设置这个文件的权限。

sudo chmod 777 /etc/init.d/aria2c

试服务是否可以启动：
sudo service aria2c start/stop
如果只显示Starting aria2c，没有其他错误提示的话就成功了。命令可用检查下
sudo ps x |grep aria2
添加aria2c服务自动运行：
sudo update-rc.d aria2c defaults
Aria2相关的好了，下面开始网页控制aria2下载。
git clone https://github.com/wzhy90/yaaw
git clone https://github.com/ghostry/webui-aria2.git
sudo /etc/init.d/nginx start
管理器用的是yaaw，网上的是英文的，我已经翻译好中文了。

用浏览器打开yaaw：http://192.168.1.14/yaaw
如果没提示错误就可以了
```

[Aria2设置说明](http://aria2c.com/usage.html)

[使用aria2打造下载利器](http://ju.outofmemory.cn/entry/146734)

### 安装NTFS模块(新版系统已不需要安装)
```
#安装所需软件包
sudo apt-get install fuse-utils ntfs-3g
#加载内核模块
modprobe fuse
```

### 通过etc/fstab实现自动挂载 (新版系统已自动挂载)
```
查看挂载情况
sudo fdisk -l或者df –lh
編輯/etc/fstab文件，加入
cat /etc/fstab
#硬盤位置        掛載點         格式    
/dev/sda1       /home/xbian/hdd   NTFS    defaults          0       0
接著在/home/xbian/下新建個叫“hdd”的文件夾并執行：
sudo mount -a
sudo chmod 777 /home/pi/hdd
```

### Samba配置(新版系统默认自带)
```
sudo apt-get install samba samba-common-bin

sudo nano /etc/samba/smb.conf

guest ok=no 禁止匿名用户访问

hosts allow = 192.168.1.? 开放指定IP访问,多个IP之间用空格隔开

valid users = yzhao    //有效的用户和组，多个空格隔开

[global]
 server string = XBIAN
 guest ok = no
 security = user
 socket options = TCP_NODELAY SO_RCVBUF=65535 SO_SNDBUF=65535
 registry shares = yes
 syslog = 0
 map to guest = bad user
 workgroup = WORKGROUP
 bind interfaces only = No
 encrypt passwords = true
 log level = 0
 hosts allow = 192.168.1.100 192.168.1.102
# smb ports = 445
 unix extensions = No
 wide links = yes

 include = /etc/samba/user.conf
 include = /etc/samba/shares.conf  
 
 [xbian]
     path = /home/xbian
     guest ok = no
     read only = no
     force user = xbian
     browseable = no
 
 [xbian-xbmc]
     path = /home/xbian/.xbmc
     guest ok = no
     read only = yes
     force user = xbian
     browseable = no
 
 [xbian-kodi]
     path = /home/xbian/.kodi
     guest ok = no
     read only = yes
     force user = xbian
     browseable = no
 
 [system-logs]
     path = /var/log
     guest ok = no
     read only = yes
     force user = root
     browseable = no

#添加账户
添加的Samba用户首先必须是Linux用户
sudo useradd yzhao
#向smb添加用戶和密碼，輸兩次密碼的喲
sudo smbpasswd -a yzhao 
#最後重啟Samba服務
先看一下samba的服务到底启动了没有：ps -aux | grep samba 
先查看samba服务的端口 
netstat -ntulp |grep 139
可以看到端口号为139和445 
sudo service smbd restart

查看smb是否开启动：

chkconfig --list |grep smbd

执行结果：0:关闭 1:关闭 2:启用 3:启用 4:启用 5:启用 6:关闭

如果2至5是关闭，表示每次开机不是自动启动，反之。

设置smbd开机启动：chkconfig smbd on

service smbd status命令可以查看运行状态.
```

#重启自动上报IP
```
python /opt/pifind.py

pifind的内容如下：
#!/usr/bin/env python2.7
import smtplib, httplib, string, subprocess
# pifind.py by Alex Eames http://RasPi.tv
# pifind.py gets the system parameters you want to know and
# emails them through gmail to a destination of your choice

# INSTALLING pifind
# Add this line to /etc/rc.local
#   python /home/pi/pifind.py
# And place this file, pifind.py in your /home/pi folder, then
#   sudo chmod 755 /home/pi/pifind.py

# Settings
fromaddr = '发件人邮箱'
toaddr  = ['收件人邮箱']

#mail login details
username = '用户名'
password = '密码'
smtp_server = 'smtp.163.com'


#get ip config info
output_if = subprocess.Popen(['ifconfig'], stdout=subprocess.PIPE).communicate()[0]

#get cpu info
output_cpu = open('/proc/cpuinfo', 'r').read()

#find cpu serial no in cpu info
keyword = "Serial"
cpu_serial = output_cpu[output_cpu.find(keyword)+ len(keyword) :]
cpu_serial = cpu_serial[cpu_serial.find(":")+ 1 :].strip()

#get external IP address
connection = httplib.HTTPConnection("checkip.dyndns.org")
connection.request('get','/')
external_ip = connection.getresponse().read()
connection.close()

#find ip address in text
keyword = "Address:"
external_ip = external_ip[external_ip.find(keyword)+ len(keyword) :]
external_ip = external_ip[:external_ip.find("<"):].strip()

BODY = string.join((
        "From: %s" % fromaddr,
        "To: %s" % toaddr,
        "Subject: Your Raspberry Pi "+cpu_serial+" just booted",
        "",
        "The CPU serial no :" + cpu_serial +"\n",
        "The external IP address:" + external_ip +"\n",
        "You may locate this IP address in http://whatismyipaddress.com \n",
        "==========================================",
        "\n\nDetailed IP info\n\n",
        output_if,
        "==========================================",
        "\n\nDetailed CPU info\n\n",
        output_cpu,
        ), "\r\n")

# send the email
server = smtplib.SMTP(smtp_server)
server.starttls()
server.login(username,password)
server.sendmail(fromaddr, toaddr, BODY)
server.quit()

# emailing code from http://www.nixtutor.com/linux/send-mail-through-gmail-with-python/
# BODY bit http://www.blog.pythonlibrary.org/2010/05/14/how-to-send-email-with-python/
```
sudo nano /etc/rc.local

在文件末尾 ，在exit 0 这一行之前，加入一行：python /opt/pifind.py

## 定时上报PI的IP

![crontab](http://my.csdn.net/uploads/201207/20/1342769209_5435.png)

/opt/report-network.sh

加入如下内容

python /opt/pifind.py

设置定时任务

sudo nano /etc/crontab

m h day mon dow user  command

0 * * * * root /opt/report-network.sh

sudo /etc/init.d/cron restart

这样我们的PI基本不会丢失，结合看门狗可以实现自动重启自动联网

### 树莓派看门狗
启用模块 bcm2708_wdog

sudo modprobe bcm2708_wdog

sudo nano /etc/modules

在文件最后一行，添加一行

bcm2708_wdog

启用模块后，则系统增加了一个设备  /dev/watchdog

每10秒必须喂一下这个狗


sudo apt-get install chkconfig watchdog

启动watchdog 软件

sudo /etc/init.d/watchdog start

sudo nano /etc/watchdog.conf

去掉 watchdog-device = /dev/watchdog 前的#号，让看门狗设备对应树莓派的硬件看门狗

取消掉 max-load-1 = 24 前的注释#号，当1分钟load进程超过24个的时候（一般5个就是超高负载了，再<FONT face="Courier New">高可以认为是死机，这在遭遇DDOS攻击的时候很容易遇到）就触发重启</FONT>
还可以设置如温度到了多少度就重启，如 取消掉

temperature-device =

max-temperature = 120

前的注释#号去掉，改为

temperature-device = /sys/class/thermal/thermal_zone0/temp

max-temperature = 70000

(温度一般不超过85度就不会损坏芯片，/sys/class/thermal/thermal_zone0/temp记录的是实时的温度，单位为千分之一摄氏度，所以75000就是75℃)
还可以设置内存耗尽就重启，如min-memory =1 前的注释#号去掉
还可以设置监控的间隔，如 interval = 1 前的注释#号去掉，该1为任意数字，单位是秒，默认是10秒一次健康检查

配置看门狗程序，开机自动运行

sudo chkconfig watchdog on

sudo /etc/init.d/watchdog restart 

输入下述命令(forkbomb)，测试一下看门狗

树莓派假死字符串

: (){ :|:& };:

如果正常过一会树莓派会自动重启

***

以下是老方法仅供学习

由于树莓派断网并不会自动重新连网，假如当我在外地想远程登录控制树莓派怎么办呢，网都连不上，怎么控制呀。
解决办法是：写一个自动断网重连的脚本，让pi定时执行并检查网络是否连通，如断网则自动重新连接。
在 /etc/network/if-down.d/ 文件夹下新建net_restart.sh，net_restart.sh脚本用于当网络断开时重新启动网络：
```
sudo nano /etc/network/if-down.d/net_restart.sh

编辑net_restart.sh脚本，输入：

#!/bin/bash
#value define
urls=("www.baidu.com" "www.hao123.com")
http_code=("200" "301" "302" "404")
count=${#urls}
connected=0
 
 
echo "now start to check net is on or not!"
echo "bash file in /etc/network/if-down.d/net_restart.sh"
#check net is conneted or not
for ((i=0; i < $count; i++))
do
   url=${urls[$i]}
   result=$(curl -o /dev/null -s -m 10 -w %{http_code} $url)
   for flag in ${http_code}
   do 
       if [ $flag = $result ];then
          connected=$(expr $connected + 1)
       fi
   done
done
 
 
#if net is down then restart and reboot
if [ $connected -eq 0 ];then
    echo "network is not very well !"
    echo "now restart net !"
    /etc/init.d/networking restart
    /sbin/ifup wlan0
   /sbin/ifup eth0
fi

注意 if 条件判断的方括号“["、”]" 左右两边都有空格,要执行这个脚本需用到curl 工具：

sudo apt-get install curl

Ctrl + O保存，Ctrl+X退出 给net_restart.sh添加可执行权限：

sudo chmod 777 /etc/network/if-down.d/net_restart.sh

同理，新建 net_reboot.sh脚本，net_reboot.sh脚本用于当网络断开时重启树莓派：

#!/bin/bash
#value define
urls=("www.baidu.com" "www.hao123.com")
http_code=("200" "301" "302" "404")
count=${#urls}
connected=0
 
echo "check net is OK or not!"
echo "if not,then will reboot"
echo "bash file in /etc/network/if-down.d/net_reboot.sh"
#check net is conneted or not
for ((i=0; i < $count; i++))
do
   url=${urls[$i]}
   result=$(curl -o /dev/null -s -m 10 -w %{http_code} $url)
   for flag in ${http_code}
   do 
       if [ $flag = $result ];then
          connected=$(expr $connected + 1)
       fi
   done
done
 
 
#if net is down then restart and reboot
if [ $connected -eq 0 ];then
    echo "network is not very well or not connected !"
    echo "now start to reboot !"
    #/etc/init.d/networking restart
    #/sbin/ifup wlan0
   #do
     #echo "now reboot"
     killall motion        #这里添加重启pi前要执行的任务，比如杀死某些你启动的进程，需自己修改
 
     reboot    #重启树莓派
   #done
fi

保存退出，添加权限：

sudo chmod 777 /etc/network/if-down.d/net_reboot.sh

进入root用户权限下：

命令将以哪个用户的名义执行（在文件 /etc/crontab和 /etc/cron.d/中，而不是在用户自己的调度文件中）

![crontab](http://images.cnitblog.com/blog/34483/201301/08090352-4e0aa3fe4f404b3491df384758229be1.png)

在以上各个字段中，还可以使用以下特殊字符：
星号（*）：代表所有可能的值，例如month字段如果是星号，则表示在满足其它字段的制约条件后每月都执行该命令操作。
逗号（,）：可以用逗号隔开的值指定一个列表范围，例如，“1,2,5,7,8,9”
中杠（-）：可以用整数之间的中杠表示一个整数范围，例如“2-6”表示“2,3,4,5,6”
正斜线（/）：可以用正斜线指定时间的间隔频率，例如“0-23/2”表示每两小时执行一次。同时正斜线可以和星号一起使用，例如*/10，如果用在minute字段，表示每十分钟执行一次。

sudo nano /etc/crontab
在文件尾添加：
*/20 * * * * /etc/network/if-down.d/net_restart.sh
0 17 */1 * * /etc/network/if-down.d/net_reboot.sh

0 * * * * /opt/report-network.sh
表示每20分钟执行一次net_restart.sh脚本，检查网络是否连通。每天的17:00执行net_reboot.sh，如网络断开则重启一次树莓派。
每个小时0分钟上报一次pi的地址
最后，还要使cron定时任务生效：
/etc/init.d/cron restart

编辑当前用户的cron任务
crontab -e
查看当前用户的cron任务
crontab -l

如果有root权限，那么要查看用户wangyu的cron任务，使用 -u 参数：
sudo crontab -u [用户名] -l

查看任务：
nano /etc/crontab
注意问题：
1、有童鞋问了，这2个脚本都差不多啊，干嘛要2个，只写一个就行了嘛。然而这2个脚本是有差别的。net_restart.sh脚本里的关键语句/etc/init.d/networking restart  重启网络命令并不一定能使网络好转，实际跟理论的区别啊，重启一次树莓派就好多了。
2、上文的crontab -e 打开的cron定时任务文件并不是 /etc/crontab ，而是在 /var/spool/cron/crontabs/ 目录下的文件：pi ，root 。每个用户（pi ，root）分别有cron定时任务的。
```