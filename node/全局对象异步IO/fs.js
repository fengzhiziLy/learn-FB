const fs = require('fs');

// 读取文件
fs.readFile('./path.js', (err, data) => {
	if (err) throw err; // 抛到控制台，显示异常信息
	console.log(data);
	// 需要获取字符串数据，就可以调用buffer.toString(编码)函数
	console.log(data.toString('utf8'));
})

// fs.readFile('./path.js', 'utf8', (err, data) => {
// 	if (err) throw err; // 抛到控制台，显示异常信息
// 	console.log(data);
// })

fs.writeFile('./a.txt', '我今天赚了1块钱', (err, data) => {
	if (err) throw err;
	console.log('写文件完成了');
})

fs.writeFile('./a.txt', '我今天赚了6块钱', {flag: 'a'}, (err, data) => {
	if (err) throw err;
	console.log('写文件完成了');
})

// 追加方式 appendFile('path', data, callback)
fs.appendFile('./a.txt', '我今天赚了2块钱', (err) => {
	if (err) throw err;
	console.log('文件追加成功');
})
