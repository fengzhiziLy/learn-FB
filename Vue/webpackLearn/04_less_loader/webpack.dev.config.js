const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack ./main.js  ./build.js
module.exports = {
	// 入口
	entry: {
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main": './src/main.js'
	},
	output: {
		path: path.resolve('./dist'),  // 相对转绝对
		filename: 'build.js'
	},
	watch: true, //文件监视改动 自动产出build.js
	// 声明模块
	// 包含各个loader
	module: {
		loaders: [{
				// /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(jpg|png|jpeg|gif|svg)$/,
				loader: 'url-loader?limit = 60000'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	},
	// 添加插件
	plugins: [
		// 插件的执行顺序与元素索引有关
		new HtmlWebpackPlugin({
			template: './src/index.html' // 参照物
		})
	]
}