<?php

  header("Content-Type:text/xml;charset=utf-8");
  // 把user.txt文件的内容读取出来
  $data = file_get_contents("user.txt");
  echo $data;

?>