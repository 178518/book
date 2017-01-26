OwnCloud是一个基于PHP的私有云服务，而且有中文界面。由于是用PHP构建的，在Raspberry Pi上也可以运行。

[项目首页](https://owncloud.org)

[下载页](https://owncloud.org/install/#edition)

[owncloud-9.1.3.zip](https://download.owncloud.org/community/owncloud-9.1.3.zip)


### 准备

1、搭建前先确保自己的RPi上已安装并配置好LAMP，并保证可外网访问。

sudo apt-get install php5-gd php5-curl

2、新建一个ownCloud使用的数据库和相应的用户并赋予权限，记好密码，为安装ownCloud作准备，可以用phpmyadmin图形化工具甚至用命令行创建数据库；

3、应用目录权限设置

```
sudo chown -R www-data:www-data data 
sudo chown -R www-data:www-data config 
sudo chown -R www-data:www-data apps
```

4、修改owncloud的数据存储目录

```
修改config/config.php文件中的datadirectory

'datadirectory' => '/media/usbdisk/ocdata/'

cp -r data usbhhd
```

5、修改上传文件大小限制
```
nano /var/www/html/owncloud/.htaccess

找到这两行代码
php_value upload_max_filesize 513M
php_value post_max_size 513M

注：里面分为php5和php7，你需要把两处都修改了，总共是4个地方。

sudo nano /etc/php5/apache2/php.ini

max_execution_time = 150 ，这个是每个脚本运行的最长时间，单位秒

max_input_time = 600，这是每个脚本可以消耗的时间，单位也是秒

memory_limit = 512M，这个是脚本运行最大消耗的内存

post_max_size = 1024M，表单提交最大数据为 8M

upload_max_filesize = 512M ，上载文件的最大许可大小

nginx最大上传文件大小

sudo nano /etc/nginx/nginx.conf

client_max_body_size    512m;

apache最大上传文件大小

sudo nano /etc/apache2/apache2.conf
#最大上传文件大小
LimitRequestBody 600000000
```

6、修改ownCloud存储路径

停止web服务，打开配置文件

```
nano /var/www/owncloud/config/config.php

注意：挂载的时候必须制定gid和uid，文件的权限
sudo mount -t cifs -o username="Username",password="Password",rw,gid=www-data,uid=www-data,dir_mode=0770,file_mode=0770 //IP/share /mnt/smb

sudo umount /mnt/smb

修改数据存储目录
'datadirectory' => '/home/pi/usbhhd/owncloud/data'
```