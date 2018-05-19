#!/usr/bin/php
<?php

session_start();

require 'settings.php';

if (isset($_SESSION["editorUUID"])) {
 

if (PHP_SAPI === 'cli') {
   $num2Keep = (isset($argv[2])) ? (int)$argv[2] : 5;
   $file = (isset($argv[1])) ? $argv[1] : null;
}
else {
    //$num2Keep = (isset($_GET['n'])) ? (int)$_GET['n'] : 5;
    if (isset($_GET['n'])) { $num2Keep = (int)$_GET['n']; }
    else { $num2Keep = 8; }
    
    $file = (isset($_GET['f'])) ? $_GET['f'] : null;

}

if ($file == null) { echo ("No file specified.\n"); exit(); }

echo ("Keeping last " . $num2Keep . " versions of " . $file . "\n");

// $data = "Testing 1234";
$fileList = array();

$vNum = 1;

$vFileName = $file;

while (file_exists($vFileName)) {

// echo($vNum);

  $fNameArray  = explode(".",$vFileName);
  $fe = array_pop($fNameArray);
  $vFileName = join("", $fNameArray);
  $fNameArray = explode("_v",$vFileName);
  if (sizeof($fNameArray) > 1) {
    $fv = array_pop($fNameArray);
    
    $vFileName = join("", $fNameArray);
  }
  
  
  $vFileName =  $vFileName . "_v" . $vNum . "." . $fe;
  
  array_push($fileList, $vFileName);
  
  $vNum++;
  
}

$vNum;

$num2Purge = $vNum - $num2Keep;

for ($l = 0; $l < $num2Purge; $l++) {
 
if(!unlink($fileList[$l])) echo ($fileList[$l] . " Not Deleted\n"); 

}

for ($l = 0; $l < $num2Keep; $l++) {
 
 
 echo ($fileList[$l + $num2Purge-1] . " : " .$fileList[$l] . "\n");
 
 $dt = filemtime($fileList[$l + $num2Purge-1]);
 
 rename($fileList[$l + $num2Purge-1], $fileList[$l]);
  
 touch($fileList[$l], $dt);
 
}

 
} else {
   echo("No Access!");
}
?>