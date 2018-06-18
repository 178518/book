# 文件加载方案


所谓天下合久必分,分久必合,以前一个页面会有很多CSS/JS请求,后来提倡雅虎优化军规,尽可能减少重复发起请求,所以有了combo进行文件合并,但是这个带来的问题是不同的页面之间的公共文件无法使用浏览器缓存.

Lego提供二级缓存机制:
1.核心的类库,在打包阶段就分离出来,并使用combo进行合并,核心文件应该尽可能的少变更

```
<script src="http://www.yuuso.com/static/js/??react.min.js,react-dom.min.js,jquery-2.1.4.min.js"></script>
```

2.页面的模块使用webpack打包成一体化的文件,配合assets.map.json实现按内容hash解决缓存问题