利用Resilio Sync搭建私有云


一般情况我们会使用现成的网盘，可是，各种内置的后门多的数不过来，不知道那天就被请去喝咖啡了，怎么才能私密一点？很多人都发现了，放在百度网盘的小电影都变成8秒短片了，呵呵。。。然后，催生了我们的新式分享工具—-BTSync

BTSync是免费跨平台文件同步软件。不需第三方服务器即可在多台电脑之间同步和共享文件，全程AES加密。它采用基于类似BT下载的P2P分布式技术而来，速度快而且可通过密钥文件共享，可设置完整权限同步或者让接收方只读，还可以发送 24 小时有效期的密钥，过期作废。

也就是说，你发布一个密钥，其他人就可以同步你共享的文件，更可以做到增量式（差异）同步，同步的人越多速度越快，和BT下载一个道理。
Btsync支持超多的系统，从桌面系统到嵌入式、手机等等，最好的莫过于有ARM-linux版

访问 https://www.getsync.com/platforms/desktop 下载ARM版


然后解压到你的树莓派的某一目录下

进入目录，输入命令

./rslsync --webui.listen 0.0.0.0:8888


文献资料
- [通过树莓派和BTSync搭建个人云存储](http://ukonline2000.com/?p=887)
- [Resilio(BtSync)搭建](http://ukonline2000.com/?p=887)
- [利用Resilio Sync搭建私有云](http://ukonline2000.com/?p=887)
- [树莓派折腾之：BTSYNC同步所有电脑和手机](http://www.wuliaole.com/post/use_btsync_to_sync_files_among_terminals_based_on_raspberry_pi/)
- [用BitTorrent Sync在5分钟内打造类似Dropbox的私有云存储服务](http://www.macode.net/bittorrent-sync-private-cloud-stroage/)
- [Daemon Sync - 超简单搭建私有云！全自动同步备份手机照片视频到电脑](http://www.iplaysoft.com/daemon-sync.html)