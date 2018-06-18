#Docker 镜像加速器

我们使用Docker的第一步，应该是获取一个官方的镜像，例如mysql、wordpress，基于这些基础镜像我们可以开发自己个性化的应用。我们可以使用Docker命令行工具来下载官方镜像。
但是因为网络原因，我们下载一个300M的镜像需要很长的时间，甚至下载失败。因为这个原因，阿里云容器Hub服务提供了官方的镜像站点加速官方镜像的下载速度。

使用镜像加速器
在不同的系统下面，配置加速器的方式有一些不同，所以我们介绍主要的几个操作系统的配置方法。
关于加速器的地址，你只需要登录容器Hub服务的控制台，左侧的加速器帮助页面就会显示为你独立分配的加速地址。

当你的docker版本较新时
当你下载安装的Docker Version不低于1.10时，建议直接通过daemon config进行配置。
使用配置文件 /etc/docker/daemon.json（没有时新建该文件）

[阿里云Docker镜像](http://cr.console.aliyun.com/)

```
{
    "registry-mirrors": ["<your accelerate address>"]
}
```

重启Docker就可以了。