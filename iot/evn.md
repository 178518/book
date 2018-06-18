# 环境配置

### macOS 缺失的软件包管理器
[macOS 缺失的软件包管理器](https://brew.sh/index_zh-cn)

通过这个安装管理mac上所有的软件

### iTerm2+oh-my-zsh配色
[iTerm2+oh-my-zsh配色](https://www.jianshu.com/p/246b844f4449)

### mac安装autojump
[mac安装autojump](https://segmentfault.com/a/1190000011277135)

### 安装nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

### 代理工具
[whistle](https://avwo.github.io/whistle/)

```
# 跨域请求
m.aliexpress.com resHeaders://{resHeaders}

resHeaders
{
  "Access-Control-Allow-Origin":"*",
}

# 网速模拟
reqBody
{
    "headers": {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"
    },
    "delay": 6000,
    "speed": 20
}

#请求响应信息
#m.aliexpress.com res://{resBody}
#m.aliexpress.com resAppend://{floor}
#resCors://* style.aliunicorn.com
#m.aliexpress.com res://{bodyTest}

# 数据Mock
# /^http[s]{0,1}:\/\/m.aliexpress.com/ajaxapi/store/ajax_store_home\.do*/ xtpl://{json.json}

# /^http[s]{0,1}:\/\/m.aliexpress.com/ajaxapi/dealsFloorAjax\.do*/ xtpl://{jsonp.json}

jons:
{}

josnp:
{callback}({})
```

### node&yarn
[Mac上安装Node和NPM](https://www.jianshu.com/p/20ea93641bda)
[新一代包管理工具yarn](http://imweb.io/topic/581f6c0bf2e7e042172d618a)

### nano .bash_profile
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home
export MAVEN_OPTS='-Xms256m -Xmx1024m'
export ANDROID_HOME=/Users/yunyi/Library/Android/sdk
export GRADLE_HOME=/Users/yunyi/gradle-2.10
export PATH=$PATH:/usr/local/mysql/bin
export PATH=$PATH:/Users/yunyi/maven-2.2.1/bin
export PATH=$PATH:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
export PATH=$PATH:${GRADLE_HOME}/bin
export PATH=$PATH:/Users/yunyi/.oh-my-zsh
export PATH=$PATH:/usr/local/Cellar/mongodb/3.4.9/bin
export DOCKER_HOST=tcp://192.168.59.103:2376
export DOCKER_CERT_PATH=/Users/yunyi/.boot2docker/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1
export ENABLE_NODE_LOG=YES
export NODE_LOG_DIR=/tmp/

# for color
#export CLICOLOR=1
# \h:\W \u\$
#export PS1='\[\033[01;33m\]\u@\h\[\033[01;31m\] \W\$\[\033[00m\] '
# grep
#alias grep='grep --color=always'
#alias ll='ls -l'

# Git branch in prompt
#parse_git_branch() {
    #git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
#}

#export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "

#source ~/.nvm/nvm.sh
```

### nano .gitconfig
```
[filter "lfs"]
        clean = git-lfs clean %f
        smudge = git-lfs smudge %f
        required = true
[user]
        name = yunyi.zy
        email = yunyi.zy@alibaba-inc.com
[push]
        default = simple
[alias]
        st = status
        co = checkout
        ci = commit
        br = branch
        last = log -1
        lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
[core]
        whitespace = trailing-space,space-before-tab,-indent-with-non-tab
        excludesfile = /Users/yunyi/.gitignore_global
[difftool "sourcetree"]
        cmd = opendiff \"$LOCAL\" \"$REMOTE\"
        path =
[mergetool "sourcetree"]
        cmd = /Users/yunyi/Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
        trustExitCode = true
```

### nano .bashrc
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

export TNVM_DIR="/Users/yunyi/.tnvm"
[ -s "$TNVM_DIR/tnvm.sh" ] && . "$TNVM_DIR/tnvm.sh"  # This loads nvm
```

### nano .zshrc
```
source ~/.nvm/nvm.sh
source ~/.bash_profile
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
```