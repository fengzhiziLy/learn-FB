<?php
	
	header("Content-Type:text/html;charset=utf-8");
	// 根据用户的状态进行判断，登录成功就欢迎。没有登录就告知用户
	session_start();
	if (array_key_exists("user", $_SESSION)) {
		echo "欢迎".$_SESSION["user"]["username"];
	} else {
		echo "你还没有登录，请<a href='../page/login.html'>登录</a>";
	}

?>