<?php 
  header("Content-Type:text/json;charset=utf-8");
  $con = mysql_connect("127.0.0.1", "root", "");
  if (!$con) {
    die('Could not connect: ' . mysql_error());
  }
  $sql = "select * from book";
  mysql_select_db("feng", $con);
  $result = mysql_query($sql);
  $list = array();
  while($row = mysql_fetch_array($result)) {
    $item = array(
      "id" => $row['id'],
      "bookName" => $row['bookName'],
      "author" => $row['author'],
      "price" => $row['price'],
      "cbs" => $row['cbs'],
      "operation" => "删除"
    );
    array_push($list, $item);
  }
  // php可以将一个关联数组直接转换成json格式
  $json = json_encode($list);
  echo $json;
?>