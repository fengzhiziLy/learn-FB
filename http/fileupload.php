<?php
	header("Content-Type:text/html;charset=utf-8");
  // 文件上传需要做的一些处理
  // 接受请求
  $files = $_FILES;

  // 获取上传的文件名称
  $fileName = $files['lifephoto']['name'];

  // 获取文件上传的临时位置
  $tmp_name = $files['lifephoto']['tmp_name'];

  // 往images目录进行硬盘的存储
  move_uploaded_file($tmp_name, "images/".$fileName);

  echo "上传成功";

?>