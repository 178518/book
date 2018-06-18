# 安装MiniDLNA

### 安装
```
sudo apt-get install minidlna
```

### 修改配置
```
#打开配置文件
sudo nano /etc/minidlna.conf
#可参考修改的项有：
#媒体文件目录：
media_dir=/mnt/myusbdrive/
#数据库目录，minidlna使用的是sqlite数据库来索引文件
db_dir=/var/lib/minidlna
#服务器IP
listening_ip=192.168.1.106
#端口
port=8200
#网络名称，用于其它设备发现当前设备
friendly_name=DLNA
```

### 让minidlna随机启动
```
sudo update-rc.d minidlna defaults
```

### 启动minidlna服务
```
sudo service minidlna start
```

### 当你修改配置文件及媒体资源更新时，需要强制刷新，以便minidlna将最新的媒体文件进行索引
```
sudo service minidlna force-reload
```

### 查看资源个数
```
http://ip:8200/
```

### 取消minidlna的开机自动启动
```
sudo update-rc.d -f minidlna remove
```

### 停止minidlna服务
```
sudo service minidlna stop
```

### 停止minidlna所有进程
```
sudo killall minidlna
```

### 卸载minidlna
```
sudo atp-get remove --purge minidlna
```