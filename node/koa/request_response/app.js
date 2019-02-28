const Koa = require('koa');

let app = new Koa();

app.use((context, next) => {
	// console.log(context.request.url);
	// console.log(context.request.method);
	// console.log(context.request.headers);
	console.log(context.url);
	console.log(context.method);
	console.log(context.headers);
	next();
}); // 请求与响应之间发生的事
app.use((ctx) => {
	console.log('第二个事');
	// 响应头 状态码 体
	// ctx.response.set('mytest', '12345');
	// ctx.response.status = 200;
	// ctx.response.body = '<h1>hello</h1>'
	ctx.set('mytest', '12345');
	ctx.status = 200;
	ctx.body = '<h1>hello</h1>'
})
app.listen(8888);
// 404 在框架中最终并未响应页面