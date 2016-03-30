# GPIO环境配置

1.python 编译环境安装

sudo apt-get install python-dev

2.GPIO库安装

Python2安装GPIO库需要输入命令：
sudo apt-get install python-rpi.gpio

Python3安装GPIO库需要输入命令：
sudo apt-get install python3-rpi.gpio

sudo wget -c http://ufpr.dl.sourceforge.net/project/raspberry-gpio-python/RPi.GPIO-0.6.2.tar.gz

sudo tar xvzf RPi.GPIO-0.6.2.tar.gz

 进入解压之后的目录 
 
cd RPi.GPIO-0.6.2 

 启动安装 
sudo python setup.py install

3.控制LED灯
#!/usr/bin/env python
# encoding: utf-8

import RPi.GPIO as GPIO
import time

# 指定GPIO口的选定模式为GPIO引脚编号模式（而非主板编号模式）
GPIO.setmode(GPIO.BCM)

# 指定GPIO14（就是LED长针连接的GPIO针脚）的模式为输出模式
# 如果上面GPIO口的选定模式指定为主板模式的话，这里就应该指定8号而不是14号。
GPIO.setup(14, GPIO.OUT)

# 让GPIO14输出低电平（风扇启动）    
#while True:
GPIO.output(14, True)
time.sleep(5)
GPIO.output(14, False)
time.sleep(5)

# 最后清理GPIO口（不做也可以，建议每次程序结束时清理一下，好习惯）
GPIO.cleanup()


#!/usr/bin/env python
# encoding: utf-8

import RPi.GPIO
import time

# 指定GPIO口的选定模式为GPIO引脚编号模式（而非主板编号模式）
RPi.GPIO.setmode(RPi.GPIO.BCM)

# 指定GPIO14（就是LED长针连接的GPIO针脚）的模式为输出模式
# 如果上面GPIO口的选定模式指定为主板模式的话，这里就应该指定8号而不是14号。
RPi.GPIO.setup(14, RPi.GPIO.OUT)

# 循环10次
for i in range(0, 10):
	# 让GPIO14输出高电平（LED灯亮）
	RPi.GPIO.output(14, True)
	# 持续一段时间
	time.sleep(0.5)
	# 让GPIO14输出低电平（LED灯灭）
	RPi.GPIO.output(14, False)
	# 持续一段时间
	time.sleep(0.5)

# 最后清理GPIO口（不做也可以，建议每次程序结束时清理一下，好习惯）
RPi.GPIO.cleanup()