const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');

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
.post('/login', async ctx => {
	// 用户名abc 密码123 登录成功回写cookie，保存数据到session中
	let username = ctx.request.body.username;
	let password = ctx.request.body.password;
	if (username != 'abc' || password != '123') {
		// koa中的异常处理
		// ctx.set('content-type', 'text/html;charset=utf-8');
		ctx.throw(200, `^_^^_^^_^`);
		// return;
	} else {
		// 使用session保存数据
		ctx.session.user = {
			username: 'abc'
		}
		ctx.body = '登录成功';
	}
})
.get('/list', ctx => {
	ctx.body = `当前登录的用户：` + ctx.session.user.username
})

// 静态资源
app.use(static(path.resolve('./public')));
const session = require('koa-session');

// 通过任意字符串为基准进行加密算法的字符串
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', // session名
  maxAge: 86400000,
  // autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, // 不允许在客户端操作cookie, false客户端可以操作
  signed: true,  // 数字签名，保证数据不被篡改
  rolling: false, // 过期时间访问顺延
  renew: false,
};
 
app.use(session(CONFIG, app));
// ctx.request.body挂载属性
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
	console.log(err);
})

app.listen(8888);