const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');

let app = new Koa();

render(app, {
  // 页面查找的目录
  root: path.join(__dirname, 'view'),
  // 设置后缀名
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

let router = new Router();
router.get('/', async ctx => {
  // ctx.body = 'index';
  ctx.render('index')
})
// 在静态资源的处理之前，重写URL，改变用户URL的请求
app.use(async (ctx, next) => {
	if (ctx.url.startsWith('/public')) {
		// 改写请求URL
		ctx.url = ctx.url.replace('/public', '');
	}
	// 要交给static来处理   不管如何都放行
	await next();
	console.log('hahahaha');
})

// 静态资源
app.use(static(path.resolve('./public')));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888);