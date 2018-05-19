<?php

session_start();

// $searchUrl = "https://www.google.com/search?q=";

$calcURL = "/math/calc/";


if ($_SESSION["id"] == "guest") {
       $masterkey = "84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec"; //guest hashed sha256
       
       $curentUrl = "/guests/";  
       $bottomUrl = "/guests/";
       
       
       $startFile = "newTemplate.html";
       
       $curentDir = "/home/user/www/guests/";
       $bottomDir = "/home/user/www/guests/";
       
       $sPath = $curenttUrl;
       $fPath = $curenttUrl;  
       $fName = $startFile;
         
       $searchUrl = "https://duckduckgo.com/?q=";
       
       $NOfileRestrictions = FALSE;
       
       $OKfileTypes = array("GIF", "JPG", "PNG", "WAV", "MP3",
                            "LOG", "TXT", "DAT", "HTML", "JS", "CSS");

} else {
 
       $masterkey = "a;ksjdbaksjdbclkajsbdc;khhajsd";
 
}


function testFile4Save($f) {
   $s = explode('.',strtoupper($f));
   $t = end($s);
   
   if (!($GLOBALS['NOfileRestrictions'] || in_array($t, $GLOBALS['OKfileTypes']))) {
    
      echo("Invalid file type!");
      exit();
      
   }
}




?>