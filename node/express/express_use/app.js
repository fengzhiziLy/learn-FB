const express = require('express');
// 自动逐级向上查找node_modules/express的文件夹-->package.json(main属性)

let server = express();

server.listen(8888, () => {
	console.log('服务器启动在8888端口');
});

// server.use((req, res) => {	// (请求与响应的过程中)
// 	res.end('ok'); // 原生API
// })
// Response Headers:    X-Powered-By: Express

// 类似路由
// server.use是请求与响应中执行的一件事，按代码顺序来执行
// next()是放行到下一件事的开关
// 如果全next，最终没有end页面数据，处理了status: 404(Status Code: 404 Not Found)
// 用户选择性URL开头的部分，选择性调用对应的事情
// server.use(fn)是任何请求都会处罚执行的
server.use('/sucai', (req, res, next) => {
	console.log('白菜');
	next();
})
server.use('/sucai', (req, res, next) => {
	console.log('萝卜');
	next();
})
server.use('/huncai', (req, res, next) => {
	console.log('牛肉');
	next();
})
server.use('/huncai', (req, res, next) => {
	console.log('羊肉');
	next();
})