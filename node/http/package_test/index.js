const jq = require('jquery');

// 获取加载机制中某个包的入口
console.log(require.resolve('jquery'));
console.log(jq);