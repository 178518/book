# Docker 镜像制作

### 创建Dockerfile脚本
```
FROM daocloud.io/library/debian:latest
MAINTAINER yunyi.zy "178518@gmail.com"

ENV DEBIAN_FRONTEND noninteractive

RUN adduser --disabled-login --gecos 'Tengine' nginx

WORKDIR /home/nginx

RUN apt-get update
RUN apt-get install wget
RUN wget http://tengine.taobao.org/download/tengine-2.1.2.tar.gz
RUN tar zxvf tengine-2.1.2.tar.gz
RUN rm tengine-2.1.2.tar.gz

WORKDIR /home/nginx/tengine-2.1.2

RUN ./configure
RUN make
RUN make install
RUN echo "daemon off;" >> /usr/local/nginx/nginx.conf
RUN apt-get clean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /home/nginx/*

WORKDIR /usr/local/nginx/sbin/
CMD ["./nginx"]

EXPOSE 80
EXPOSE 443
```

### build镜像
```
docker build --rm -t test_tengine .

注意：最后的.不能省略
```

# 参考资料

* [Dockerfile使用总结](http://www.lining0806.com/dockerfile%E4%BD%BF%E7%94%A8%E6%80%BB%E7%BB%93/)