### 基础选项
## 下载目录
dir=/home/xbian/hdd/download
## 读取上次下载的文件
input-file=/home/xbian/.aria2/aria2.session
## 日志文件
log=/var/log/aria2.log
## 同时下载数
max-concurrent-downloads=10
## 检测下载完成后的文件是否损坏
check-integrity=true
## 断点下载
continue=true

### HTTP/FTP选项
## 重试次数
max-tries=5
## 重试延时（秒）
retry-wait=3
## 单个服务器最大连接数
max-connection-per-server=5
## 文件分割下载
split=10
min-split-size=100M
## 保存cookies
#load-cookies=/home/jsntyyl/.aria2/aria2.cookies
#save-cookies=/home/jsntyyl/.aria2/aria2.cookies
## user agent，此处所填值用于伪装成百度云网盘客户端，以达到满速下载的目的
#user-agent=netdisk;4.4.0.6;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia

### BitTorrent选项
## 开启LPD、DHT、PEX
bt-enable-lpd=true
enable-dht=true
enable-dht6=false
enable-peer-exchange=true
## 单个种子最大peer数
bt-max-peers=100
## 加密选项
bt-require-crypto=true
bt-min-crypto-level=plain
## 优先下载文件的头尾
bt-prioritize-piece=head=50M,tail=50M
## 删除不要的文件
bt-remove-unselected-file=true
## 单个种子下载速度未达到这个数值，自动增加peer数
bt-request-peer-speed-limit=500K
## 使用磁链接下载时保存种子文件
bt-save-metadata=true
## 无速度NUM秒后停止下载该种子
bt-stop-timeout=3600
## DHT和Tracker的UDP端口号，下载用的TCP端口号
dht-listen-port=6999
listen-port=6999
## 下载完成做种相关
seed-ratio=0.0
#seed-time=<MINUTES>

### RPC 选项
## 开启RPC
enable-rpc=true
rpc-user=jsntyyl
rpc-passwd=password
## 允许所有来源，web 界面跨域权限需要，默认 false
rpc-allow-origin-all=true
## 监听所有网络接口的RPC请求
rpc-listen-all=true
## RPC监听端口
rpc-listen-port=6800
## 保存上传元数据
rpc-save-upload-metadata=true

### 高级设置
## 自动保存.aria2控制文件间隔（秒）
auto-save-interval=600
## 后台运行
daemon=true
## 禁用IPV6
disable-ipv6=true
## 缓存
disk-cache=32M
## 下载文件磁盘分配
file-allocation=falloc
enable-mmap=false
## 日志级别
log-level=notice
console-log-level=notice
## 安静模式，无控制台输出
quiet=true
## 保存会话文件间隔（秒）
save-session=/home/xbian/.aria2/aria2.session
force-save=true
save-session-interval=60