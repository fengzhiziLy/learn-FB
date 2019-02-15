<?php

	header("Content-Type:text/html;charset=utf-8");

	header("Refresh:10; url=http://www.baidu.com");

	echo "<span>10秒</span>之后跳转到百度，如果没有跳转，请点击<a href='http://www.baidu.com'>这里</a>"

?>

<script>
	window.onload = function () {
		var timer = 10;
		var ids = window.setInterval(function () {
			timer--;
			if (timer < 1) {
				window.clearInterval(ids);
				return;
			}
			document.querySelector('span').innerHTML = timer;
		}, 1000)
	}
</script>
