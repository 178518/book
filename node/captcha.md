## 1、引言
> [验证码](https://x.tongdun.cn/product/captcha)（CAPTCHA）是“Completely Automated Public Turing test to tell Computers and Humans 
Apart”（全自动区分计算机和人类的图灵测试）的缩写，是一种区分用户是计算机还是人的公共全自动程序。可以防止：恶意破解密码、刷票、论坛灌水，有效防止某个黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试，实际上用验证码是现在很多网站通行的方式，我们利用比较简易的方式实现了这个功能。这个问题可以由计算机生成并评判，但是必须只有人类才能解答。由于计算机无法解答CAPTCHA的问题，所以回答出问题的用户就可以被认为是人类。


## 涉及技术找

- OpenCV
- node
- tesseract
- python
- node-tesseract & gm & node-cmd 库使用

## 2、工作原理
常见的图形验证码是与web中的会话相关联的，在一个会话开始时，在需要使用验证码的地方会生成一个与当前会话相关的验证码，用户识别出验证码后通过填写表单将数据提交给服务器，服务器端会验证此次会话中的验证码是否正确。具体来说，其工作流程如图1所示：

![](http://blog.nsfocus.net/wp-content/uploads/2016/12/%E5%9B%BE1-%E9%AA%8C%E8%AF%81%E7%A0%81%E6%8A%80%E6%9C%AF%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86.jpg)

## 3、验证码的划代标准

### 第一代：标准验证码

已[图形验证码](https://x.tongdun.cn/product/captcha)为代表，基于机器难以处理复杂的计算机视觉及语音识别问题，而人类却可以轻松的识别来区分人类及机器。这一代验证码初步利用了人类知识容易解答，而计算机难以解答的机制进行人机判断。

### 第二代：创新验证码

第二代[验证码](https://x.tongdun.cn/product/captcha)是基于第一代验证码的核心思想（通过人类知识可以解答，而计算机难以解答的问题进行人机判断）而产生的创新的交互优化型验证码。第二代验证码基于第一代验证码的核心原理－－“人机之间知识的差异”，拓展出大量创新型验证码。

### 第三代：无感知验证码

第三代[验证码](https://x.tongdun.cn/product/captcha)最大的特点是不再基于知识进行人机判断，而是基于人类固有的生物特征以及操作的环境信息综合决策，来判断是人类还是机器。无知识型验证码最大特点即无需人类思考，从而不会打断用户操作，进而提供更好的用户体验。

### 4、第一代验证码攻防

[图像二值化](https://baike.baidu.com/item/%E5%9B%BE%E5%83%8F%E4%BA%8C%E5%80%BC%E5%8C%96)（ Image Binarization）就是将图像上的像素点的灰度值设置为0或255，也就是将整个图像呈现出明显的黑白效果的过程。

在数字图像处理中，二值图像占有非常重要的地位，图像的二值化使图像中数据量大为减少，从而能凸显出目标的轮廓。

[OpenCV二值化](http://monkeycoding.com/?p=593)

![](/assets/ocr.png)

#### 4.1、使用gm去噪处理

主要是去掉图像里的所有干扰信息，比如背景的点，线等。
```
/**
 * 对图片进行阈值处理(默认55%)
 * thresholdValue，降噪值
 */
async function disposeImg(imgPath, newPath, thresholdValue) {
	return new Promise((resolve, reject) => {
		gm(imgPath).threshold(thresholdValue || '55%').write(newPath, (err) => {
			if (err) return reject(err);
			resolve(newPath);
		});
	});
}
```

#### 4.2、使用tesseract进行OCR识别

![](https://tonydeng.github.io/images/blog/tesseract-to-pages.png)

##### Tesseract介绍

Tesseract(/‘tesərækt/) 这个词的意思是”超立方体”，指的是几何学里的四维标准方体，又称”正八胞体”，是一款被广泛使用的开源 OCR 工具。

![](http://linusp.github.io/assets/img/tesseract.gif)

Tesseract 已经有 30 年历史，开始它是惠普实验室于1985年开始研发的一款专利软件，到1995年一件成为OCR业界内最准确的识别引擎之一。然而，HP不久便决定放弃OCR业务Tesseract从此尘封。数年之后，HP意识到与其将Tesseract束之高阁，还不如贡献给开源，让其重焕新生。在 2005 年，Tesseract由美国内华达州信息技术研究所获得，并求助于Google对Tesseract进行改进、消除Bug、优化工作，并开源，其后一直由 Google 赞助进行后续的开发和维护。因为其免费与较好的效果，许多的个人开发者以及一些较小的团队在使用着 Tesseract ，诸如验证码识别、车牌号识别等应用中，不难见到 Tesseract 的身影。

现在Tesseract托管在Github上，大家有兴趣可以上Github上Star或Frok[该项目](https://github.com/tesseract-ocr/tesseract)。

所谓 OCR(Optical Character Recognition)是指对文本资料进行扫描，然后对图像文件进行分析处理，获取文字和版面信息的过程。OCR是图像识别领域中的一个子领域，该领域专注于对图片中的文字信息进行识别并转换成能被常规文本编辑器编辑的文本。


使用Tesseract对降噪后的图片进行OCR识别，Tesseract支持107种语言，可以通过node-tesseract代理调用，也可以直接通过node-cmd执行Tesseract命令进行调用。
node作为中间层，可以直接调用封装好的node包，或者直接执行底层命令，或者调用Python脚本都可以。

通过node-tesseract进行OCR识别

```
async function recognizeImg(imgPath, options) {
	//tesseract --list-langs，语言选项
	options = Object.assign({
		psm: 7, //-psm 7 表示告诉tesseract code.jpg图片是一行文本,这个参数可以减少识别错误率，默认为3
	}, options);

	//console.log(options);

	return new Promise((resolve, reject) => {
		tesseract.process(imgPath, options, (err, text) => {
			if (err) return reject(err);
			resolve(text.replace(/[\r\n\s]/gm, '')); // 去掉识别结果中的换行回车空格
		});
	});
}

```

tesseract进行OCR识别

```
async function execute(imgPath) {
	return new Promise((resolve, reject) => {
		NodeCmd.get(`tesseract ${imgPath} stdout -l chi_sim`,
			function (err, data) {
				if (!err) {
					resolve(data);
				} else {
					reject(err);
				}
			},
		);
	});
}
```

#### 4.3、人工分布式识别

机器自动识别图片验证码，对简单的情况能有较高的准确率，但对干扰多，变形复杂的图片验证码，其准确率会很差。由于图片验证码重要度增加，复杂的图片验证码被大量使用，导致近年来出现了利用众包力量实现的人工验证码识别平台。
其工作原理图下所示：

![](http://blog.nsfocus.net/wp-content/uploads/2016/12/%E5%9B%BE3-%E4%BA%BA%E5%B7%A5%E5%88%86%E5%B8%83%E5%BC%8F%E8%AF%86%E5%88%AB.jpg)

>小结：至此，第一代验证码基本沦陷，攻守双方本质上就是一个相互转化的过程。

### 5、第二代验证码攻防

第二代验证码在人机交互方面有很强的改进，总体来说人很容易识别，但是机器相对来说很难识别。但是随着puppeteer的出现，这种攻防又发生的微妙的变化。

通过puppetter的page.screenshot进行指定区域截屏，如果页面上未引入jQuery通过page.addScriptTag引入，后面截屏处理需要使用到。利用resemblejs/compareImages进行图片比对取得滑动距离的图片，通过canvas将图片读入内存，取得最终滑动距离，调用puppetter加入人的行为模拟，并最终验证通过。

![](/assets/puppeteer.png)

[Puppeteer-无头浏览器简介](https://zhuanlan.zhihu.com/p/40103840)

本列已腾讯的滑动验证码为列，[豆瓣重置密码](https://accounts.douban.com/resetpassword)

#### 5.1、Puppeteer过人机检测信息
```
await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'webdriver', {
			get: () => false,
		});

		Object.defineProperty(navigator, 'plugins', {
			get: () => [1, 2, 3, 4, 5],
		});

		const originalQuery = window.navigator.permissions.query;
		return window.navigator.permissions.query = (parameters) => (
			parameters.name === 'notifications' ?
				Promise.resolve({state: Notification.permission}) :
				originalQuery(parameters)
		);
	});
```

#### 5.2、截屏处理
```
	// 截屏
	await screenshot(captionPosition, './screenshots/douban3.png');
	await cropImage('./screenshots/douban3.png', './screenshots/douban4.png');
```

#### 5.3、最终效果
<div>
<video src="/assets/20190109_152719.mp4" width="800" height="600" controls="controls"/>
</div>


>小结：至此，第二代滑动验证码基本沦陷，Puppeteer让人和机器的界限越来越模糊，他的一切行为看起来就像一个真实的人，但是后面全部是自动化执行，本质上Google退出这个是为了实现自动化测试，对抗继续升级。

#### 6、第三代验证码攻防

第三代验证码加入语序和空间推理，传统的图片二值法或者像素比对都失效了，这里讲引入[OpenCV](https://baike.baidu.com/item/OpenCV)和[Tensorflow](https://www.tensorflow.org/?hl=zh-cn)两个工具，主要用于图片识别和深度学习。

![](/assets/yx.png)

![](/assets/kj.png)

Google提供的[inception5h](https://storage.googleapis.com/download.tensorflow.org/models/inception5h.zip)模型介绍

#### 6.1、Inception V1
GoogLeNet首次出现在2014年ILSVRC 比赛中获得冠军。这次的版本通常称其为Inception V1。Inception V1有22层深，参数量为5M。同一时期的VGGNet性能和Inception V1差不多，但是参数量也是远大于Inception V1。

![](/assets/v1.png)

Inception Module是GoogLeNet的核心组成单元，Inception Module基本组成结构有四个成分。1 * 1卷积，3 * 3卷积，5 * 5卷积，3 * 3最大池化。最后对四个成分运算结果进行通道上组合。这就是Inception Module的核心思想。通过多个卷积核提取图像不同尺度的信息，最后进行融合，可以得到图像更好的表征。结构如下图：

![](/assets/v1_1.png)

#### 6.2、Inception V5图片打标分类&人脸识别
最新的Inception V5训练好的模型大概可与识别1000种类别的图片，通过opencv4nodejs可以调用训练好的模型进行图片分类打标，人脸检测等各种图片识别功能。

<div>
<video src="/assets/20190109_191347.mp4" width="800" height="600" controls="controls"/>
</div>

##### 基于opencv4nodejs完成图片打标和人脸识别

```
const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const imageMagick = gm.subClass({imageMagick: true});

const DIRECTION = {
	NorthWest: 'NorthWest',
	North: 'North',
	NorthEast: 'NorthEast',
	West: 'West',
	Center: 'Center',
	East: 'East',
	SouthWest: 'SouthWest',
	South: 'South',
	SouthEast: 'SouthEast',
};

if (!cv.xmodules.dnn) {
	throw new Error('exiting: opencv4nodejs compiled without dnn module');
}

// 载入模型
const inceptionModelPath = './models/tf-inception';
const modelFile = path.resolve(inceptionModelPath, 'tensorflow_inception_graph.pb');
const classNamesFile = path.resolve(inceptionModelPath, 'imagenet_comp_graph_label_strings_cn.txt');

/*const inceptionModelPath = './models/flower';
const modelFile = path.resolve(inceptionModelPath, 'retrained_graph.pb');
const classNamesFile = path.resolve(inceptionModelPath, 'retrained_labels.txt');*/

if (!fs.existsSync(modelFile) || !fs.existsSync(classNamesFile)) {
	console.log('exiting: could not find inception model');
	console.log('download the model from: https://storage.googleapis.com/download.tensorflow.org/models/inception5h.zip');
	return;
}
console.log('load models:' + inceptionModelPath);

// 模型和分类标签
const classNames = fs.readFileSync(classNamesFile).toString().split('\n');
//const net = cv.readNetFromTensorflow(modelFile);
const net = cv.readNetFromTensorflow(modelFile);

const classifyImg = (img) => {
	// inception model works with 224 x 224 images, so we resize
	// our input images and pad the image with white pixels to
	// make the images have the same width and height
	const maxImgDim = 224;
	const white = new cv.Vec(255, 255, 255);
	const imgResized = img.resizeToMax(maxImgDim).padToSquare(white);
	// network accepts blobs as input
	const inputBlob = cv.blobFromImage(imgResized);
	net.setInput(inputBlob);
	// forward pass input through entire network, will return
	// classification result as 1xN Mat with confidences of each class
	const outputBlob = net.forward();
	// find all labels with a minimum confidence
	const minConfidence = 0.05;
	const locations = outputBlob.threshold(minConfidence, 1, cv.THRESH_BINARY).convertTo(cv.CV_8U).findNonZero();
	const result =
		locations.map(pt => ({
				confidence: parseInt(outputBlob.at(0, pt.x) * 100) / 100,
				className: classNames[pt.x],
			}))
			// sort result by confidence
			.sort((r0, r1) => r1.confidence - r0.confidence).map(res => {
			return `标签:${res.className}、概率:${res.confidence}、百分比:${res.confidence * 100}%`;
		});
	return result;
};

const testData = [];

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
	//根据文件路径读取文件，返回文件列表
	const tempFileDir = fs.readdirSync(filePath);

	tempFileDir.forEach(function (filename) {
		//获取当前文件的绝对路径
		const filedir = path.join(filePath, filename);
		//根据文件路径获取文件信息，返回一个fs.Stats对象
		let tempFile = fs.statSync(filedir);
		if (tempFile.isFile()) {
			let tempObj = {};
			tempObj['image'] = filedir;
			tempObj['label'] = filename;
			testData.push(tempObj);
		}
		if (tempFile.isDirectory()) {
			fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
		}
	});
}

fileDisplay(path.resolve('./data'));

testData.forEach((data) => {
	const img = cv.imread(data.image);
	//console.log('%s,%s: ', data.image, data.label);
	//console.log('%s: ', data.image);

	const predictions = classifyImg(img);
	let tempText = '';
	predictions.forEach(p => {
		//console.log(JSON.stringify(p));
		tempText += p + '\n';
	});
	console.log(tempText);

	imageMagick(data.image).gravity(DIRECTION['NorthWest'])  //水印的位置
		.geometry('+10+10') //距离右下角右边10px下边10px
		//.fontSize(24)
		.fill('red')
		.pointSize(18)
		//.font('/Library/Fonts/Songti.ttc')
		.font('./font/msyh.ttf')//字体必须正确，否则乱码或者不显示中文
		.stroke('red')//文字颜色
		.drawText(15, 10, tempText) //15和10是位置信息   最后一个参数是文字信息
		.write(data.image.replace('/data/', '/process/'), function (err) {
			if (err) {
				return console.error('err--------', err);
			}
			console.log('%s:', data.image, tempText, '打标处理完成!');
		});
	//cv.imshowWait('img', img);
	console.log('---------finish---------');
});
```

#### 6.3、通过迁移训练来定制 TensorFlow 模型
基于Google Inception-V3 模型，在Windows平台通过TensorFlow 利用GTX1080进行并行图学习，得到自己想要的模型结果。

![](/assets/mxxl.png)

python训练脚本

```
python retrain.py --bottleneck_dir=C:\Users\yzhao\PycharmProjects\flower_photos\bottlenecks --how_many_training_steps=500 --model_dir=C:\Users\yzhao\PycharmProjects\flower_photos\inception --summaries_dir=C:\Users\yzhao\PycharmProjects\flower_photos\training_summaries\basic --output_graph=C:\Users\yzhao\PycharmProjects\flower_photos\retrained_graph.pb --output_labels=C:\Users\yzhao\PycharmProjects\flower_photos\retrained_labels.txt --image_dir=C:\Users\yzhao\PycharmProjects\flower_photos
```

```
const Promise = require('bluebird');
const childProcess = require('child_process');

(async () => new Promise(((resolve, reject) => {
	/**
	 * child.stdin 获取标准输入
	 * child.stdout 获取标准输出
	 * child.stderr 获取标准错误输出
	 */
	childProcess.exec('python3 /Users/yun.zhao/Downloads/python/label_image.py --image /Users/yun.zhao/Downloads/python/232831_44935.jpg --graph /Users/yun.zhao/Downloads/python/retrained_graph.pb --labels /Users/yun.zhao/Downloads/python/retrained_labels.txt', (error, stdout, stderr) => {
		// console.log('error', JSON.stringify(error));
		// console.log('stdout', stdout);
		// console.log('stderr', JSON.stringify(stderr));

		if (stdout.length > 0) {
			console.log(stdout);
			resolve(stdout);
		}
		if (error) {
			console.info(stderr);
			reject(error);
		}
	});
})))();
```

<div>
<video src="/assets/20190109_200421.mp4" width="800" height="600" controls="controls"/>
</div>

模型训练在GTX1080底下，500张图片样本，学习一次5分钟左右，TensorFlow 必须安装GPU版本

>小结：至此，三代验证码理论上都是可以攻破的，第一代，第二代会逐步退出市场。第三代的攻守转换将是一个长期持续的过程。

## 参考资料
[验证码的前世今生（今生篇）](https://www.freebuf.com/articles/web/102276.html)

[浅谈Web安全验证码](http://blog.nsfocus.net/discussion-web-security-authentication-code/)

[Puppeteer-无头浏览器简介](https://zhuanlan.zhihu.com/p/40103840)

[node识别验证码](https://segmentfault.com/a/1190000015134802)

[固定閾值(threshold)](http://monkeycoding.com/?p=593)

[利用Tesseract图片文字识别初探](https://tonydeng.github.io/2016/07/28/on-the-use-of-tesseract-picture-text-recognition/)

[tesseract如何限定识别的文字](https://my.oschina.net/u/2396236/blog/1621590)

[【模型解读】Inception结构，你看懂了吗](https://zhuanlan.zhihu.com/p/41691301)

[通过迁移训练来定制 TensorFlow 模型](https://www.jianshu.com/p/40ad065c8cc7)