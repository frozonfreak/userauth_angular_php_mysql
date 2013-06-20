<?php
	
class DB_Functions{
	
	//Database connection string
	private $db;

	function __construct(){
		require_once 'config.php';
	}

	//destructor
	function __destruct() {
		 
	}
	public function chkLoginInfo($email, $pass){
		try{
			$db = new PDO(DB_STRING, DB_USER, DB_PASSWORD);
			$sql = "SELECT count(*) FROM user WHERE email = ? AND pass = ?";
			$stmt = $db->prepare($sql);
			$stmt->execute(array($email, $pass));
			$number_of_rows = $stmt->fetchColumn();
			$db = null;
	
			//var_dump(json_encode($response));
			return $number_of_rows;
		}
		catch(Exception $e){
			return $e;
		}
	}
	
}
?>