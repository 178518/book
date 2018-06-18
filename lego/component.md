# 组件开发规范

组件使用首字母大写

> React用首字母大小写来区分HTML标签和React组件，HTML标签用小写字母，组件用大写字母。

```
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />
React.render(myElement, document.getElementById('root'))
```
