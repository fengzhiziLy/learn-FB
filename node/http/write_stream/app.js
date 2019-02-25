const http = require('http');
const fs = require('fs');

// 设计两个接口， / 返回index.html   /test 只用write不用end => 默认的是页面一直转，如果用ajax

let server = http.createServer((req, res) => {
	if (req.url === '/') {
		fs.readFile('./index.html', (err, data) => {
			res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
			res.end(data);
		})
	} else if (req.url === '/test' && req.method === 'GET') {
		res.writeHead(200, {'content-type': 'application/octet-stream'});
		setInterval(function () {
			res.write('' + Date.now() + '^_^');
		}, 1000)
	}
}).listen(8888);