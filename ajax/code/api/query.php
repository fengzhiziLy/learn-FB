<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>

<?php

	// 把所有的employee的数据都获取到，通过一个表格输出到客户端
	header('Content-Type:text/html;charset=utf-8');
	
	$con = mysql_connect("127.0.0.1", "root", "");

  if (!$con){
    die('Could not connect: ' . mysql_error());
  }

  $sql="select * from employee";

  mysql_select_db("feng", $con);

  $result = mysql_query($sql);
  $list = array();

  while ($row = mysql_fetch_array($result)) {
  	$item = array(
  		"id" => $row['id'],
  		"username" => $row['username'],
  		"password" => $row['password'],
  		"loginName" => $row['loginName']
  	);
  	// 往数组里面添加一条记录
  	array_push($list, $item);
  }

  var_dump($list);
  

?>
	<table>
		<tr>
			<td>id编号</td>
			<td>用户名</td>
			<td>登录名</td>
			<td>密码</td>
		</tr>
		<?php for($i = 0; $i < count($list); $i++) {?>
      <tr>
			  <td><?php echo $list[$i]['id']; ?></td>
			  <td><?php echo $list[$i]['username']; ?></td>
			  <td><?php echo $list[$i]['loginName']; ?></td>
			  <td><?php echo $list[$i]['password']; ?></td>
		  </tr>
		<?php }?>
	</table>
</body>
</html>