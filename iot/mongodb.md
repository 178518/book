# mongodb

## 安装

### 加载公钥用于软件包管理系统
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

### 为 MongoDB 创建 /etc/apt/sources.list.d/mongodb-org-3.4.list 文件.
```
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

### 重载本地软件包数据库
```
sudo apt-get update
```

### 安装 MongoDB 软件包

安装指定版本, 你必须单独为每个组件包指定版本号, 就像下面这样：
```
sudo apt-get install -y mongodb-org=3.4.9 mongodb-org-server=3.4.9 mongodb-org-shell=3.4.9 mongodb-org-mongos=3.4.9 mongodb-org-tools=3.4.9
```

### 固定 MongoDB 的版本
虽然你可以指定任何可用的 MongoDB 版本, 当一个更新的软件可用的时候, apt-get 将会更新软件包. 为了防止意外升级, 固定 MongoDB 仅限当前安装的版本, 我们可以执行以下命令:

```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

### 配置
sudo nano etc/mongod.conf

### 启动
```
mongod --auth -f /etc/mongod.conf
```

### 停止
```
ps -axu |grep mongo
kill -2 pid
```

### shell
```
1、登录数据库
mongo
2、使用超表管理数据库
use admin
3、认证
db.auth('username','password')
4、创建admin账户(admin只有用户管理的权限)，这里相当于创建数据库的超级管理员，用于管理用户
db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
5、显示库
show dbs
6、创建用户，用户都跟着库走，这里相当具体数据库的操作权限，终端里面登录使用的就是这个
use mqtt
db.createUser({user:"username",pwd:"password",roles:[{role: "dbAdmin", db: "mqtt" },{ role: "readWrite", db: "mqtt" },{ role: "read", db: "mqtt"}]})
6、全部创建完成之后重启mongodb
7、查看用户
show users
8、删除用户
use db
db.dropUser('test')
```

### 资料文献

- [MongoDB初体验-配置文件](https://www.jianshu.com/p/f179ce608391)
- [mongod.conf重要配置](https://www.jianshu.com/p/f9f1454f251f)
- [mongoDB 3.0 安全权限访问控制](http://ibruce.info/2015/03/03/mongodb3-auth)
- [MongoDB的用户创建更新及删除](https://www.jianshu.com/p/f5afc6488f9e)
