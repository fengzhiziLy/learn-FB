const express = require('express');

let server = express();
// .html 渲染文件的后缀名
server.engine('.html', require('express-art-template'));

// 区分开发和生产环境的不同配置
server.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
  // debug:不压缩，不混淆，实时保持最新的数据
  // 非debug：压缩、合并  list.html静态数据不会实时更新（服务器重启）
  imports: {
    // 数据的导入，和过滤显示的操作
    num: 1,
    reverse: function (str) {
      return '^_^' + str + '^_^';
    }
  }
})

// 配置默认的渲染引擎
server.set('view engine', '.html');

let router = express.Router();

router.get('/hero-list', (req,res) => {
  res.render('list.html', {
    heros: [{name: '貂蝉'}, {name: '吕布'}]
  })
})

server.use(router);

server.listen(8888);