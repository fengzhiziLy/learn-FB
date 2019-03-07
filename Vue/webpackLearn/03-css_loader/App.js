import imgSrc from './feng.jpg'

export default {
	template: `<div>
		<img :src="imgSrc" alt="" />
	</div>`,
	data () {
		return {
			imgSrc
		}
	}
}
// var app = {
// 	template: `<div>我是一个入口组件</div>`
// }
// // 声明并导出
// export var num1 = 2; // 作为一整个对象key导出

// // 声明再导出
// var num2 = 3;
// export {num2};


// export function add (x, y) {
// 	return console.log(x + y);
// }

// console.log(222);

// export default app;