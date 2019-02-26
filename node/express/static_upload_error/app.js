const express = require('express');
const fs = require('fs');

let server = express();
// .html 渲染文件的后缀名
server.engine('.html', require('express-art-template'));

// 区分开发和生产环境的不同配置
server.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})

// 配置默认的渲染引擎
server.set('view engine', '.html');

let router = express.Router();

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

server.listen(8888);