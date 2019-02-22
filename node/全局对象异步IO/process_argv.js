// 接受命令行参数
// console.log(process.argv);

// 命令行加法计算器
// provess.argv => [node绝对路径,文件的绝对路径, 1, 3]
let num1 = process.argv[2] - 0;
let num2 = parseInt(process.argv[3]);
let sum = num1 + num2;
console.log('计算中....');

setTimeout(() => {
	console.log('计算结果为: ' + sum);
}, 2000);