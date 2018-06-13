# MAC设置

### macOS Sierra安装软件提示文件已损坏问题解决

```
sudo spctl --master-disable
```

回到系统偏好设置的“安全与隐私”，勾选“允许任何来源”

### MongoDB安装

```
brew install mongodb

mkdir -p /data/db

sudo chown -R  当前登录的用户名 /data

export MONGO_PATH=/usr/local/Cellar/mongodb
export PATH=$PATH:$MONGO_PATH/bin

mongod
```

### mac下代理设置

#### 终端代理上网
```
brew install proxychains-ng

nano /usr/local/etc/proxychains.conf

socks5 127.0.0.1 1080
```

### git设置代理
```
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
```

### npm设置代理
```
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080
```

### 资料文献

- [代理服务器设置 - Shadowsocks](http://www.snowdream.tech/2016/03/31/proxy-settings-with-shadowsocks/#IDEA)
- [Mac下shadowsocks全自动地代理翻墙](http://haoweiguang.me/2017/05/08/Mac%E4%B8%8Bshadowsocks%E5%85%A8%E8%87%AA%E5%8A%A8%E5%9C%B0%E4%BB%A3%E7%90%86%E7%BF%BB%E5%A2%99/)