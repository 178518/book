# Docker概念

![png](https://raw.githubusercontent.com/arkulo56/thought/master/fotosay/dockerlnmp.png)

官方的 nginx 容器里，连 vim 都没有，这是个比较苦恼的事情，所以可以先启动容器进入交互界面安装 vim。

```
docker run -t -i -p 1983:80 nginx /bin/bash
```

这里进入的是 bash，-p 1983:80 是将容器里的80端口与主机的1983端口进行绑定。

进入容器后，会发现并不能访问容器里的 nginx 欢迎界面，这是因为 nginx 服务并没有启动。

使用命令

```
/etc/init.d/nginx start
```

### 运行一个容器

官方的 nginx 容器里，连 vim 都没有，这是个比较苦恼的事情，所以可以先启动容器进入交互界面安装 vim

这里进入的是 bash，-p 1983:80 是将主机的1983端口与容器里的80端口进行绑定。

```
bash 模式
sudo docker run -t -i -p 1983:80 nginx /bin/bash

后台模式
sudo docker run -idt --pid=host -p 1983:80 nginx

容器中/etc/nginx/conf.d目录下的文件将与宿主机中/nginx/conf.d目录下的文件保持同步，Docker使用:从容器路径拆分主机的路径，主机路径始终是第一位的。
为容器添卷时，还可以通过rw或ro参数指定容器内目录的读写状态,默认读写。如，设置为只读状态：

sudo docker run -idt -v /var/www/html:/var/www/html --pid=host -p 1983:80 nginx

进入容器
sudo docker attach [CONTAINER ID]

取得运行容器的PID
sudo docker inspect --format "{{ .State.Pid }}" [CONTAINER ID]

通过PID进入容器
sudo nsenter --target 8900 --mount --uts --ipc --net --pid

更新源
apt-get update

安装nano命令
apt-get install nano

```

### 停止一个容器
```
docker stop [CONTAINER ID]
```

### 删除一个容器,删除之前必须先停止
```
docker rm [CONTAINER ID]
```

# 参考资料

* [docker 使用](http://xinqiu.me/2015/11/13/docker+nginx/)
* [docker book](https://yeasy.gitbooks.io/docker_practice/content/container/enter.html)
* [docker 命令](http://www.jianshu.com/p/712a756bae1e)