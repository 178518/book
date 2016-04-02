# tengine 安装

### 下载tengine

[Tengine](http://tengine.taobao.org/index_cn.html)

sudo wget -c http://tengine.taobao.org/download/tengine-2.1.2.tar.gz

### 安装必要的编译环境好

sudo apt-get install gcc autoconf automake

### 安装需要的组件

cd /usr/local/src

sudo wget -c ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.37.tar.gz

sudo tar zxvf pcre-8.37.tar.gz

cd pcre-8.37

sudo ./configure --prefix=/usr/local/pcre

sudo make && make install

### 解压

sudo tar -xvf tengine-2.1.2.tar.gz

### 源码编译
sudo apt-get install gcc
sudo apt-get install libpcre3 libpcre3-dev
sudo apt-get install zlib1g zlib1g-dev
sudo apt-get install openssl libcurl4-openssl-dev

cd tengine-2.1.2
sudo ./configure --prefix=/opt/webserver/tengine --with-http_concat_module --with-http_ssl_module --with-http_spdy_module --with-http_stub_status_module --with-pcre --with-http_v2_module --with-http_headers_module
sudo make && make install

### 替换原有的nginx

sudo cp nginx /usr/sbin/

### 确认替换成功

nginx -v

Tengine version: Tengine/2.1.2 (nginx/1.6.2)

### 开启combo功能和expires_by_types

location / {
            #root   /var/www/html;
            #index  index.html index.htm index.php;
                # 禁用缓存
                proxy_buffering off;
                # 打开concat 功能
                # 默认关闭
                concat on;
                # 最大合并文件数 (默认: 10)
                concat_max_files 20;
                # 只允许同类型文件合并 默认是开启的
                concat_unique on;
                # 允许合并的文件类型，多个以逗号分隔。如：application/x-javascript, text/css
                concat_types application/javascript text/css;
                #支持根据Content-Type来设置过期时间
                expires_by_types       30d text/css;
                expires_by_types       30d application/javascript;
        }
        
![png](../assets/nginx/1.png)        

![png](../assets/nginx/2.png)        

![png](../assets/nginx/3.png)        

![png](../assets/nginx/4.png) 
       
### 负载均衡配置
       
        upstream Load_Balance_Server {
                #down 表示单前的server暂时不参与负载
                #weight  默认为1.weight越大，负载的权重就越大。
                #max_fails ：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误
                #fail_timeout:max_fails 次失败后，暂停的时间。
                #backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。

                #ip_hash;
                server IP:9000 weight=3;
                server IP:80 weight=1;
        }       

        location = /lb {
                proxy_pass  http://Load_Balance_Server;
        }
        
        这样会按照树莓派3:树莓派2B+ 为3:1进行负载均衡