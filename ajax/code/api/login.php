<?php

	header('Content-Type:text/html;charset=utf-8');
	// 接收请求
	$loginName = $_POST['loginName'];
	$password = $_POST['password'];

	// 处理请求，获取到用户名密码，到数据库进行查询
	// 建立数据库连接
	$con = mysql_connect("127.0.0.1", "root", "");

  if (!$con){
    die('Could not connect: ' . mysql_error());
  }

  $sql="select * from employee where loginName='$loginName' and password='$password'";

  mysql_select_db("feng", $con);

  $result = mysql_query($sql);
  $item = array();

  // 获取结果
  if ($row = mysql_fetch_array($result)) {
  	// 怎么拿到数据$row代表的是一条记录
  	$item = array(
  		"id" => $row['id'],
  		"username" => $row['username'],
  		"password" => $row['password'],
  		"loginName" => $row['loginName']
  	);
  }
  // 根据结果进行判断
  if (count($item) > 0) {
  	echo "登录成功";
  } else {
  	echo "登录失败，用户名或密码错误";
  }

?>