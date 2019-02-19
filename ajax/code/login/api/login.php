<?php

	$loginName = $_POST['loginName'];
	$password = $_POST['password'];
	$con = mysql_connect("127.0.0.1", "root", "");
	if (!$con) {
		die('could not connect: ' . mysql_error());
	}
	mysql_select_db("feng", $con);
	$sql = "select * from employee where loginName='$loginName' and password='$password'";
	$result = mysql_query($sql);

	if ($row = mysql_fetch_array($result)) {
		// 登录成功
		$user = array("username" => $row['username'], "password" => $row['password']);
		// $row['username'];
		// $row['password'];
		// 放到session中
		session_start();
		$_SESSION["user"] = $user;
		// 跳转到首页中
		header("Refresh:3;url=index.php");
	} else {
		header("Refresh:3;url=../page/login.html");
		echo "登录失败";
	}

?>