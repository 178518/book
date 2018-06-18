#安装gitlab

### 安装相关软件包

```
sudo apt-get install curl openssh-server ca-certificates postfix apt-transport-https
```

### 下载gitlab的初始化脚本并执行

```
sudo curl -sS https://packages.gitlab.com/install/repositories/gitlab/raspberry-pi2/script.deb.sh | sudo bash
```

### 安装gitlab

```
sudo apt-get install gitlab-ce
```

### 启动gitlab，过程很漫长请耐心等待。大概25分钟，毕竟树莓派性能很弱。

```
sudo gitlab-ctl reconfigure
```

### 访问  
```
http://树莓派IP或本地访问http://localhost
```

### 增加swap空间

一般来说可以按照如下规则设置swap大小：

4G以内的物理内存，SWAP 设置为内存的2倍。

4-8G的物理内存，SWAP 等于内存大小。

8-64G 的物理内存，SWAP 设置为8G。

64-256G物理内存，SWAP 设置为16G。

实际上，系统中交换分区的大小并不取决于物理内存的量，而是取决于系统中内存的负荷，所以在安装系统时要根据具体的业务来设置SWAP的值。

### 什么情况下才会使用SWAP？
实际上，并不是等所有的物理内存都消耗完毕之后，才去使用swap的空间，什么时候使用是由swappiness 参数值控制。

cat /proc/sys/vm/swappiness

60
 
该值默认值是60.

swappiness=0的时候表示最大限度使用物理内存，然后才是 swap空间，

swappiness＝100的时候表示积极的使用swap分区，并且把内存上的数据及时的搬运到swap空间里面。

### 如何修改swappiness参数？

--临时性修改：

sysctl vm.swappiness=10

--永久修改：

在/etc/sysctl.conf 文件里添加如下参数：

vm.swappiness=10

或者：echo 'vm.swappiness=10' >>/etc/sysctl.conf

保存，重启，就生效了。

gitlab推荐2G内存，树莓派2只有1G内存空间，可以通过增加1G的swap空间来提升性能。

修改/etc/dphys-swapfile文件，然后重启树莓派sudo reboot。

```
CONF_SWAPSIZE=1024
```

### 配置

#### 更改Web监听端口

在sudo nano /etc/gitlab/gitlab.rb中添加下面选项，然后执行sudo gitlab-ctl reconfigure使配置生效。

```
nginx['listen_port'] = 8899
```

#### 使用已安装的Nginx Web Server

记得将Nginx Web Server运行账号添加到gitlab-www组中

```
sudo usermod -a -G gitlab-www www-data
```

配置完后，执行sudo gitlab-ctl reconfigure后，还要重启系统。不然查看进程，会发现如下错误

```
root 11485 0.0 0.0 1836 608 ? Ss Mar18 0:02 runsvdir -P /opt/gitlab/service log: …..runsv nginx: warning: unable to open supervise/stat.new: file does not exist runsv nginx: warning: unable to open supervise/stat.new: file does not exist runsv nginx: warning: unable to open supervise/pid.new: file does not exist runsv nginx: warning: unable to open log/supervise/pid.new: file does not exist runsv nginx: warning: unable to open log/supervise/pid.new: file does not exist
```

#### 配置外部链接

参考官方文档。如果没有配置该选项的话，默认项目和资源文件的URL路径是相对于机器的主机名。

#### 配置SMTP

默认安装完毕后，可以使用SendMail服务来发送邮件，但是发送的邮件没有发件人信息。配置SMTP后，我们可以让gitlab使用QQ、163等邮箱来发送邮件，还可以指定发件人信息以及回复邮箱账号等。

下面是邮箱的SMTP配置

```
# smtp
gitlab_rails['gitlab_email_from'] = 'gitlab@pzxbc.com'
gitlab_rails['gitlab_email_reply_to'] = 'xxx@pzxbc.com'
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "gitlab@pzxbc.com"
gitlab_rails['smtp_password'] = "password"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
```

性能优化

### 查看swap空间大小

```
free -h
```

### CPU的选择：

1核心的CPU，基本上可以满足需求，大概支撑100个左右的用户，不过在运行GitLab网站的同时，还需要运行多个worker以及后台job，显得有点捉襟见肘了。

2核心的CPU是推荐的配置，大概能支撑500个用户。

4核心的CPU能支撑 2,000 个用户。

8核心的CPU能支撑 5,000 个用户。

16核心的CPU能支撑 10,000 个用户。

32核心的CPU能支撑 20,000 个用户。

64核心的CPU能支持多达 40,000 个用户。

### 内存大小的选择：

512MB RAM 加上 1.5GB 的交换分区是最小化配置，不过不推荐用这么低的内存。

1GB RAM 加上 1GB 交换分区，大概能撑100个左右的用户，不过会比较慢。

2GB RAM 是推荐的配置，能撑100个左右的用户。

4GB RAM 能支撑 1,000 个用户。

8GB RAM 能支撑 2,000 个用户。

16GB RAM 能支撑 4,000 个用户。

32GB RAM 能支撑 8,000 个用户。

64GB RAM 能支撑 16,000 个用户。

128GB RAM 能支撑 32,000 个用户。

### 一些实用的维护命令

```
修改任何配置文件后都要输入如下命令使配置生效
sudo gitlab-ctl reconfigure
页面缓存清除：
sudo gitlab-rake cache:clear RAILS_ENV=production
Gitlab各组件启动：
sudo gitlab-ctl start
Gitlab各组件停止：
sudo gitlab-ctl stop
Gitlab各组件重启：
sudo gitlab-ctl restart
禁用Gitlab开机自启动：
sudo systemctl disable gitlab-runsvdir
启用Gitlab开机自启动
sudo systemctl enable gitlab-runsvdir
```



文献资料
- [配置](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/configuration.md)
- [树莓派安装gitliab](http://www.voidcn.com/blog/725689/article/p-6160172.html)
- [Gitlab安装配置及使用](http://blog.pzxbc.com/2016/03/22/gitlab-install-configure/)
