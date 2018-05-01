# React实战 - weather_app

## 目录
  1. [介绍](#介绍)
  2. [React新的前端思维方式](#react新的前端思维方式)
  3. [设计高质量的React组件](#设计高质量的react组件)
  4. [编写一个React实例](#编写一个react实例)

## 介绍
在读完程墨老师的[《深入浅出React和Redux》](https://book.douban.com/subject/27033213/)后，打算结合自己的理解，以构建一个显示天气的应用为例，争取涵盖书中所介绍的所有知识点。  

## React新的前端思维方式
### 1.1 create-react-app
这一章首先介绍了工具 __create-react-app__ , 通过该工具我们能快速创建一个react应用框架。  
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
// Weather_App.js
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
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Weather_App from './Weather_App';

ReactDOM.render(<Weather_App />, document.getElementById('root'));
```
个人认为JSX中最重要的地方有两点：
1. 在return语句中，返回的DOM节点只能有一个根节点，也就是说顶层节点不能有两个(否则会报错)：
```html
// 错误示例
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
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter2_class_warning.PNG)  

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

## 设计高质量的React组件
### prop和state
React组件里的数据分为两种-prop和state，这两种数据改变即可能引起组件的渲染(只是可能，不是一定会修改的)。  

#### prop和state的主要区别
prop和state的主要区别在于：  
1. prop是由外部传入的，是组件无法修改的  
2. state是用于记录组件内部的状态的，因此组件可以修改  
比如我们的应用需要一个组件用于显示某地温度，该组件接受一个指定地址的参数，根据该地址调用接口获取当地气温。  
那么这里的地址 __location__ 就是一个prop，气温 __tempature__ 就是一个state。  
我们创建两个新的组件 - WeatherSelecter(下拉框，选择地址) & WeatherPanel(显示面板，显示选择的地点及其温度)，并将这俩组件引入到WeatherApp。  
首先是WeatherPanel:
```jsx
// WeatherPanel
import React, { Component } from 'react';

class WeatherPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      temperature: 'NA'
    }

    this.getTemperature = this.getTemperature.bind(this);
  }

  getTemperature() {
    const mockTemperature = Math.random() * 100;
    this.setState({
      temperature: mockTemperature
    })
  }

  render() {
    const {location} = this.props;
    return (
      <div className="weather-panel">
        <div>{location}的温度是: {this.state.temperature}</div>
        <button onClick = {this.getTemperature}>Get Temperature</button>
      </div>      
    );
  }
}

export default WeatherPanel;

```
我们通过点击getTemperature模拟获取温度的过程  
这里要注意的地方：
1. bind - JS中的this的坑，在组件中定义的方法都需要通过bind函数指定this(当然，也可以使用箭头函数)
2. setState - 只有在构造函数初始化时能直接给state赋值，其他地方都要通过setState去操作。组件执行这个方法后才会刷新
3. porps - 通过this.props.NAME 使用外界传递进来的属性(属性不可修改)
4. JSX的render的return中使用变量 - 通过大括号 __{}__ 进行引用

接下来是WeatherSelecter，地址location同样可以当成一个props传递进来:
```jsx
// WeatherSelecter
import React, { Component } from 'react';

class WeatherSelecter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {locationGroup} = this.props;
    return (
      <div className="weather-selecter">
        <select>
        {
          this.props.locationGroup.map((locationObj) => {
            return <option key={locationObj.key}>{locationObj.name}</option>
          })
        }</select>
      </div>
    );
  }
}

export default WeatherSelecter;

```
这里locationGroup是一个对象数组，通过map显示出来。option中有一个key属性，这个主要是做性能优化的，之后的章节会提到  
WeatherApp修改如下：
```jsx
import React, { Component } from 'react';
import WeatherSelecter from './WeatherSelecter'
import WeatherPanel from './WeatherPanel'
import {arrLocation as LocationGroup} from './WeatherLocationGroup'

class WeatherApp extends Component {
  render() {
    return (
      <div className="weather-app">
        <WeatherSelecter locationGroup={LocationGroup} />
        <WeatherPanel location='undefined' /> 
      </div>      
    );
  }
}

export default WeatherApp;
```
这里存在两个问题:  
1. 如何对传递进来的props进行检测 - 也就是说组件如何预期传递捡来的属性的类型，以及需要的属性没穿进来的时候，组件该如何处理
2. 组件间如何通信 - selecter里选中的值，是何如传递到panel里的

对于问题1，可以通过定义PropTypes解决。以WeatherPanel为例，预期输入的属性是一个名为location的字符串，可以这么写：
```jsx
// WeatherPanel
...
import PropTypes from 'prop-types';
...
WeatherPanel.propTypes = {
  location: PropTypes.string.isRequired
}
```
PS: [React.proptype在Reactv15.5已经弃用了](https://stackoverflow.com/questions/44573199/cannot-read-property-string-of-undefined-react-proptypes-layoutproptypes-j/44603946)，使用的话需执行 __npm install --save prop-types__ 手动安装一下依赖  
增加这些之后就会对props进行检查了 - 如果location不存在，或其类型不是string，程序就会直接报错  
__书中建议props的检测放在开发环境里，在发布代码的时候就不要这么操作了(毕竟即增加了代码量，对用户又没什么意义)__  

关于组件间的通信，这里暂时通过父组件来完成。  
父组件 __WeatherApp__ 向 __WeatherSelecter__ 中传递一个回调函数，当selecter的内容改变时通知父组件，从而重新渲染：  
```jsx
// WeatherApp.js
...
// 新增方法locationUpdae
locationUpdate(locationName) {
  this.setState({
    selectedLocation: locationName
  })
}
...
// 传给WeatherSelecter
<WeatherSelecter locationGroup={LocationGroup} locationUpdate={this.locationUpdate}/>
```
WeatherSelecter: 
```jsx
// WeatherSelecter.js
...
// 修改render的内容, select的value改变时调用WeatherApp的setState更新整个WeatherApp
// WeatherSelecter里加个onChange方法再在constructor写遍bind太麻烦了，这里直接使用箭头函数
render() {
  const {locationGroup, locationUpdate} = this.props;
  return (
    <div className="weather-selecter">
      <select onChange={(event) => {locationUpdate(event.target.value)}}>
      {
        this.props.locationGroup.map((locationObj) => {
          return <option key={locationObj.id} value={locationObj.name}>{locationObj.name}</option>
        })
      }</select>
    </div>
  );
}
```  
效果图：
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter2_1_state_and_props.PNG)  
PS: 多个组件同步数据挺麻烦的，以后学习了Flux/Redux就方便多了  

### 组件的生命周期
组件在生命周期中可能会经历三个过程：
1. 装载(Mount)，即组件第一次在DOM树种渲染的过程  
2. 更新(Update)，即组件重新渲染的过程  
3. 卸载(Unmount)，即组件从DOM树种删除的过程  

#### 装载
组件装载过程中会经历以下阶段:
constructor -> getInitialState -> getDefaultProps -> componentWillMount -> render -> componentDidMount  
constructor是组件类的构造函数，我们在这里完成组件的初始化工作(设置state以及通过bind绑定成员函数的this环境)  
getInitialState和getDefaultProps值在React.createClass这种写法中生效，但这种写法已被Facebook官方逐步废弃  
__render__ 是整个React组件中最重要的函数，组件通过该函数的返回值进行渲染。 __render函数不做实际的渲染动作，它只是返回一个JSX描述的解构，最终由React来操作渲染过程__  
componentWillMount和componentDidMount的调用分别发生在render前后，这里需要注意componentDidMount函数。  
在WeatherSelecter和WeatherPanel的class中分别打印一下生命周期流程：
```jsx
...
componentWillMount() {
  console.log('component WeatherXXX WillMount')
}

componentDidMount() {
  console.log('component WeatherXXX DidMount')
}

render(){
  console.log('component WeatherXXX render')
}
```
打印效果如图:  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter2_2_component_mount.PNG)  
为什么两个组件的componentDidMount会在最后才统一执行？  
在组件的生命周期中，当componentDidMount被调用时，组件一定是已经被渲染出来了的  
而render函数调用只是返回了该组件的结构描述，并是立刻渲染的。  
具体的渲染时机由React决定，而React库要拿到所有组件的render后才能决定如何渲染  
  
通过这点，也就知道了，当需要对组件的DOM进行操作时，这类操作需放在componentDidMount这一阶段(比如使用jQuery选择某组件id等)  

#### 更新
组件的更新过程会经历以下阶段：
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate  
这里最重要的函数是shouldComponentUpdate    
父组件的render被调用时，被包含在render中的子组件就会开始更新过程，但从提升性能的角度来看，子组件没有必要每次都更新。  
shouldComponentUpdate(nextProps, nextState)返回一个boolean，为false时表示组件没有必要更新，我们可以通过修改这个函数避免无意义的更新。  
先给WeatherApp加个强制更新的按钮，点击按钮会强制刷新WeatherApp：  
```jxs
// WeatherApp.js
...
render(){
  ...
    <button onClick= {() => {this.forceUpdate()}}>Force Update</button>
  </div>
}
```
渲染完成后点击Force Fresh,可在控制台看到WeatherSelecter和WeatherPanel都重新走了一遍render：
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter2_3_force_update.PNG)  
然后我们修改WeatherPanel，当WeatherPanel的props.location或state.temperature没变化时，该组件不更新：
```jsx
shouldComponentUpdate(nextProps, nextState) {
  return (nextProps.location !== this.props.location) || 
    (nextState.temperature !== this.state.temperature);
}
```
再点Force Update，可以看见只有WeatherSelecter执行了render，WeatherPanel并没有重新渲染：
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter2_4_shouldComponentUpdate.PNG)  
组件被更新后，其DOM被重绘了，如果需要在重绘后再在组件上做一些DOM相关的操作，则可以在componentDidUpdate中进行  

## 编写一个React实例  
书上从第三章开始介绍Flux/Redux, 本文在这章打算先用React构建出一个天气预报应用，在之后的章节中在将其改造成Redux  
效果图：
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_1_Weather_App.PNG)  
Git Log: 81005f12b7244a98f50314aa36d8028ce245c11f  

### 3.1 实现  
这个应用中，各React组件分解如图：
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_2_Weather_App_Detail.PNG)  
也就是说，在这里应用被这样分解了：  
```
WeatherApp = WeatherHeader + WeatherPanel 
  = (<div>{header}</div> + WeatherLocationSelecter) + (WeatherSelectedStatus + WeatherCalenderSelecter)  
```
那么各组件应该完成什么功能？分组件来看的话:  
1. WeatherHeader部分负责选择城市，当城市切换时，应用发起网络请求获取相应城市的天气信息  
2. WeatherSelectedStatus是一个纯负责展示的组件  
3. WeatherCalenderSelecter负责展示未来两天的信息，通过点击可在WeatherSelectedStatus中展示当日的具体信息的  

#### 获取信息  
WeatherHeader负责选择城市 & 获取天气信息，那么在该组件成功获取天气信息后，如何通知应用进行更新？  
这里通过在WeatherApp添加一个更新天气的回调函数，然后将该函数作为props传递给WeatherHeader。WeatherHeader中的WeatherLocationSelecter获取信息成功后，调用该回调函数通知系统进行重绘：
```jsx
//WeatherApp.js
...
locationIdUpdate(locationId, dailyInfo) {
  this.setState({
    daily: dailyInfo, 
    selectedLocationId: locationId
  })
...
```

#### 绘制WeatherSelectedStatus  
这个很简单，WeatherSelectedStatus  是一个傻瓜组件，预设获取的数据类型，完成render即可。  
傻瓜组件：React中专心负责绘制工作的组件被称为傻瓜组件  

#### WeatherCalenderSelecter和WeatherLocationSelecterStatus的交互  
在这个天气预报应用中，我们通过WeatherLocationSelecter获取指定城市未来三天的天气信息，并调用WeatherApp传递给它的回调函数重绘应用。WeatherLocationSelecte获取到的数据结构实际上是一个对象数组:  
```javascript
[{
  // dailyInfo of day1
  ...
}, {
  // dailyInfo of day2
  ...
}, {
  // dailyInfo of day3
  ...
}]
```
WeatherSelectedStatus接受数组的第一个对象，绘制当天的天气  
WeatherCalenderSelecter接受整个数组，绘制未来天气信息  
为了能达到 __选择WeatherCalenderSelecter中某天信息，切换WeatherSelectedStatus中显示内容__ 的目的，实际上就是要通过点击CalenderSelecter中的各item切换WeatherSelectedStatus中接受到的天气对象。  
所以采用和1中类似的方案，在WeatherPanel中增加一个回调函数传递给WeatherCalenderSelecter，点击不同item时切换WeatherPanel传递给WeatherSelectedStatus的内容即可。  

最后附一张解析图：  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_3_Weather_App_Resolve.PNG)    

注：这里用的API是[心知天气](https://www.seniverse.com)提供的天气接口  

### 3.2 组件性能优化  
书上在第四章的最后提到通过插件[React Pref](https://chrome.google.com/webstore/detail/hacmcodfllhbnekmghgdlplbdnahmhmm)可检测React组件渲染的性能问题  
[React的官方文档表示在React 16之后插件react-addons-perf已废弃，可通过浏览器自带的性能分析工具直接分析](https://reactjs.org/docs/perf.html)  
Chrome -> F12 -> Performance -> User Timing  
这里头能直接看到React事件，下图是我连点几次第一个日期选项按钮的截图:  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_4_Weather_App_Update.PNG)  
可以看到每次点击时，WeatherSelectedStatus每次都走了一遍update过程

第二章中提到过，在React组件的生命周期分为Monut -> Update -> Unmount三步，而Update这一过程可分为：  
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate  
通过修改shouldComponentUpdate可以避免无意义的组件更新，从而达到提升性能的目的。修改组件的更新规则，改为WeatherSelectedStatus只在currentDayInfo变化时才update：  
```jsx
// WeatherSelectedStatus
shouldComponentUpdate(nextProps) {
  return JSON.stringify(nextProps.currentDayInfo) !== JSON.stringify(this.props.currentDayInfo)
}
```
再次连点几次第一个日期选项按钮，发现这次WeatherSelectedStatus只调用到shouldComponentUpdate就停止了:  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_5_Weather_App_ShouldUpdate.PNG)  
然后，我们试着重复点击北京这个按钮时，能看到整个组件都重复渲染了，这里最简单的优化方式是直接避免掉没意义的网络请求= =:
```jsx
// WeatherLocationSelecter
...
// 1. 在构造函数里加一个state，用于记录上次选中的id
...
constructor(props) {
  ...
  this.state = {
    currentSelectedId: undefined
  }
  ...
}
...
// 2. 发起网络请求前，比较想要请求的id是否与上次记录的id一致
...
locationIdUpdate(locationId) {
  if(this.state.currentSelectedId === locationId) {
    return
  }
...
}  
...
```  
另外，为了最大程度避免短时间内多次重复请求已得到的数据，还可以在第一次请求后把数据缓存到浏览器，并加上过期时间  

### 3.3 项目代码组织方式  
当前代码组织图如下，可以看到是一堆文件全都丢在src下面：  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_6_Weather_App_Files.PNG)  
文件可以按角色或功能进行组织  
1. 按角色进行组织(MVC框架)  
````
|
|--controllers/
|   |--...
|
|--models/
|   |--...
|
|--views/
|   |--...
|
|...
````  
2. 按功能进行组织  
书中提到，在React中，这种是一种更为适用的组织方式。在这里，我们把各个功能模块放入对应文件间中，并在每个文件夹中增加相应的index文件导出本模块的文件，供其他模块进行调用。  
以WeatherSelectedStatus为例，新建文件夹WeatherSelectedStatus, 将x.js和x.css放入其中，并增加index.js:  
```javascript
import view from './WeatherSelectedStatus'

export {view}
```  
在需要使用WeatherSelectedStatus的地方，我们可以使用以下方式获取:  
```javascript
import {view as WeatherSelectedStatus} from './WeatherSelectedStatus'
```  
这么做的好处在于，无论WeatherSelectedStatus如何修改，通过index对外暴露的接口都不会改变，使用时直接安装上面的import方式进行导入即可。  
最终文件结构如图所示:  
![](https://github.com/alivebao/weather_app/blob/master/screenshoots/chapter3_7_Weather_App_Files_Structure.PNG)  