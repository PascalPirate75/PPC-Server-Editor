<?php

require 'settings.php';

$pass = $_POST['pass'];

if ($pass == $masterkey) {
 
$file = $queList;
 
  if (file_exists($file)){ // Check to see if wanted file already exists
    $myfile = fopen($file, "r") or die("Unable to read file!");
    $data =  fread($myfile, filesize($file));  //If file does open it and send content
    echo $data;
    fclose($myfile);
    $myfile = fopen($file, "w") or die("Unable to clear file!");
    fclose($myfile);
    $file = $queListLog;
    $myfile = fopen($file, "a") or die("Unable to append log file!");
    fwrite($myfile, "\n" . $data);
    fclose($myfile);

  } else {
   
   echo ("NOFILES");  //If not creat it and send message
 
  }
 
} else {

  echo ("NOPASSWORD");

}

?>

