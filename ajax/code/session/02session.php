<?php

	// 用户可能请求这个页面，在这个页面判断用户的登录状态
	// 获取xiaobai
	session_start();
	echo $_SESSION['username'];

?>