# IOT

## MongoDB 配置&开启认证

### 配置文件

```
nano /usr/local/etc/mongod.conf

systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /data/db
  auth=true
net:
  bindIp: 127.0.0.1
```

### 配置数据库

```
1、登录数据库e
mongo
2、使用超表管理数据库
use admin
3、创建admin账户
db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
4、开启认证，并重启MongoDB
sudo mongod --auth
5、创建对应文档的账户
db.auth('username','password')
// 输出 1 表示验证成功
show dbs
use db
db.createUser({user:"username",pwd:"password",roles:["root"]})
选择对应的表，创建表用户，并赋予权限，db.createUser({user:"username",pwd:"password",roles:[{role: "readWrite", db: "mqtt" }]})
6、内建角色
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
```

## 安装MQTT

### 安装与使用
```
npm install mqtt -g
```

### 在浏览器中使用
node >=v8.9.1，建议卸载cnpm避免各种奇怪的问题。

```
npm install mqtt -g
```

#### Browserify导出
Browserify模块可以将MQTT.js绑定为浏览器可用的，也可以导出为一个单独的浏览器端模块。其导出的模块兼容AMD或CMD标准，且会在添加对象到全局空间。

```
npm install -g browserify // 安装 browserify 
cd node_modules/mqtt
npm install . // 安装 dev dependencies 
browserify mqtt.js -s mqtt > browserMqtt.js // 需要在客户端使用的mqtt
```

#### Webpack导出
与Browserify类似，该模块也会导出一个浏览器端使用的类库，且会在添加对象到全局空间，导出后可以像var mqtt = xxx这样使用MQTT.js。导出时可以设置AMD、CMD或其它导出格式。
```
npm install -g webpack // install webpack 
 
cd node_modules/mqtt
npm install . // install dev dependencies 
webpack mqtt.js ./browserMqtt.js --output-library mqtt
```

#### 做为命令行工具使用
```
### 匿名
mqtt pub -t 'gpsStatus' -h '127.0.0.1' -p '1883' -m 'from Command'

### 认证
mqtt pub -u 'yzhao' -P 'yzhao' -t 'mqttTest' -h '127.0.0.1' -p '1883' -m 'from Command'

### 关闭匿名
mqtt.allow_anonymous = false
```

### node server&client使用
#### MCU设备
```
温度传感器检测
void dh11() {
  // 温度传感器检测
  byte temperature = 0;
  byte humidity = 0;
  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(pinDHT11, &temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    String log = F("Read DHT11 failed, err=");
    log += err;
    addLog(log);

    return;
  }

  String str = F("温度：");
  str += temperature;
  str += F(" 湿度：");
  str += humidity;
  str += F("%");

  addLog(str);

  /**
    开一个字符串空间，把字符拷贝进空间,字符串有结束符，要+1
  */
  int strlength = str.length();
  char tempStr[strlength + 1];

  str.toCharArray(tempStr, strlength + 1);

  client.publish(dh_topic, tempStr);
}

红外传感器
void hcsr() {
  String hasBody = "0";
  if (digitalRead(pinHcsr) == HIGH) {
    Serial.println("Someone here!");
    hasBody = "1";
  }

  int strlength = hasBody.length();
  char tempStr[strlength + 1];

  hasBody.toCharArray(tempStr, strlength + 1);

  client.publish(hcsr_topic, tempStr);
}

gps信息获取

  // 必须放在GPS之前，暂时不清楚原因, 每隔30秒发一次信号
  long now = millis();
  if (now - lastGet > 30 * 1000) {
    lastGet = now;
    dh11();
  }

  String log;
  bool gpsFound = false;
  bool gpsRead = false;
  gps_fix fix;

  unsigned long searchGPSTime = millis();

  while (millis() - searchGPSTime < 2000 && !gpsRead) {
    //如果硬件串口有数据
    if (gps.available(gpsSerial)) {
      log = F("Read GPS");
      //addLog(log);
      //从硬件串口读出一字节
      fix = gps.read();

      //GPS 授时
      if (fix.valid.time) {
        log = F("GPS: Time ");
        log += fix.dateTime.hours;
        log += F(":");
        log += fix.dateTime.minutes;
        log += F(":");
        log += fix.dateTime.seconds;
        addLog(log);
      }

      //GPS 经纬度
      if (fix.valid.location) {
        log = F("GPS: Location ");
        log += fix.latitudeL();
        log += F(",");
        log += fix.longitudeL();
        addLog(log);
        gpsFound = true;
        break;
      }

      gpsRead = true;
    }

    delay(10);
  }

  // sleep after 10s or found gps location
  if (gpsFound) {
    sendLocation(fix);
    log = F("Send Location");
    addLog(log);
  }

  delay(10 * 1000);
```

#### mosca MQTT服务node服务端
```
var mosca = require('mosca');

var settings = {
    //mqtt 端口
    port: 1883,
    backend:{
        type: 'mongo', //指定类型，mongo的写法请参考官方wiki
        url: 'mongodb://username:passwd@127.0.0.1:27017/mqtt',//数据库名称,类似关系数据库中的dbName
        pubsubCollection: 'ascoltatori',//表名称,类似关系数据库中的表
        mongo: {}
    },
    persistence:{
        factory: mosca.persistence.Mongo,
        url: "mongodb://username:passwd@127.0.0.1:27017/mosca"
    },
    //ws 端口
    http: {
        port: 8083,
        bundle: true,
        static: './'
    }
};

/**
 * 如果需要用户登录验证权限，需要改写此方法
 * 这里以简单判断了用户名和密码为例，真实环境可以连接实际业务系统的鉴权服务
 * @param client
 * @param username
 * @param password
 * @param callback
 */
var authenticate = function (client, username, password, callback) {
    var authorized = (username === 'yzhao' && password.toString() === 'yzhao');
    if (authorized) client.user = username;
    callback(null, authorized);
};

var server = new mosca.Server(settings);

server.on('ready', function () {
    server.authenticate = authenticate;
    console.log('mosca server running');
}).on('clientConnected', function (client) {
    console.log('client(' + client.id + ') connected');
}).on('published', function (packet, client) {
    console.log('client(' + (client ? client.id : 'internal') + ') published topic(' + packet.topic + '): ' + packet.payload);
}).on('subscribed', function (topic, client) {
    console.log('client(' + client.id + ') subscribed topic(' + topic + ')');
}).on('unsubscribed', function (topic, client) {
    console.log('client(' + client.id + ') unsubscribed topic(' + topic + ')');
}).on('clientDisconnecting', function (client) {
    console.log('client(' + client.id + ') disconnecting');
}).on('clientDisconnected', function (client) {
    console.log('client(' + client.id + ') disconnected');
});
```

#### 客户端
```
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883', {
    username: 'username',
    password: 'password'
});

/**
 * 链接MQTT服务
 */
client.on('connect', function () {
    client.subscribe('gpsStatus');
    //client.publish('hello', 'Hello mqtt');
});

/**
 * 收到消息出来方式
 */
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});
```

文献资料
- [Node.js实现的MQTT客户端模块mqtt.js](https://itbilu.com/nodejs/npm/41wDnJoDg.html)