# Java 环境安装

### jdk安装

sudo apt-get install default-jdk

sudo apt-get install oracle-java8-jdk

sudo nano ~/.profile

#set java environment
export JAVA_HOME=/usr/lib/jvm/default-java

export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tool$

PATH=$PATH:/usr/local/sbin:/usr/sbin:/sbin:/opt/node-v4.3.0-linux-armv6l/bin:$JAVA_HOME/bin

让配置生效

source ~/.profile

看看版本号

java -version

### Tomcat 安装

sudo apt-get install tomcat7

We only need to set JAVA_HOME properly in /etc/default/tomcat7

sudo nano /etc/default/tomcat7，我这里在环境变量里面统一配置了，不需要再设置

Tomcat启动命令:
sudo service tomcat7 start
sudo service tomcat7 stop
sudo service tomcat7 restart

查看端口占用情况netstat -tlnp,注意防火墙里面要开启8080的访问

查看tomcat7安装位置

whereis tomcat7

tomcat7: /etc/tomcat7 /usr/share/tomcat7

/var/lib/tomcat7

/var/lib/tomcat7/webapps/ROOT