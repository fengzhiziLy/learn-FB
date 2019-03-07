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
	}
}