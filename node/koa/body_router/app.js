const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

let app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
	ctx.body = ctx.request.body;
})

app.listen(8888);