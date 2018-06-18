# 通过网页远程控制树莓派的GPIO

### 下载和安装WebIOPi

(WebIOPi)[https://sourceforge.net/projects/webiopi/files/]

$tar xvzf WebIOPi-0.7.1.tar.gz

$cd WebIOPi-0.7.1

$sudo ./setup.sh

### 运行WebIOPi

sudo python -m webiopi [port]

注：port为端口号，不配的话默认是8000

关闭程序是“ctrl+z”

### 后台运行或者关闭WebIOPi

$sudo /etc/init.d/webiopi start

$sudo /etc/init.d/webiopi stop

### 启动自动运行WebIOPi

$sudo update-rc.d webiopi defaults
$sudo update-rc.d -f webiopi remove


运行WebIOPi后，在PC上打开IE浏览器，输入树莓派的ip和端口（之前步骤中设置过）

帐号：webiopi

密码：raspberry

### 测试安装是否成功

webiopi -h

(node JS GPIO)[http://cnodejs.org/topic/54032efa9769c2e93797cd06]
(webiopi安装与入门)[http://blog.csdn.net/xukai871105/article/details/20799551]
