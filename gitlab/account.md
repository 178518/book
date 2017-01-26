# github gitlab 多账户管理

具体操作是利用ssh在本地生成一对公私秘钥（keys），然后将公钥添加到注册的gitlab/github账户配置ssh key的地方即可。默认情况下本地生成的秘钥位于/Users/mac用户名/.ssh/（mac平台，本文针对os x系统介绍）。

## 生成github秘钥、gitlab秘钥

命令：ssh-keygen -t rsa -C "178518@gmail.com"

现在：ssh-keygen -t rsa -C "178518@gmail.com" -f id_rsa_gitlab_home，相当于起一个别名

## 添加私钥

ssh-add id_rsa_gitlab_home

## 修改config文件

```
#github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
User 178518@gmail.com

#gitlab
Host 52pi.cc
HostName 52pi.cc
port [端口] //gitlab 服务器端口设定，非默认22端口需要指定
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab_home
User yzhao
```

## 在github和gitlab上添加公钥即可

## 测试
ssh -T git@52pi.cc

显示了一条成功信息，并且退出

Welcome to GitLab, yzhao!