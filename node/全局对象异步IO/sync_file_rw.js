const fs = require('fs');

// 先读后写  有异常只能catch

let data = fs.readFileSync('./a.txt', 'utf8');

console.log(data);

fs.writeFileSync('./b.txt', data);

console.log('文件复制成功');