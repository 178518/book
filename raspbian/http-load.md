# http-load安装

http_load以并行复用的方式运行，用以测试web服务器的吞吐量与负载。但是它不同于大多数压力测试工具，
它可以以一个单一的进程运行，一般不会把客户机搞死。还可以测试HTTPS类的网站请求。
下载：http://acme.com/software/http_load/
安装：
解压后只要 make , make install 就行了

环境： 需要gcc  如果是在服务器上安装的话还需要有sudo

执行命令：
./http_load
参数说明：
-parallel 简写-p ：含义是并发的用户进程数。
-fetches 简写-f ：含义是总计的访问次数
-rate    简写-r ：含义是每秒的访问频率
-seconds简写-s ：含义是总计的访问时间

准备URL文件：url.txt，文件格式是每行一个URL，URL最好超过50－100个测试效果比较好.文件格式

执行及结果说明：
./http_load -rate 5 -seconds 10 urls说明执行了一个持续时间10秒的测试，每秒的频率为5。

![http-load](../assets/http-load/http-load.png)

结果分析：
1．49 fetches, 1 max parallel, 2.04472e+06 bytes, in 10.0005 seconds 说明在上面的测试中运行了49个请求，最大的并发进程数是2.389，总计传输的数据是204463bytes，运行的时间是10.0148秒
2．41729 mean bytes/connection   说明每一连接平均传输的数据量41729/49=581.6
3．4.89977 fetches/sec, 204463 bytes/sec
说明每秒的响应请求为4.89977，每秒传递的数据为204463 bytes/sec
4．msecs/connect: 1.70367 mean, 2.389 max, 1.322 min  说明每连接的平均响应时间是1.70367 msecs
，最大的响应时间2.389 msecs，最小的响应时间1.322 msecs
5．msecs/first-response: 65.0539 mean, 108.677 max, 56.335 min
6、HTTP response codes: code 200 — 49     说明打开响应页面的类型，如果403的类型过多，那可能
要注意是否系统遇到了瓶颈。
特殊说明：
测试结果中主要的指标是 fetches/sec、msecs/connect 这个选项，即服务器每秒能够响应的查询次数，

用这个指标来衡量性能。似乎比 apache的ab准确率要高一些，也更有说服力一些。
Qpt-每秒响应用户数和response time，每连接响应用户时间。
测试的结果主要也是看这两个值。当然仅有这两个指标并不能完成对性能的分析，

我们还需要对服务器的cpu、men进行分析，才能得出结论
