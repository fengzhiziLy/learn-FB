const fs = require('fs');
const myPath = './process_argv.js';

console.log('读取前');

fs.readFileSync(myPath);

console.log('读完以后执行的工作A');
console.log('读取成功');

// 异步读取
console.log('异步读取前');
fs.readFile(myPath, () => {
	console.log('异步读取后');
})
console.log('读完以后执行的工作B');
