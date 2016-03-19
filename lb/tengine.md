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
sudo ./configure
sudo make && make install