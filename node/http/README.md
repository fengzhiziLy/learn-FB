### 遍历文件夹的文件

> 读取文件夹，获取其中所有文件的资源

`stat` 获取文件状态

`readdir` 读取文件夹数据

`access` 判断文件或文件夹是否存在

### 包（文件夹）

1. 多个文件，有效的被组织与管理的一个单位
2. 留一个入口
3. __包就是一个:文件夹__

#### npm|| yarn

* 先有一个包描述文件（__package.json__)
* 创建一个包描述文件 `npm init [-y]`
  - 会根据当前的文件夹来自动生成包名（__不允许中文，不允许大写英文字母__)
  - 默认生成```npm init [-y]```
* 下载一个包 `npm install art-template jquery@1.5.1 --save`
  - 记录依赖`--save`
* 根据package.json文件中的`dependencies`属性恢复依赖
  - 恢复包 `npm install`   简单: `npm i`
* 卸载一个包 `npm uninstall jquery@1.5.1 --save`
* __小结:以上简写:  uninstall -> un ,install -> i , --save -> -S__
* 查看包的信息
  - `npm info jquery`
* 查看包的信息中的某个字段(版本)(掌握)
  - `npm info jquery versions`
* 查看包的文档
  - `npm docs jquery`
* 安装全局命令行工具
  - `npm install -g http-server`
* 卸载全局命令行工具
  - `npm uninstall -g http-server`
* 查看全局包的下载路径
  - `npm root -g`

#### 包的区别

> 凡是通过`require`引入的包，都是需要使用该对象的属性或函数
> npm下载的包存在于当前目录的`node_modules`

**还有一类属性工具性的包(全局命令行工具)**

在命令行直接使用

#### nrm是npm的镜像源管理工具

* 1:全局安装 `npm install -g nrm`
* 2:查看当前可选的镜像源 `nrm ls`
* 3:切换镜像源 `nrm use taobao`
* 选修: 添加自己公司私有源 nrm add name http://www.xxx.xxx/

#### 查找包的入口

```js
const jq = require('jquery');

// 获取加载机制中某个包的入口
console.log(require.resolve('jquery'));
console.log(jq);
```

### http核心模块

#### 主体对象

- 服务器对象：`http.createServer()`
- 客户端对象: `http.request({host:'www.baidu.com'});`
- 请求报文对象(对于服务器来说，是可读)  req
- 响应报文对象(对于服务器来说，是可写) res

#### 请求报文对象(只读)

* 请求首行中的url `req.url ` 
* 请求首行中的请求方式 `req.method`
* 请求头中的数据`req.headers`是一个对象
* 头信息中，也可以作为与服务器交互的一种途径

#### 响应对象

* 响应首行 `res.writeHead(状态码)`
* 写响应头 
  * 一次性写回头信息
    * `res.writeHead(200,headers)`
  * 多次设置头信息
    * `res.setHeader(key,value);`
* 写响应体
  * 一次性写回响应体
    * `res.end();`
  * 多次写回响应体
    * `res.write();`

#### 状态码分类

* 1开头，正在进行中
* 2开头，完成
* 3开头，重定向
* 4开头，客户端异常
* 5开头，服务器异常