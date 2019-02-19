<?php
	
	header("Content-Type:text/html;charset=utf-8");

	// 用户登录，登录成功
	$username = '胡歌';

	// 把这个数据保存在会话里面，存在session中
	// 会话开始
	session_start();
	// 获取到对象，往里面保存数据	关联数组
	$_SESSION['username'] = $username;

?>