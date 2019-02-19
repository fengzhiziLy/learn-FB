<?php
	header("Content-Type:text/html;charset=utf-8");
	// 实际开发需要获取到用户输入的用户名
	$username = $_GET['username'];
	$users = array("yajun", "fengzhizi", "xiaobai");

	if (in_array($username, $users)) {
		echo "该用户名已经被注册";
	} else {
		echo "该用户名可以使用";
	}

?>