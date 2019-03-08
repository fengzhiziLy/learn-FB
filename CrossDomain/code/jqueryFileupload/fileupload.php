<?php
	
	$data = $_FILES;
	// var_dump($data);
	// 处理,文件保存在硬盘上
	$fileName = $data['lifephoto']['name'];
	$tmp = $data['lifephoto']['tmp_name'];

	move_uploaded_file($tmp, "./images/".$fileName);

	$url = "./images/".$fileName;
	$array = array("url" => $url);
	echo json_decode($array);

?>