# NVIDIA嵌入平台Jetson TX1

> NVIDIA也借着人机大战的热潮，在首都北京宣布其嵌入式计算平台Jetson TX1正式来到国内，该平台 正是主要面向人工智能设备的开发。

近期人机大战的AlphaGO出尽风头，让大家再次意识到AI人工智能的强大，NVIDIA也借着这股热潮，在首都北京宣布其嵌入式计算平台Jetson TX1正式来到国内，该平台正是涉及到人工智能学习神经网络，面向移动设备智能化的开发。

![jpg](http://www.wokeji.com/guojipindao/guojiqianyan/201603/W020160317554616089086.jpg)

作为与移动设备渐行渐远的Tegra处理器，从上一代Tegra K1开始就推出了类似的开发板Jetson TK1，而此次推出的Jetson TX1不同之处在于，Nvidia把计算模块从I/O扩展开发平台独立了出来，所以能够把核心嵌入式组件做到一张信用卡的大小。

![jpg](http://www.wokeji.com/guojipindao/guojiqianyan/201603/W020160317554616259341.jpg)

以下是该产品的技术参数：

GPU：TeraFlop级浮点运算、256核Maxwell架构GPU；

CPU：4*A57；

视频：4K视频编解码；

相机：支持1400万像素/秒；

内存：4GB MPDDR4 RAM、25.6 Gb/s；

存储：16GB eMMC；

网络：802.11ac 2x2 Wi-Fi + 蓝牙 + 1Gbps以太网；

系统：支持Linux for Tegra；

尺寸：50 mm x 87 mm

与Jetson TK1中的Tegra K1相比，新的TX1所搭载的Tegra X1在浮点运算性能达到了1T-Flops，架构也升级为了最新的Maxwell，核心数也由上一代的192提升为了256。不过耐人寻味的是，Jetson TX1所搭载的Tegra X1并非标准版的4*A53+4*A57大小核结构，而是4*A57的结构。

![jpg](http://www.wokeji.com/guojipindao/guojiqianyan/201603/W020160317554616375493.jpg)

另一方面，整个模块的功耗被控制在了10W，虽然这对于移动设备来说仍然烫手，但对于无人机和机器人而言，这一数字已经足够低了。

Nvidia官方表示，Jetson TX1上搭载的Tegra X1具有很强的可扩展性和并行计算能力，能够在复杂的多维空间里实时处理外界信息，并通过“端到端训练部署”在使用中持续进行自学习。

![jpg](http://www.wokeji.com/guojipindao/guojiqianyan/201603/W020160317554616531989.jpg)

所谓“端到端训练部署”就是让Jetson TX1通过神经网络与云端的Digits Devbox（用于加速深度学习研究的桌面级工作平台）进行信息交换。当TX1无法作出判断时，TX1会将信息提交给Digits Devbox，Digits Devbox通过深度学习的方式做出判断后再反馈给TX1，使之“学会”如何处理。

“深度学习赋予了机器自我学习并执行更加复杂任务的能力。Jetson TX1的推出，正是为了让深度学习与机械智能化变得更加得心应手，同时也让无人驾驶、无人机技术能够更加普及。”

——Nvidia中国区总经理 张建中

在现场，Nvidia展示了基于Jetson TX1开发出的两款案例，一个是博瑞空间的无人机，另一个是米文动力的机器人，不过由于空间有限并未进行实际演示。

![jpg](http://www.wokeji.com/guojipindao/guojiqianyan/201603/W020160317554616639931.jpg)

而在谈及与友商Intel在CES上大秀Yuneec “台风 H” 无人机的避障功能时，Nvidia方面直言：

“在并行计算能力上，GPU与CPU相比有着天生的绝对优势，而且Nvidia的开发平台也更加成熟。从Jetson TX1上我们也可以看到，我们所能够支持的接口非常全面，工作环境的适应力也更强。再加上我们的Maxwell架构，可以说，目前我们的能耗比占据着绝对优势，能够领先第二名5倍之多。”

虽然该产品已于去年11月12日正式发布并在美国开放预定，但中国并未同步发售，开发者需要等到今年5月才能开始拿到该产品。根据Nvidia给出的官方售卖链接来看，单颗Jetson TX1 Module嵌入式组件的售价为2380元，搭配全套开发者组件的产品售价为4680元，这里是Nvidia给出的淘宝官方预售链接。