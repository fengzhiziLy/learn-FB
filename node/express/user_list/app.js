const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const db = require('./dbTools.js');
let server = express();

let heros = [];

// .html 渲染文件的后缀名
server.engine('.html', require('express-art-template'));

// 区分开发和生产环境的不同配置
server.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})

// 配置默认的渲染引擎
server.set('view engine', '.html');

let router = express.Router();
// let router1 = express.Router();

router.get('/list', (req, res, next) => {
  // res.render('index', {
  //   heros
  // });
  console.log(req.headers.cookie);
  // 获取到xxx.xxx, xxx.xxx
  let location = req.headers.cookie.split('=');
  if (!location) return res.send('没有注册');
  location = location[1];
  let left = location.split(',')[1];
  let right = location.split(',')[0];
  db.nearMe('test', {left: parseFloat(left),right: parseFloat(right)}, function (err, heros) {
    console.log(heros);
    res.render('list', {
      heros
    });
  })
})
.get('/', (req, res, next) => {
  res.render('index')
})
.post('/add', (req, res, next) => {
  // 解析文件
  var form = new formidable.IncomingForm();
  // 修改上传目录
  form.uploadDir = path.join(__dirname, 'public', 'imgs');
  // 保持原有后缀名
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    // console.log(fields); // fields.nickname
    // console.log(files); // files.avater.path  path.parse().base
    let nickname = fields.nickname;
    let filename = path.parse(files.avater.path).base;
    let location = fields.location;
    // 存储img：网络能请求到的路径 img/uploadxxx.jpg
    let img = 'imgs/' + filename;
    // heros.push({
    //   nickname, 
    //   img
    // });
    // 接受用户输入的location
    let left = location.split(',')[1];
    let right = location.split(',')[0];
    // 保存数据
    db.insert('test', { nickname, img, sp:{type:"Point",coordinates:[parseFloat(left), parseFloat(right)]} }, function (err, result) {
      if (err) return next(err);
      // 保存位置的cookie
      res.setHeader('set-cookie', 'location=' + location)
      // 同步提交，浏览器等待页面显示
      res.redirect('/list');
    })  
  })
})
.all('*', (req, res) => {
  res.send('地址错误,<a href="/">首页</a>')
})

// let router2 = express.Router();
// router2.get('/', (req, res, next) => {
//   res.render('index', {
//     heros
//   });
// })

// 处理图片
server.use(express.static('./public'));

server.use(router);
// server.use('/api', router1);
// server.use(router2);

// 处理错误(参数位置错误优先)
server.use((err, req, res, next) => {
  res.send('<h1>访问的页面出错了</h1>')
})

server.listen(8888, () => {
  console.log('8888');
});