# debian Docker

Docker不支持32位的Linux系统，而且Linux内核必须为3.10以上。用uname -r命令来查看Debian系统是32位的还是64位的。

```
user@debian8:~$ uname -m
x86_64
```

Debian 8的Linux内核版本为3.16.0，用uname -r命令来查看Linux内核版本。

```
user@debian8:~$ uname -r
3.16.0-4-amd64
```

使用下面的命令升级到Debian 8的最新Linux内核

```
sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade
```

### Debin 8 Jessie安装Docker engine

添加Docker的GPG密钥。

```
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

在/etc/apt/sources.list.d目录下为docker创建一个源列表文件。

```
sudo nano /etc/apt/sources.list.d/docker.list
```

在文件中添加下面一行文字

```
deb https://apt.dockerproject.org/repo debian-jessie main
```

由于docker的官方软件源要求使用HTTPS连接，所以我们在安装Docker前还需要安装apt-transport-https。这样APT就能与软件源建立HTTPS连接。

```
sudo apt-get install apt-transport-https ca-certificates
```

更新本地软件包索引，然后安装docker-engine。

```
sudo apt-get update && sudo apt-get install docker-engine
```

启动docker服务

```
sudo systemctl start docker
```

设置docker开机自启动

```
sudo systemctl enable docker
```

查看docker运行状态。

```
systemctl status docker
```

查看docker是否正常运行。

```
sudo docker run hello-world
```

如果看见如下信息，说明docker安装正确并能正常运行。

```
Hello from Docker.
This message shows that your installation appears to be working correctly.
```

查看Docker的版本。

```
user@debian8:~$ docker --version
Docker version 1.13.1, build 092cba3
```