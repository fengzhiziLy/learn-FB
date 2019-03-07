// webpack ./main.js ./build.js
module.exports = {
	// 入口
	entry: {
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main": "./main.js"
	},
	// 出口
	output: {
		filename: './build.js'
	},
	watch: true, // 文件监视改动 自动产出build.js 但是在浏览器中手动刷新
	// 声明模块
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'   // 这样的先右后左
		}, {
			test: /\.(jpg|png|jpeg|gif|svg)$/,
			loader: 'url-loader?limit=4000'
		}]
	}
}