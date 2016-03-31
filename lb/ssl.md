# nginx 开启HTTPS

# 首先确保机器上安装了openssl和openssl-devel

apt-get install openssl

apt-get install openssl-devel


# 然后就是自己颁发证书给自己

```
cd /home/pi
openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl rsa -in server.key -out server_nopwd.key
openssl x509 -req -days 365 -in server.csr -signkey server_nopwd.key -out server.crt
```

# 至此证书已经生成完毕，下面就是配置nginx
```
server {
    listen  443 ssl;
    #ssl on; 同时支持http和https
    ssl_certificate  /home/pi/server.crt;
    ssl_certificate_key  /home/pi/server_nopwd.key;
}
```
