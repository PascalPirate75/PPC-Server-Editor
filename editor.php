<?php

if($_SERVER["HTTPS"] != "on")
{
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}

session_start();


if (!isset($_SESSION["editorUUID"]) || $_SESSION["re_sub"] == "fish" || 
    !isset($_POST['key']) || !isset($_POST['id'])) {
     
  echo '<h1>Redirecting to Login..</h1>';
  echo '<script type="text/javascript">
           setTimeout(function(){window.location = "index.php";}, 1100);
      </script>';
  exit();
 
} else {
 
   $_SESSION["re_sub"] = "fish";
   $_SESSION["id"] = $_POST["id"];
   $_SESSION["key"] = hash('sha256',$_POST["key"]);
 
}


require("php/settings.php");


if ($_SESSION["key"] != $masterkey) {
  session_unset(); 
  session_destroy();
  echo '<h1>Redirecting to Login..</h1>';
  echo '<script type="text/javascript">
           setTimeout(function(){window.location = "index.php";}, 3100);
      </script>';
  exit();
}



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

  <link rel="stylesheet" type="text/css" href="gwcDialogue/gwcDialogue.css">
  <link rel="stylesheet" type="text/css" href="css/aceMenu.css">
  <link rel="stylesheet" type="text/css" href="css/main.css">


<!-- Script for ACE editor plugin first 2 if hosted, last 2 if local-->

<script src="https://ajaxorg.github.io/ace-builds/src/ace.js"></script>
<script src="https://ajaxorg.github.io/ace-builds/src/ext-modelist.js" type="text/javascript" charset="utf-8"></script>

<!--<script src="ace/ace.js"></script>-->
<!--<script src="ace/ext-modelist.js" type="text/javascript" charset="utf-8"></script>-->
  
<script>

//************************************************************  
//  
// Modigy setting in the php/settings.php file to match server
//
//************************************************************


var curUrl = "<?php echo ($curentUrl);?>";
var baseUrl = "<?php echo ($bottomUrl);?>";

var curDir = "<?php echo ($curentDir);?>";
var baseDir = "<?php echo ($bottomDir);?>";

var url_fPath = curUrl;  
var dir_fPath = curDir;

var fName = "<?php echo ($startFile);?>";

var searchURL = "<?php echo ($searchUrl);?>";

var passWord = "<?php echo ($_SESSION["key"]);?>"; 
 



 
</script>

<script src="gwcDialogue/gwcDialogue.js" defer></script>
<script src="js/main.js" defer></script>

<style>


</style>
  
</head>
<body>
  
  
  <div id="qwerightcontainer">  <!-- Right hidden area-->
   
    <div id="gweStatus">STATUS : </div>
    
    <div id="qwerightcontent"> <!-- The content on right hidden side -->
   
      <div style="margin-bottom:10px; margin-top:15px; width:100%">
      <input id="helpURL" style="width:77%" type="text" value=""> 
      <button style="float:right;" id="helpUrlBtn" title="Use this to do quick serches, leave blank and will search for information in hightlighted text from editor.">
       Help
      </button>
      </div>
      <!-- Embeded Calulator -->
      <iframe width="300" height="310" src="<?php echo ($calcURL);?>" scrolling="no" style="border: 1px solid black; font-size:10%;">
      </iframe>                 
     
       <div id="notesContainer">
          <textarea id="notes"></textarea>
       </div>
    </div>
    
    
    <div id="qwerightrightcontent">
     <div id="editormenu">

          <li id="HeamapS" class="dropdown mapS">
            <a href="javascript:void(0)" id="mapS" class="dropbtn">Server</a>
            <div class="dropdown-content">
              <div id="srvD"><div><table></table></div></div>
            </div>
          </li>
  
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Files</a>
            <div class="dropdown-content">
              <a id="new" href="javascript:void(0)" title="Create a new file.">New</a>
              
              <br>
              
              <a id="makeDir" href="javascript:void(0)" title="Make a folder in the current folder on server.">Make Dir</a>
              
              <a id="uploadFile" href="javascript:void(0)" title="Upload a file to the current folder on server.&#10; File size possibly limited by server!">Upload File</a>
              <!-- Holds the file selecter for upload stays hidden and is programmatically clicked -->
              <input id="uf" type="file" style="display: none" />
             
              <br>
              <a id="load" href="javascript:void(0)" title="Load file from server.">Load</a>
              <a id="loadLocal" href="javascript:void(0)" title="Load from local file system.">Open</a>
              <!-- Holds the file selecter for local load stays hidden and is programmatically clicked -->
              <input style="display:none" id="loadLocalFile" type="file"/>
              
              <a id="name" href="javascript:void(0)" title="Rename current file.">Rename</a>
              <a id="save" href="javascript:void(0)" title="Save file to server.">Save</a>
              <!--<a id="saveAll" href="javascript:void(0)" title="Save All file to server.">Save All</a>-->
              <a id="local" href="javascript:void(0)" title="Download a copy of current file from server.">Download</a>
              <a id="purge" href="javascript:void(0)" title="Close file.">Close</a>
            </div>
          </li>

          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Edit</a>
            <div class="dropdown-content">
              <a id="aceFind" href="javascript:void(0)" title="Find text in file. CTRL-f">Find</a>
              <a id="aceReplace" href="javascript:void(0)" title="Find and replace text in file. CTRL-h">Find/Replace</a>
              <a id="aceNext" href="javascript:void(0)" title="Find next instance.  CTRL-k">Next</a>
              <a id="aceComment" href="javascript:void(0)" title="Toggle comment on selected text. CTRL-/">Toggle Comment</a>
              <a id="aceCB" href="javascript:void(0)" title="Bookmark the curent position of cursor.">Set-Bookmark</a>
              <a id="aceCBP" href="javascript:void(0)" title="Goto previous cursor bookmark.">Prev-Bookmark</a>
              <a id="aceCBN" href="javascript:void(0)" title="Goto next cursor bookmark.">Next-Bookmark</a>
              <a id="aceDeleteCB" href="javascript:void(0)" title="Remove cursor bookmark at curent position in queue.">Delete-Bookmark</a>

            </div>
          </li>
        
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Settings</a>
            <div class="dropdown-content">
              <a id="tabSync" href="javascript:void(0)" title="Open new tab with this file.">Tab It</a>
              <a id="saveFS" href="javascript:void(0)" title="Save font size in borowser.">Save font size</a>
              <a id="aceSettings" href="javascript:void(0)" title="ACE Settings Menu.  CTRL-,">Preferences</a>
              
            </div>
          </li>
          
          <li class="dropdown" style="height:19px">
            <div class="namedFile">
              <a style="float:left; padding-left:10px; margin-top:3px" class="updownarrow" id="saveA" href="javascript:void(0)" title="Upload file to server.">&#10224;</a>
              <div style="float:left; padding-left:10px; padding-top:3px" id="Namedfile" title="">/somefile.php</div>
              <a style="float:left; padding-left:10px; margin-top:3px" class="updownarrow" id="localA" href="javascript:void(0)" title="Download a copy of current file from server.">&#10225;</a>
              <a id="spellCheck" href="javascript:void(0)" title="Send selected word to Dictionary.com">&#x2713;</a>
              
            </div>
          </li>
  
          <li class="dropdown"  id="tabs">
            <div id="tab1" class="tab">1</div>
            <div id="tab2" class="tab">2</div>
            <div id="tab3" class="tab">3</div>
            <div id="tab4" class="tab">4</div>
            <div id="tab5" class="tab">5</div>
            <div id="tab6" class="tab">6</div>
            <div id="tab7" class="tab">7</div>
            <div id="tab8" class="tab">8</div>
           
          </li>
  
      </div>
      <div id="codeeditordiv">
        <pre id="editor"></pre> <!-- Targeted editor area -->
      </div>
    </div>
  </div>

  <script>
  

  </script>
</body>
</html>