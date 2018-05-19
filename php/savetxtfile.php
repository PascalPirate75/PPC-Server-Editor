<?php

session_start();

require 'settings.php';

if (isset($_SESSION["editorUUID"])) {

// $pass = base64_decode($_POST['pass']);

if (strpos($_POST['path'], $bottomDir) === 0) {


$file = $_POST['path'].$_POST['file'];
$data = base64_decode($_POST['data']);



testFile4Save($_POST['file']);


$vNum = 1;

$vFileName = $file;


while (file_exists($vFileName)) {

  $fNameArray  = explode(".",$vFileName);
  $fe = array_pop($fNameArray);
  $vFileName = join("", $fNameArray);
  $fNameArray = explode("_v",$vFileName);
  if (sizeof($fNameArray) > 1) {
    $fv = array_pop($fNameArray);
    
    $vFileName = join("", $fNameArray);
  }
  
  
  $vFileName =  $vFileName . "_v" . $vNum . "." . $fe;
  $vNum++;
  
}


$dt = filemtime($file);
 
rename($file, $vFileName);

touch($vFileName, $dt);
 
 


  
$myfile = fopen($file, "w") or die("Unable to open file! " . $file);

fwrite($myfile, $data);


fclose($myfile);

echo "SAVED";

} else {
  
  echo ("No Access!");
}

}

?>