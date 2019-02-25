// 1. 引入核心对象
const http = require('http');

// 2. 创建服务器
let server = http.createServer();

// 3. 基于事件
server.on('request', (req, res) => {
  // req 只读对象  拿属性
  // res 只写对象  调函数
  // console.log(req.headers);
  // console.log(req.url);
  // console.log(req.method);
  // req.on('data', () => {
  //   console.log(data.toString());
  // })
  res.setHeader('a', 'a');
  res.setHeader('b', 'b');
  res.setHeader('c', 'c');
  // res.writeHeader(200, {'d': d});
  res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
  res.write('窗前明月光');
  res.end('夏天'); // 写入到响应体的
});

server.listen(8888, () => {
  console.log('服务器启动在8888端口');
});