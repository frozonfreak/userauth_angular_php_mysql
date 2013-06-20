<?php

	//Decode received JSON data
	$data = file_get_contents("php://input");
	$receivedData = json_decode($data);

	include_once 'db_function.php';
	$db = new DB_Functions();

	if(isset($receivedData->{"type"})){
		$response = '';
		switch ($receivedData->{"type"}) {
		    case 'Login':
		        if(isset($receivedData->{"email"}) && isset($receivedData->{"pass"})){
		        	$email 	= $receivedData->{"email"};
		        	$pass = $receivedData->{"pass"};
		        	

		        	$res = $db->chkLoginInfo($email, $pass);
		        	if($res == 1){
		        		session_start();
		        		$_SESSION['usrName']  = $email;
		        		$_SESSION['time']     = time();
		        		$response = array("status" => 1,"message"=> "Success");
		        	}
		        	else
		        		$response = array("status" => 0,"message"=> "Error");
		        }
		        else{
		        	$response = array("status" => 0,
	                      "message"=> "All fields needs to be set");
		        }
		        echo json_encode($response);
		    break;
		    case 'isLogged':
		    	if(isset($_SESSION))
		    		$response = array("status" => 1,"message"=> "Success");
		    	else
		    		$response = array("status" => 0,"message"=> "Error");
		    	echo json_encode($response);
		    break;
		    case 'Logout':
		    	if(isset($_SESSION)){
		    		session_destroy();
		    		$response = array("status" => 1,"message"=> "Success");
		    	}
		    	else
		    		$response = array("status" => 0,"message"=> "Error");
		    	echo json_encode($response);
		    break;
		}
	}
	else {

	    $response = array("status" => 0,
	                      "message"=> "Type Field not set");
	    echo json_encode($response);
	}
?>