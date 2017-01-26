# Git 使用帮助

![Git工作流程](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

下面是我整理的常用 Git 命令清单。几个专用名词的译名如下。

> Workspace：工作区

> Index / Stage：暂存区

> Repository：仓库区（或本地仓库）

> Remote：远程仓库

### 配置别名(全局)
```
用户信息
git config --global user.name "yunyi.zy"
git config --global user.email 178518@gmail.com
nano ~/.gitconfig
#别名查看
git config --list
#别名配置
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### 生成SSH密钥过程
```
1.查看是否已经有了ssh密钥
cd ~/.ssh

如果没有密钥则不会有此文件夹，有则备份删除

2.生存密钥

ssh-keygen -t rsa -C "178518@gmail.com"

ssh-keygen -t rsa -C "178518@gmail.com" -f [id_rsa_gitlab_home]

按3个回车，密码为空

3.添加到SSH agent中
ssh-agent bash
ssh-add id_rsa

4.SSH放到github上
把这个SSH放到github上。用公钥。先在GitHub上注册一个用户，然后进入account-setting ，把id_rsa.pub的内容复制进去就可以了。

5.将公钥添加到GitHub，然后用ssh访问GitHub
ssh -T git@github.com
显示了一条成功信息，并且退出
Hi 178518! You've successfully authenticated, but GitHub does not provide shell access.
```

### 新建代码库
新建一个目录，将其初始化为Git代码库

```
git init [project-name]
```

### 远程分支的创建
把本地仓库提交到远程仓库的master分支中

```
git push git@github.com:178518/lego.git master 
```

### 合作开发人员常用命令
```
#检出仓库
git clone git@github.com:178518/lego.git [仓库名]

#查看本地分支
git br 

#查看远程分支
git br -r

#删除本地分支
git br -d [branch-name]

#改动添加到暂存器
git add .

#提交改动信息
git cm -m "代码提交注释信息"

#远程分支信息查看
git fetch

#切换到指定分支，并更新工作区
git co [branch-name]

#合并主干代码
git checkout master && git pull &&git branch
git co [分支名称]
git merge origin/master

#提交本地master分支作为远程的test分支
git push origin master:test

#删除远程分支
git push origin --delete test

#推送一个空分支到远程分支，其实就相当于删除远程分支
git push origin :[branchName]
```


### 资料文献

- [gitlab/github 多账户下设置 ssh keys](https://segmentfault.com/a/1190000002994742)

- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

- [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

- [Git Book](https://git-scm.com/book/zh/v2)

- [Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375234012342f90be1fc4d81446c967bbdc19e7c03d3000)

- [Git权威指南](http://www.worldhello.net/gotgit/)