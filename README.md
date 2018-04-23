# React实战 - weather_app

## 目录
  1. [介绍](#介绍)
  2. [React新的前端思维方式](#react新的前端思维方式)

## 介绍
在读完程墨老师的[《深入浅出React和Redux》](https://book.douban.com/subject/27033213/)后，打算结合自己的理解，以构建一个显示天气的应用为例，争取涵盖书中所介绍的所有知识点。  

## React新的前端思维方式
### 1.1 create-react-app
这一章首先介绍了工具__create-react-app__, 通过该工具我们能快速创建一个react应用框架。  
首先是安装：  
```bash
npm install --global create-react-app  
```
安装完成后执行：  
```bash
create-react-app weather_app  
```
至此便在当前目录下创建了一个react应用。进入weather_app，执行```npm start```即可启动应用(我这里装的版本是v1.3.0)

先来看一下应用的目录结构：  
````
|
|--node_modules/
|   |--...
|
|--public/
|   |--...
|
|--src/
|   |--...
|
|--package.json
|
|...
````
其中 __node_modules__ 为依赖， __public__ 是一些静态资源。
在 __src__ 的 __index.js__ 中有：
```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```
也就是说，程序启动后，将 __public/index.html__ 中id为root的节点渲染为 __src/App.js__ 中定义的组件App。  
那么，通过修改或替换App.js，就可以运行我们自己定义的组件了

### 1.2 JSX
JSX是JS的扩展，可以在JS中编写HTML。在我们的程序中增加一个Weather_App的应用组件并将其显示在主页面中：
```jsx
//Weather_App.js
import React, { Component } from 'react';

class Weather_App extends Component {
  render() {
    return (
      <div className="weather-app">
        <div>Hello world</div> 
      </div>
    );
  }
}

export default Weather_App;

```
修改index.js，在主页面中引入：
```jsx
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Weather_App from './Weather_App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Weather_App />, document.getElementById('root'));
```
个人认为JSX中最重要的地方有两点：
1. 在return语句中，返回的DOM节点只能有一个根节点，也就是说顶层节点不能有两个(否则会报错)：
```html
//错误示例
return (
  <div>Node 1</div>
  <div>Node 2</div>
)
```
2. 需要注意JS和HTML中的关键字冲突。以Weather_App为例，我们不能在里面写class=xxx,而应该将class替换为className
PS：我刚试了下可以直接在return用class。。版本号:
```
"dependencies": {
  "react": "^16.3.2",
  "react-dom": "^16.3.2"
},
```
然后网上搜了下，说React16允许DOM传属性了，所以这么操作也行， __但是，官方不建议这么搞，打开控制台可以看到还是弹出了一个Warning__   
![](https://github.com/alivebao/weather_app/blob/chapter-1_Introduction/screenshoots/chapter2_class_warning.PNG)  

### 1.3 其他
另外书中还谈到了React工作方式的优点 - 函数式编程思维:
```
UI = render(data)
```
也就是说开发者专心处理数据源就好了，渲染的细节交给React去处理。这个在之后的几章里能逐渐感受到，这里就不多说了  
附一下个人对纯函数的理解：  
__给定该函数固定的参数，函数执行完成后不会改变该参数；且当输入的参数相同时，输出也永远是相同的__  
比如这俩就不满足纯函数：
```js
// 改变了输入
(a) => {
  a += 1;
}

// 输出不固定
() => {
  return Math.random();
}
```
[维基百科](https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0)还提到了另外一点：  
__该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等__
这里我的理解是说这个函数不能改变其他东西(比如说全局变量)，也就是说只负责输出。  