function myPlugin (options) {
  // 用户的个性化定制
  this.options = options
  if (!this.options.text) {
    throw new Error('text is required!!!')
  }
}

myPlugin.prototype.apply = function(compiler){
  // 编译过程事件回调函数
  compiler.plugin('compilation', (compilation) => {
    // 通过compilation操作文件
    compilation.assets['./test.txt'] = {
      // 内容
      source: () => {
        return this.options.text
      },
      // 大小
      size: () => {
        return this.options.text.length
      }
    }
    // 通过compilation切入其他组件提供的事件
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, callback) => {
      console.log(htmlData.html)
      htmlData.html = htmlData.html.replace('<div id="app"></div>', `
           <div id="app">
                  <div style="background-color:red;height:300px;display:none;" id="default" >
                      我是默认的骨架屏
                  </div>
                  <div style="background-color:red;height:300px;display:none;" id="user" >
                      我是user的骨架屏
                  </div>
                  <div style="background-color:red;height:300px;display:none;" id="login" >
                      我是login的骨架屏
                  </div>
                </div>
                <script>
                      var hash = window.location.hash;
                      var path = window.location.pathname;
                      if (path === '/login' || hash === '#/login') {
                        document.getElementById('login').style.display = 'block';
                      } else if (path === '/user' || hash === '#/user') {
                        document.getElementById('user').style.display = 'block';
                      } else {
                        document.getElementById('default').style.display = 'default';
                      }
                </script>
        `)
      callback(null, htmlData)
    })
  })
}
// 供webpack.config.js中的module.exports.plugins.push(new myPlugin())
module.exports = myPlugin
