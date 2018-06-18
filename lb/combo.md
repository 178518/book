# Nginx添加未编译安装模块(Nginx_concat_module)

[Nginx_concat_module](https://github.com/taobao/nginx-http-concat) 是淘宝开发的基于Nginx减少HTTP请求数量的扩展模块,主要是用于合并减少前端用户Request的HTTP请求的数量

1.查看版本

nginx -V

2.下载对应的版本

sudo wget -c http://nginx.org/download/nginx-1.6.2.tar.gz

3.解压文件

sudo tar zxvf nginx-1.6.2.tar.gz

4.必要的模块安装

sudo apt-get install libxml2 libxslt1-dev libgeoip-dev libssl-dev 

5.编译文件

cd nginx-1.6.2

nginx -V 查看原有配置

原有配置
sudo ./configure --with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt=-Wl,-z,relro --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_spdy_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module --add-module=/build/nginx-3r_2aX/nginx-1.6.2/debian/modules/nginx-auth-pam --add-module=/build/nginx-3r_2aX/nginx-1.6.2/debian/modules/nginx-dav-ext-module --add-module=/build/nginx-3r_2aX/nginx-1.6.2/debian/modules/nginx-echo --add-module=/build/nginx-3r_2aX/nginx-1.6.2/debian/modules/nginx-upstream-fair --add-module=/build/nginx-3r_2aX/nginx-1.6.2/debian/modules/ngx_http_substitutions_filter_module --add-module=/opt/nginx-http-concat

sudo ./configure --with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' --with-ld-opt=-Wl,-z,relro --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gzip_static_module                                 --with-http_spdy_module --with-http_sub_module --with-http_xslt_module --with-mail --with-mail_ssl_module --add-module=/opt/nginx-http-concat

sudo make

千万不要 make install,过一会在目录底下生产nginx编译文件(/opt/nginx-1.6.2/objs)

6.备份原有文件

cp nginx /home/pi/nginx.old

7.替换nginx二进制文件

sudo cp -a nginx /usr/sbin/

8.查看安装是否成功

sudo nginx -t  

sudo /etc/init.d/nginx (start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade)

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok

nginx: configuration file /etc/nginx/nginx.conf test is successful

9.两处报错暂时没有解决

nginx: [emerg] unknown directive "ssl_protocols" in /etc/nginx/nginx.conf:46

nginx: configuration file /etc/nginx/nginx.conf test failed

nginx: [emerg] the INET6 sockets are not supported on this platform in "[::]:80" of the "listen" directive in /etc/nginx/sites-enabled/default:19

nginx: configuration file /etc/nginx/nginx.conf test failed

10.最终效果

JS:http://www.yuuso.com/combo/??a.js,b.js

CSS:http://www.yuuso.com/combo/??a.css,b.css
