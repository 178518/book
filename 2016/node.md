# 前置条件

### node&npm版本要求
> node>4.0 npm>3.3

![png](../assets/node/node.png)

### java&android sdk
> java>1.7.0

### 个人配置
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home
export MAVEN_OPTS='-Xms256m -Xmx1024m'
export ANDROID_HOME=/Users/yunyi/Library/Android/sdk
export PATH=$PATH:/usr/local/mysql/bin
export PATH=$PATH:/Users/yunyi/maven-2.2.1/bin
export PATH=$PATH:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
# for color
export CLICOLOR=1
# \h:\W \u\$
export PS1='\[\033[01;33m\]\u@\h\[\033[01;31m\] \W\$\[\033[00m\] '
# grep
alias grep='grep --color=always'

source ~/.nvm/nvm.sh
```