### express

#### 虚拟目录

```js
const express = require("express");
// 自动逐级向上查找node_modules/express的文件夹-->package.json(main属性)

let server = express();

server.listen(8888, () => {
  console.log("服务器启动在8888端口");
});

// server.use((req, res) => { // (请求与响应的过程中)
//  res.end('ok'); // 原生API
// })
// Response Headers:    X-Powered-By: Express

// 类似路由
// server.use是请求与响应中执行的一件事，按代码顺序来执行
// next()是放行到下一件事的开关
// 如果全next，最终没有end页面数据，处理了status: 404(Status Code: 404 Not Found)
// 用户选择性URL开头的部分，选择性调用对应的事情
// server.use(fn)是任何请求都会处罚执行的
server.use("/sucai", (req, res, next) => {
  console.log("白菜");
  next();
});
server.use("/sucai", (req, res, next) => {
  console.log("萝卜");
  next();
});
server.use("/huncai", (req, res, next) => {
  console.log("牛肉");
  next();
});
server.use("/huncai", (req, res, next) => {
  console.log("羊肉");
  next();
});
```

#### 中间件类别

**应用级中间件`app.use(事fn)`**

**路由级中间件**:

1. 获取路径级中间件
2. 配置路由
3. 加入到应用程序中`app.use(router)`

**内置中间件**

- 处理一些静态资源文件的返回(设置将某个目录下的资源文件向外暴露)
  - 当 URL 匹配上设置的目录下的子文件后，自动返回该文件
  - 加入到应用程序控制中`app.use(内置中间件)`

**第三方中间件**

**错误处理中间件**： 在 express 中统一处理错误`next(err)`

#### 路由中间件

_一个请求进来(总网线)，分发到各自不同的处理(分多根网线给其他人)_

- 后端路由

  - （请求方式+URL=判断依据）（分流的判断依据）--> 做不同的处理

- 使用步骤
  - 1. 获取路由中间件对象 `let router = express.Router();`
  - 2. 配置路由规则 `router.请求方式(URL,fn事)`
    - fn 中参数有 req,res,next
  - 3. 将 router 加入到应用`app.use(router)`

#### res 扩展函数

```js
res.download("./xxx.txt"); // 下载文件
res.json({}); // 响应json对象
res.jsonp(数据); // 配合jsonp   要求客户端请求的时候也是jsonp的方式,  并且callback=xxx
res.redirect(); //  重定向 301是永久重定向, 302临时重定向
res.send(); // 发送字符串数据自动加content-type
res.sendFile(); // 显示一个文件
res.sendStatus(); // 响应状态码
```

### 渲染模板

#### 使用art-template模板引擎

- app.js中配置
  - 注册一个模板引擎
    - `app.engine('.html',express-art-template)`;
      - 设置默认渲染引擎`app.set('view engine','.html')`;
  - res.render(文件名,数据对象);
  - express这套使用，默认在当前app.js同级的views目录查找

#### 内置中间件(处理静态资源)

- 1: 创建对象 `let static = express.static('./public');`
- 2: 配置到中间件中 `app.use(static);`

```js
// npm install formidable --save;
router.get('/', (req,res) => {
  res.render('index');
})
// 要把public目录下的文件暴露出来
server.use('/public', express.static('./public')) // 当虚拟目录/public被匹配以后，未来的url都会去除掉/public
```

#### 第三方中间件(post请求体的获取)

- 原生的:`req.on('data',data=>{ data.toString();})`

```js
const bodyParser = require('body-parser');
// 解析键值对application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// 不用扩展的库来解析键值对，而使用node内置核心对象querystring来解析键值对
// 解析application/json
app.use(bodyParser.json());
```

#### 服务端处理错误和404页面找不到

- 404页面响应`router.all('*',()=>{})`
- 触发错误
  - next(err);
  - 处理错误  app.use(4参数函数)

```js
router.get('/', (req, res, next) => {
  // 假如获取文件
  let errorPath = './abc/e.txt';
  try {
    fs.readFileSync(errorPath);
    res.render('index');
  } catch (err) {
    // throw err;  // 给用户看到了异常，体验不好
    next(err); 
  }
})
.all('*', (req, res) => {
  res.send('地址错误,<a href="/">首页</a>')
})
// 要把public目录下的文件暴露出来
server.use('/public', express.static('./public')) // 当虚拟目录/public被匹配以后，未来的url都会去除掉/public

server.use(router);

// 处理错误(参数位置错误优先)
server.use((err, req, res, next) => {
  res.send('<h1>访问的页面出错了</h1>')
})
```

### MongoDB

- 一个数据库对应多个集合
  - 一个集合对应多个文档对象
  - 在mongo中不论是db还是集合，都无需去创建它
  - 直接就当它已经存在，直接Use来使用
    - use db名称;
      - 接着会被切换到该db中
      - `db.要创建的集合名称.save({})`;这样集合就被创建了

- 查询有哪些数据库  
  - 查询数据库：`show dbs;`
  - 切换数据库: `use 数据库名;`
- 查询当前db下有哪些集合
  - `show collections;`
- 查询数据：
  - `db.集合名.find();`  //查询出来的是文档对象 document
  - `db.test.find();`
- 添加数据:
  - `db.集合名.save(对象)` //mongo默认会给我们加入_id作为该文档对象的唯一标识
  - `db.test.save({contry:'中国',name:'小明',score:77});`
- 删除数据:
  - `db.集合名.remove(条件对象);`//条件匹配就会被删除
  - `db.test.remove({name:'小明'});`
  - 如果给定一个空对像，会匹配全部
- 更新数据:
  - `db.集合名.update({匹配条件对象},{$set:{修改后的对象}});`
  - `db.test.update({name:'小明'},{$set:{contry:'印度'}});;`

#### 条件查询

```
练习：
  查询姓名为小明的学生
  db.test.find({name:'小明'});;   查询英语成绩大于90分的同学
  db.test.find({score:{$gt:90}}); //查找成绩大于90分$gt
  //$lt小于
  查询数学成绩不等于88的同学
  db.test.find({score:{$ne:88}});   查询总分大于200分的所有同学
  db.test.find({score:{$gt:200}});
```

#### 分页

- `db.test.find().skip(3).limit(3);`
- db.集合名称.find().跳到3.显示3条
      + limit 0,3

#### 排序

- `db.test.find().sort({key:排序方式});`
- `db.test.find().sort({'score':1});` //正数代表升序，负数代表降序

#### 模糊匹配

- `db.test.find({name:{$regex:'小'}});`
- `db.test.find({name:{$regex:'明'}});`

#### 聚合函数

- 需要求当前集合的记录数：
- `db.test.find().count();`
- 求最大值
  -求整个集合的总成绩
    + db.集合名.聚合({ 组的划分规则{_id:'1',显示内容:{$sum:'$score'}} })
  - 求所有人的平均分
    - `db.test.aggregate({$group:{_id:'1',sumscore:{$avg:'$score'}}});`
  - 求按国家分组，求所有国家的总分
    - `db.test.aggregate({$group:{_id:'$contry',sumScore:{$sum:'$score'}}});`

#### 联合查询

```sql
db.orders.insert([
  { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
  { "_id" : 3  }
]);
db.inventory.insert([
  { "_id" : 1, "sku" : "almonds", description: "product 1", "instock" : 120 },
  { "_id" : 2, "sku" : "bread", description: "product 2", "instock" : 80 },
  { "_id" : 3, "sku" : "cashews", description: "product 3", "instock" : 60 },
  { "_id" : 4, "sku" : "pecans", description: "product 4", "instock" : 70 },
  { "_id" : 5, "sku": null, description: "Incomplete" },
  { "_id" : 6 }
]);
db.orders.aggregate([
  {
    $lookup:  -- 管道中加入一次查找操作
      {
        from: "inventory",  -- 从哪个集合产生关联
        localField: "item",  -- orders的字段
        foreignField: "sku", -- inventory的字段
        as: "inventory_docs" -- 当orders.item === inventory.sku就合起来展示数据
      }
  }
]);
```