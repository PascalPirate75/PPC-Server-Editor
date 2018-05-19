<?php
// Start the session
if($_SERVER["HTTPS"] != "on")
{
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}

session_start();


$_SESSION["editorUUID"] = uniqid();
$_SESSION["re_sub"] = "rat";



?>
<!DOCTYPE html>
<html>
 <head>
<link rel="icon" type="image/png" href="favicon.png">
  <meta charset="utf-8">
  <meta http-Equiv="Cache-Control" Content="no-cache" />
  <meta http-Equiv="Pragma" Content="no-cache" />
  <meta http-Equiv="Expires" Content="0" />
  <title>Pascal Pirate's Server Editor</title>
 <style>
  body {
color:white;
font-weight:600;
   height: 95%;
   width: 95%;
   background-image : url("loginbg.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
  }
  #loginDiv {
    background-color: black;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid gold;
    width: 340px;
   
    position: absolute;
    text-align: center;
    height: 120px;
    left: calc((100% - 360px) / 2);
    top: calc((100% - 120px) / 2);
  }
  
  strong {
    float: left;
    font-weight:700;
  }
  
  .inpUnit {
     height:20px;
     width:300px;
     margin:20px;
  }
  
  input {
    float:right;
  }
 </style>
 </head>
<body>
<div id="loginDiv">
<form id="logInFrm" method='POST' action='editor.php'> 

<div class="inpUnit">
<strong>Id :</strong>
<input id="logInId" text="text" value="" name="id" autofocus>
</div>

<div class="inpUnit">
<strong>Key :</strong>
<input id="logInKey" type="password" name="key" value="">
</div>

<div class="inpUnit">
<input type="submit" id="logInBtn" value="login">
</div>

</form>
</div>
 
<script>

function  startUpJS() {

    function submit() {

      var id = document.getElementById("logInId").value;
      var key = document.getElementById("logInKey").value;
      
      if (id === "" || key ==="") {
         document.getElementById("logInId").focus();
         return false;
      }
      
      var postData = {"id" : id,
                      "key" : key};
      
     document.getElementById("logInBtn").click(); 
    }
    
    
    document.getElementById("logInId").addEventListener("keypress", function( e ){  
      var code = e.keyCode || e.which;
      if(code == 13) { //Enter keycode
      
        e.preventDefault();
        document.getElementById("logInKey").focus();
   
      }
    });
    
    document.getElementById("logInKey").addEventListener("keypress", function( e ){  
      var code = e.keyCode || e.which;
      if(code == 13) { //Enter keycode
      
        e.preventDefault();
       
        submit();
      }
    });
     
    
    document.getElementById("logInBtn").addEventListener("click", function(){
     
      submit();

    });  
  
 }
 
 startUpJS();
 
 
</script>
</body>

</html>