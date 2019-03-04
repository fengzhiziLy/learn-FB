// 代表服务器那边emit('msg1', data)
socket.on('msg1', function(data) {
  console.log(data);
});
socket.on('disconnect', function() {
  console.log('断开连接');
});
// 获取实时的在线列表信息
socket.on('online', function(data) {
  // data 是一个sessionStore
  // 把该对象转换成数组
  let users = Object.values(data.online);
  // 展示在线人数
  document.getElementById('online').innerText = users.length;
  // select在线列表
  var select = document.getElementById('towho');
  // 声明临时字符串 innerHTML
  var html;
  for (var i = users.length - 1; i >= 0; i--) {
    var u = users[i];
    html += `
	  			<option value="${u.socketid}">
	  				${u.username}
	  			</option>
	  		`
  }
  select.innerHTML = html;
})
socket.on('allmessage', function(data) {
  var ul = document.getElementById('ul');
  ul.innerHTML += data;
})