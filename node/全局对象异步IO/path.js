const path = require('path');

// 3段路径
const myPath = path.join(__dirname, '//one//', 'two', '///three///');

console.log(myPath);

// 根据相对路径返回绝对路径
const str = './abc/efg.js';
let temp = path.resolve(str);
console.log(temp);

// 接受一段字符串路径
let myPath1 = path.join(__dirname, 'fengzi', 'xiaobai', 'feng.txt');
// 解析这个路径为对象
let pathObj = path.parse(myPath1);
console.log(pathObj);

// base可以作为修改文件名或后缀的方式
pathObj.base = 'fengzhizi';
// 接受路径对象转换成路径字符串
let myPath3 = path.format(pathObj);
console.log(myPath3);