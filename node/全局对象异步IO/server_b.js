const http = require('http');

http.createServer((req, res) => {
	res.end('9999端口服务器被访问了');
}).listen(9999, () => {
	console.log('服务器启动在9999');
})