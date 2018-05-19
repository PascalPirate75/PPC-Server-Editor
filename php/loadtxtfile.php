<?php

require 'settings.php';

$file = $_POST['file'];
$path = $_POST['path'];


if (strpos($path, $bottomDir) === 0) {
 $file = $path.$file;
 if (file_exists($file)){ // Check to see if wanted file already exists
    $myfile = fopen($file, "r") or die("Unable to read file! r");
    echo fread($myfile, filesize($file));  //If file does open it and send content

 } else {
    $myfile = fopen($file, "w") or die("Unable to read file! w");
    echo ("New file ready for work!");  //If not creat it and send message

 }
 
 fclose($myfile);

}

?>