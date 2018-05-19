<?php

session_start();

require 'settings.php';

if (isset($_SESSION["editorUUID"]) &&  (strpos($_POST['path'], $bottomDir) === 0)) {
 

$name = $_POST['path'].$_POST['name'];


 if (mkdir($name)) {
      echo("DIRCREATED");
 } else {
      echo("FAIL");
 }

 
} else {
   echo("No Access!");
}
 

?>