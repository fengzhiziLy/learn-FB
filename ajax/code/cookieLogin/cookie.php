<?php
	
	$username = $_GET['username'];

	setcookie("username", $username, time() + 60 * 60 * 24 * 7);

?>