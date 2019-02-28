// 读取一个HTML文件，展示给用户显示
const fs = require('fs');
const Koa = require('koa');

let app = new Koa();

function asyncReadFile () {
	return new Promise(function (resolve, reject) {
		fs.readFile('./index.html', (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	})
}

app.use(async (ctx) => {
	if (ctx.url === '/') {
		// 响应首页
		let data = await asyncReadFile();		// 异常使用catch
		console.log(data);
		// 设置响应头
		ctx.set('content-type', 'text/html;charset=utf-8');
		ctx.body = data;
		// ctx.body = data.toString();
	} else {
		// ok
		ctx.body = 'ok';
	}
})
app.listen(8888);