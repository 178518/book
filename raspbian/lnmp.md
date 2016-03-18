# 安装Ngix/PHP5/MySQL5

### chkconfig命令

chkconfig命令主要用来更新（启动或停止）和查询系统服务的运行级信息

使用范例：
chkconfig --list        #列出所有的系统服务
chkconfig --add httpd        #增加httpd服务
chkconfig --del httpd        #删除httpd服务
chkconfig --level httpd 2345 on        #设置httpd在运行级别为2、3、4、5的情况下都是on（开启）的状态
chkconfig --list        #列出系统所有的服务启动情况
chkconfig --list mysqld        #列出mysqld服务设置情况
chkconfig --level 35 mysqld on        #设定mysqld在等级3和5为开机运行服务，--level 35表示操作只在等级3和5执行，on表示启动，off表示关闭
chkconfig mysqld on        #设定mysqld在各等级为on，“各等级”包括2、3、4、5等级

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

> 至此我有了一个基于看门狗的24小时不断网，可以自动重启的服务器，他提供下载，共享，LNAMP，Java等服务，并且可以搭建一个小型NAS，如果放在客厅还可以作为视频播放盒。

### 反向代理设置Nginx+Apache

/etc/nginx/nginx.conf

```
user www-data;
worker_processes 4;
pid /run/nginx.pid;
# 更改worker进程的最大打开文件数限制
worker_rlimit_nofile 100000;

events {
        # 定义一个worker进程能够同时连接的数量
        worker_connections 1024;
        # 告诉nginx收到一个新连接通知后接受尽可能多的连接。
        multi_accept on;
        # 设置用于复用客户端线程的轮询方法 如果你使用Linux 2.6+，你应该使用epoll。如果你使用*BSD，你应该使用kqueue。
        use epoll;
}

http {
        ##
        # Basic Settings
        ##

        # 如果该指令被启用，Nginx将使用sendFile 内核来调用文件传递。如果禁用，那么nginx将自己处理文件传递
        sendfile on;
        # 该选项只用于sendfile已启动的情况。若为on, 那么nginx将尝试单个TCP数据包中发送整个HTTP响应头
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        client_header_timeout   30s;
        # 指定持有客户端请求主体的缓存大小，如果超过这个大小，那么主体将被写到磁盘
        client_body_buffer_size 32k;
        types_hash_max_size 2048;
        # 隐藏nginx的版本号,出现400 500 页面时候不会显示nginx服务器的版本号,避免漏洞
        server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        
        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##
        #开启gzip模块  off为关闭
        gzip on;
        gzip_disable "msie6";
                
        # gzip_static on;
        # 设置允许压缩的页面最小字节数，默认为0，页面多大都压缩
        gzip_min_length  1k;
        # 有的浏览器支持压缩，有的不支持，为了避免浪费，根据HTTP头来判断是否需要压缩
        gzip_vary on;
        # 允许或者禁止压缩基于请求和响应的响应流。我们设置为any，意味着将会压缩所有的请求。
        gzip_proxied any;
        # gzip压缩比，1压缩比最小，9压缩比最大，相应的速度也会变慢
        gzip_comp_level 6;
        # 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流
        gzip_buffers 64 8k;
        # 识别http的协议版本
        gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}

#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}
```

/etc/nginx/sites-enabled/default 

```
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Generally, you will want to move this file somewhere, and start with a clean
# file but keep this around for reference. Or just disable in sites-enabled.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
        # 指定用于提供web服务站点监听的套接字所使用的IP和端口
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;
        # 定义文档的根目录，该目录包含你希望为访问者提供的内容
        root /var/www/html;

        # Add index.php to the list if you are using PHP
        # 定义一个默认的页面，如果请求中没有指定文件名，nginx就会使用该页面提供服务
        index index.html index.htm index.php index.nginx-debian.html;

        # 在server区段指定一个或者多个主机名（hostname）Nginx接收到HTTP请求以后，会与所有server区段相比较，然后找到与客户端请求header中Host匹配的server区段。
        # 如果没有与客户端匹配的server区段，nginx会选择第一个server区段。该指令接受通配符
        server_name www.yuuso.com yuuso.com;
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
            {
                expires      60d;
            }

        location ~ .*\.(js|css)?$
            {
                expires      30d;
            }
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        location ~ .*\.(php|php5)?$ {
        include snippets/fastcgi-php.conf;
        index index.php;
        # 符合location 样式跳转地址； 这个指令设置被代理服务器的地址和被映射的URI，地址可以使用主机名或IP加端口号的形式。
        proxy_pass http://192.168.1.118:9000;
        # proxy_set_header nginx作为反向代理服务器，将请求转发给后端真实服务器，如果不行host的重写，所有的真是服务器都会误认为是nginx服务器发送的请求。
        # proxy_set_header就是用于将客户端真实的host, ip信息，传送给后端服务器。
        # proxy_set_header Host $host;
         proxy_set_header Host $host:$server_port;
         proxy_set_header Web-Server-Type nginx;
         proxy_set_header X-Forward-For $remote_addr;
         proxy_set_header WL-Proxy-Client-IP $remote_addr;
         # 在这里X-Real-IP是一个自定义的变量名，名字可以随意取，在web端可以用request.getAttribute("X-Real-IP")  获取IP
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         #proxy_set_header   Referer http://$host;

        # With php5-cgi alone:
        #        fastcgi_index index.php;
        #       fastcgi_pass 127.0.0.1:9000;
        #       # With php5-fpm:
        #       fastcgi_pass unix:/var/run/php5-fpm.sock;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}
            
# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
# }            
```


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

