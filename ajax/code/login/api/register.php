<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body>
	<form action="../api/login.php" method="post">
    登录名：<input type="text" name="loginName"> <br><br>
    密码:<input type="text" name="password"><br><br>
    <input type="submit" value="登录">
</form>
</body>
</html>
<?php
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	$loginName = $_POST['loginName'];
	// 处理请求，往数据库里面添加一条数据
	$con = mysql_connect("127.0.0.1", "root", "");
	if (!$con) {
		die('could not connect: ' . mysql_error());
	}
	$sql = "insert into employee(username, password, loginName) value('$username', '$password', 'loginName')";
	mysql_select_db("feng", $con);
	mysql_query($sql);
	
?>