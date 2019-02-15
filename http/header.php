<?php

	header("Content-Type:text/html;charset=utf-8");
  // 获取客户端的请求头
  $arr = getallheaders();
  // var_dump($arr);

  $userAgent = $arr['User-Agent'];

  //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36

 	if (strstr($userAgent, "Chrome")) {
 		echo "当前使用的Google浏览器";
 	} else if (strstr($userAgent, "Firefox")) {
 		echo "当前使用的火狐浏览器";
 	} else {
 		echo "您当前使用的浏览器版本较低，请<a href='http://www.360.com'>升级</a>";
 	}

?>
