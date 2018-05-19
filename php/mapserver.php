<?php

require 'settings.php';

$F = [];
$D = [];

// $pass=$_POST["pass"];


$dir=$_POST["dir"];

if (isset($_SESSION["editorUUID"]) && (strpos($dir, $bottomDir) === 0)) {
 
function getDirectoryTree( $outerDir){
    $dirs = array_diff( scandir( $outerDir ), Array( ".", ".." ) );
    $dir_array = Array();
    foreach( $dirs as $d ){
        if( is_dir($outerDir."/".$d)  ){
            $dir_array[ $d ] = "DIR";
        } else { $dir_array[ $d ] = "FLE";}
        
    }
    
    return $dir_array;
}
//echo var_dump (scandir( '/var/www' ));
$dirlist = getDirectoryTree($dir);
//krsort( $dirlist);
asort($dirlist);
$looperF= 1;
$looperD= 0;
$F[0]="***";
foreach( $dirlist as $d=>$d_value ) {

 
 if ( $d_value == "DIR") {
  //echo "<tr> <td class='dir'>" . $d ."</td></tr>";
  $D[$looperD] = $d;
  $looperD++;

 } else {
  //echo "<tr> <td class='file'>" . $d ."</td></tr>";
  $F[$looperF] = $d;
  $looperF++;

 }
}

natcasesort ($D);
natcasesort ($F);
if (count($D) < 1) {$D[0] = "NODIRS";}
if (count($F) < 2) {$F[1] = "NOFILES";}
$a = (array_merge($D,$F));

echo implode("@$@",$a);

} else {
 
 echo "NOPASSWORD";
 
}

?>