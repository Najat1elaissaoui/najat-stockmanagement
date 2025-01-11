<?php

//Database_connection.php

class Database_connection
{
	function connect()
	{
		$connect = new PDO("mysql:host=localhost:3307; dbname=app_chat", "root", "");

		return $connect;
	}
}

?>