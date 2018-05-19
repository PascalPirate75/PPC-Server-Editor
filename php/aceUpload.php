<?php
header('Content-Type: application/json');
session_start();

require 'settings.php';

if (isset($_SESSION["editorUUID"]) && (strpos($_POST['dest'], $bottomDir) === 0)) {



$uploaded = array();

$dest = $_POST['dest'];

 

if(!empty($_FILES['file']['name'][0])) {
 
 
 testFile4Save($_FILES['file']['name'][0]);
  
  
  foreach($_FILES['file']['name'] as $position => $name) {
    
    if(move_uploaded_file($_FILES['file']['tmp_name'][$position], $dest . $name)) {
        $uploaded[] = array(
          'name' => $name,
          'file' => $dest . $name
           
        );
        
        chmod($dest . $name, 0666);

    }
    
  }
  
  echo json_encode($uploaded);
} else { echo("empty"); }
} else {
 echo ("No Access!");
}
?>