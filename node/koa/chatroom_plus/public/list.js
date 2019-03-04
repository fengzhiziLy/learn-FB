var privateTo;
// 发起私聊
document.getElementById('sendPrivateMsg').onclick = function() {
  socket.emit('sendPrivateMsg', {
    msg: document.getElementById('privateMsg').value,
    // 向谁发
    to: privateTo, // socketid
  });
}
// 对大家说公共消息
document.getElementById('btn').onclick = function() {
  var newContent = document.getElementById('newContent').value;
  socket.emit('sendMsg', {
    newContent: newContent
  })
}
// 加入组
document.getElementById('male').onclick = function () {
	socket.emit('joinGroup', 'male');
}
document.getElementById('female').onclick = function () {
	socket.emit('joinGroup', 'female');
}