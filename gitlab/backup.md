# gitlab 定时备份


### Gitlab 创建备份
```
sudo /opt/gitlab/bin/gitlab-rake gitlab:backup:create
```

### Gitlab 修改备份文件默认目录
```
sudo nano /etc/gitlab/gitlab.rb

gitlab_rails['backup_path'] = '/mnt/backups'

重载配置：
gitlab-ctl reconfigure
```

### Gitlab 自动备份
```
sudo nano /etc/crontab

0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create

sudo /etc/init.d/cron restart
```