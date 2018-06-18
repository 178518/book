# netdata 应用

Netdata 是一款 Linux 性能实时监测工具,Netdata是一个高度优化的Linux守护进程，它为Linux系统，应用程序，SNMP服务等提供实时的性能监测。
                           
它用可视化的手段，将被监测者最细微的细节，展现了出来。这样，你便可以清晰地了解你的系统和应用程序此时的状况。

### 安装准备

1.在开始安装前，你需要确保已经安装zlib，

你还需要有一个基本的构建环境，git,gcc,autoconf,autogen,automake,pkg-config.

2.下载netdata 地址：https://github.com/firehol/netdata，也可以使用git：

git clone https://github.com/firehol/netdata.git

这里偶主要介绍ubuntu安装方式

apt-get install zlib1g-dev gcc make git autoconf autogen automake pkg-config

准备工作好以后，接下来就是安装软件,这个就简单了，

进入目录，然后 ./netdata-installer.sh --install /usr/local   就可以安装了

安装好以后，访问地址：http://127.0.0.1:19999/

3.Netdata启动和关闭：
  Netdata启动：
  [root@localhost ~]#/usr/local/netdata/usr/sbin/netdata 
4.Netdata关闭：
  [root@localhost ~]#killall netdata
5.配置
安装成功后可以看到/usr/local/netdata/etc/netdata/netdata.conf配置文件 

![Netdata](http://static.oschina.net/uploads/img/201604/03080928_Rmej.jpg)

使用此软件，你可以得到：

1.优美的界面：bootstrap框架下的控制界面

2.自定义的控制界面：你可以使用简单的HTML代码去自定义控制界面(不需要使用javascript)

3.极其的快速而高效：程序使用C进行编写(默认安装下，预计只有2%的单核CPU使用率和少许的内存使用率)

4.零配置：你只需要去安装它，接着它就会自动地监测一切数据

5.零依赖：它的静态网络文件和网络接口拥有自己的网络服务器

6.可扩展：用它自身的插件API(可以使用许多方式来制作它的插件，从bash到node.js),你可以检测任何可以衡量的数据。

7.可嵌入：它可以在任何Linux内核可以运行的地方运行

### 监测内容：
这是它目前检测的内容（大多数都不需要进行配置，安装后即可开始监测）

1.CPU的使用率,中断，软中断和频率(总量和每个单核)

2.RAM，互换和内核内存的使用率（包括KSM和内核内存deduper）

3.硬盘输入/输出(每个硬盘的带宽，操作，整理，利用等)

![Netdata](http://static.oschina.net/uploads/img/201604/03080930_9s4K.jpg)

4.IPv4网络（数据包，错误，分片）：

TCP：连接，数据包，错误，握手

UDP:数据包，错误

广播：带宽，数据包

组播：带宽，数据包

5.Netfilter/iptables Linux防火墙(连接，连接跟踪事件，错误等)

6.进程(运行，受阻，分叉，活动等)

7.熵

8.NFS文件服务器，v2,v3,v4(输入/输出，缓存，预读，RPC调用)

9.网络服务质量（唯一一个可实时可视化网络状况的工具）

![Netdata](http://static.oschina.net/uploads/img/201604/03080932_hf9U.jpg)

11.应用程序，通过对进程树进行分组（CPU,内存，硬盘读取，硬盘写入，交换，线程，管道，套接字等）

![Netdata](http://static.oschina.net/uploads/img/201604/03080934_ysuZ.gif)

12.Apache Web服务器状态(v2.2, v2.4)

13.Nginx Web服务器状态

14.Mysql数据库（多台服务器，单个显示：带宽，查询/s, 处理者，锁，问题，临时操作，连接，二进制日志，线程，innodb引擎等）

15.ISC Bind域名服务器（多个服务器，单个显示：客户，请求，查询，更新，失败等）

16.Postfix邮件服务器的消息队列（条目，大小）

17.Squid代理服务器（客户带宽和请求，服务带宽和请求）

18.硬件传感器（温度，电压，风扇，电源，湿度等）

19.NUT UPSes（负载，充电，电池电压，温度，使用指标，输出指标）



