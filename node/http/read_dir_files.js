// 接受命令行参数，根据该目录，读取该目录下的所有文件并输出(遍历文件夹)
const path = require('path');
const fs = require('fs');
// 1. 接受命令行参数
// 2. 修正该路径 path.resolve(process.argv[2])
let inputPath = path.resolve(process.argv[2]);
// 3. 判断该路径是否存在fs.access(fs.constants.F_OK)
function testReadFiles(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    // 4. 遍历该文件夹
    // function (dir) {// 判断该路径是文件还是文件夹，如果是文件，输出，如果是文件夹，读取子文件夹，如果是文件夹继续调用自己 }
    let state = fs.statSync(dir);
    if (state.isFile()) {
      // console.log('是一个文件');
      console.log(dir);
    } else if (state.isDirectory()) {
      // console.log('是一个文件夹');
      let files = fs.readdirSync(dir);
      // console.log(files);
      files.forEach( file => {
      	testReadFiles(path.join(dir, file));
      });
    }
  } catch (e) {
    console.log(e);
    console.log('该文件或文件夹不存在!');
  }
}
testReadFiles(inputPath);