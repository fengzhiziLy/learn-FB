const http = require('http');

http.createServer((req, res) => {
	res.end('8888端口服务器被访问了');
}).listen(8888, () => {
	console.log('服务器启动在8888');
})