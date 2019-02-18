<?php

  header("Content-Type:text/html;charset=utf-8");
  header("Refresh:5;url=http://www.baidu.com");

  $username=$_POST['username'];
  $password=$_POST['password'];
  $loginName=$_POST['loginName'];

  // 把客户端的数据往数据库里面存放
  $con = mysql_connect("127.0.0.1", "root", "");
  if (!$con) {
    die('Counld not connect: ' . mysql_error());
  }
  // 连接数据库
  mysql_select_db("feng", $con);

  $sql = "insert into employee(username, password, loginName) value('$username', '$password', '$loginName')";

  if (!mysql_query($sql, $con)) {
    die('Error: ' . mysql_error());
  }
  mysql_close($con);
  echo "注册成功,5秒之后跳转";

?>