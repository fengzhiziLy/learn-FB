const express = require('express');

let server = express();

let router = express.Router();

router.get('/json', (req,res) => {
  res.json([{name: 'fengzhizi'}]);
  // res.end只能响应string||读文件中的data Buffer
})
.get('/jsonp', (req, res) => {
  res.jsonp('jack love rose');
  // /**/ typeof jsonpcallback === 'function' && jsonpcallback("jack love rose");
})
.get('/redirect', (req, res) => {
  res.redirect('http://www.baidu.com');
})
.get('/download', (req, res) => {
  res.download('./app.js');
  // 基于服务器回写的content-type等头信息
  // Content-Disposition: attachment; filename="app.js"
})

server.use(router);

server.listen(8888);