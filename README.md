# React实战 - weather_app

## 目录
  1. [介绍](#介绍)
  2. [React新的前端思维方式](#React新的前端思维方式)

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