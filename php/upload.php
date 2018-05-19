<?php
echo 'Hello from upload.php! ';

require 'settings.php';

header('Content-Type: application/json');

$uploaded = array();

$dest = $_POST['dest'];
$pass = $_POST['pass'];

echo ("$dest = " . $dest);

// var_dump($_POST);
// var_dump($_FILES);

// if ($dest == "" || !file_exists($dest)) {$dest = $defDir;}
//echo $_POST['dest'];

// if ($pass == $masterkey) {
 

if(!empty($_FILES['file']['name'][0])) {
  
  //echo "The file(s) ";
  
  foreach($_FILES['file']['name'] as $position => $name) {
    
    if(move_uploaded_file($_FILES['file']['tmp_name'][$position], $dest . $name)) {
        $uploaded[] = array(
          'name' => $name,
          'file' => $dest . $name
           
        );
        
        chmod($dest . $name, 0666);
        //echo $name, " ";

    }
    
  }
  
          // echo($_SESSION["home"] . $dest . $name);

  //echo "were uploaded.";
  echo json_encode($uploaded);
} else { echo("empty"); }
// } else {
  
//   echo "Password is wrong - " . $pass;
// }