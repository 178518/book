# gpio 库

### 安装编译GPIO库

git clone git://github.com/quick2wire/quick2wire-gpio-admin.git

cd quick2wire-gpio-admin

sudo make

sudo make install

```
var http = require('http')
var gpio = require('pi-gpio')
var fs = require('fs')
var errHandler = function (err){
    console.log(err);
}
gpio.open(8, "output", function (err) {
    if(err){
        console.log('已经打开');
    }
})
http.createServer(function (req, res){
    if(req.url == '/led/open') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        gpio.write(8, 1, errHandler);
        res.end('open')
        return;
    }
    if(req.url == '/led/close'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        gpio.write(8, 0, errHandler);
        res.end('close');
        return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('index.html'));
}).listen(1984);
console.log('server runn at 1984');
```