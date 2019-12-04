function z(s) { 
     // Used to target selectors and replace my use of jquery
     
       t = document.querySelectorAll(s);
       if (t.length == 1) {
         return t[0];
       } else {
         return t;
       }
     
    }

window.onload = function() {
 
 setUpGWC();  // loads the needed stuff for my dialogs
    
    var speedfactor = 700;  // used to time downloading multiple files from server
    var versions2Keep = 5;  // number of version to keep when purging files  
    // Load the autosaved notes in editor panels bottom left textarea from browser's local storage
    z("#notes").value = localStorage.getItem("notes"); 
    // Runs ones setting the first tab green on at startup
    z(".tab")[0].style.backgroundColor = "green"; 
    
    
    var mapCloseTimer;

/**************************************************************************************************
 **************************************************************************************************
 *
 * Needed initial varibles and general setup.
 *
 **************************************************************************************************
 *************************************************************************************************/
  //   not used but may want to re implement
  //   function getParameterByName(name, url) {  //  gets URL varibles
  //   if (!url) {
  //     url = window.location.href;
  //   }
  //   name = name.replace(/[\[\]]/g, "\\$&");
  //   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  //       results = regex.exec(url);
  //   if (!results) return null;
  //   if (!results[2]) return '';
  //   return decodeURIComponent(results[2].replace(/\+/g, " "));
  // }
  
  function updatePath(p) {
   // used to update all nessasary var when path changes
   
     if (p == -1) {
      
      if (curDir > baseDir) { // && curUrl_fPath.length > 1) {
      curUrl = curUrl.substring(0, curUrl.length - 1);
      curUrl = curUrl.substring(0, curUrl.lastIndexOf("/")+1);
      
      curDir = curDir.substring(0, curDir.length - 1);
      curDir = curDir.substring(0, curDir.lastIndexOf("/")+1);
  
      } else {
       return false;
      }
           
     } else {
      curUrl += (p+"/");
      curDir += (p+"/");

     }
     return true;
  }
  
  
  function alertOutStatus(m, t) {
   // send message to the status indicator above the calculator waits then clears it
   
    if (t === undefined) t = 4000;
    
    z("#gweStatus").innerHTML = ("STATUS : " + m);
    setTimeout(function(){
       z("#gweStatus").innerHTML = ("STATUS :");
    }, t);
  }
   
   z("#notes").addEventListener('blur', function(){ 
    // After making changes to the note pad at bottom of screen saves it when looses focus
    
      localStorage.setItem("notes", z("#notes").value);
   });
   

    function setTabTitle2FileName(p, t) {
     // Function to add file name to title of tab
     
      if (t === undefined) {t = url_fPath+fName;}
      z(".tab")[p].title = t;
    }
    
    z("#loadLocal").addEventListener('click', function(e){  
     // programaticly clicks the hidden load files when menu open is clicked

       e.preventDefault();
       z("#loadLocalFile").click();
    });
             
               
 function handleFileSelect(evt) { // Function that is triggerd then loads the local file into ACE editor
     var file = evt.target.files[0];

       var localFile = new FileReader();

       // Closure to capture the file information.
       localFile.onload = (function(theFile) {

         return function(e) {
           editor.setValue(e.target.result, -1);
           fName = theFile.name;
           setACEmode();
           injectFileInMenu();
         };

       })(file);
       localFile.readAsText(file);
  }
 

 z('#loadLocalFile').addEventListener("change", handleFileSelect);
 
 


z(".tab").forEach(tabClickListener);
function tabClickListener(item, index) {item.addEventListener("click", tabClickAction);}
function tabClickAction(event)  {  
// Listener and handler for switching file from tab storage to editor.

// this need redone

/*

Move editor to tab curent tab

*/
    if (editor.getValue() !== "") {   
    // Listener and handler for switching file from tab storage to editor.
    
/*

Move editor to tab curent tab

*/

      z(".tab")[tabbedFiles.tabPointer].style.backgroundColor = "gold";
      z(".tab")[tabbedFiles.tabPointer].style.color = "black";

      tabbedFiles.Text[tabbedFiles.tabPointer] = editor.getValue();
      tabbedFiles.LastSaveState[tabbedFiles.tabPointer] = fileLastSave;
      tabbedFiles.urlPath[tabbedFiles.tabPointer] = url_fPath;
      tabbedFiles.dirPath[tabbedFiles.tabPointer] = dir_fPath;
      tabbedFiles.Name[tabbedFiles.tabPointer] = fName;
      
      tabbedFiles.UR[tabbedFiles.tabPointer] = editor.session.getUndoManager();
      tabbedFiles.Pos[tabbedFiles.tabPointer] = editor.getCursorPosition();
      setTabTitle2FileName(tabbedFiles.tabPointer);
      
    } else {  // if editor is empty
      // tabbedFiles.Text[tabbedFiles.tabPointer] = editor.getValue(); // why not ""?
      z(".tab")[tabbedFiles.tabPointer].style.backgroundColor = "transparent";
      z(".tab")[tabbedFiles.tabPointer].style.color = "gold";
      
    }
  
// change tab index to new tab takes tab number-1 and uses it for index 
    tabbedFiles.tabPointer = parseInt(event.target.innerHTML) - 1;  
 

/*    
  
put stuff from clicked tab into editor    
    
*/    
    editor.setValue("", -1); // clear the editor so can have a fresh start

    if (tabbedFiles.UR[tabbedFiles.tabPointer] === "") {  
      // if array index is not already an ace.UndoManager then make it one
      tabbedFiles.UR[tabbedFiles.tabPointer] = new ace.UndoManager();
      tabbedFiles.Pos[tabbedFiles.tabPointer] = {row: 1, column: 1};
    }
    editor.session.setUndoManager(tabbedFiles.UR[tabbedFiles.tabPointer]);
    editor.session.getUndoManager().undo(); 
    // th^s keeps undo from going to far back and pasting 2nd copy of doc into the doc
   
    fileLastSave = tabbedFiles.LastSaveState[tabbedFiles.tabPointer];
    
    if (tabbedFiles.urlPath[tabbedFiles.tabPointer] !== "") {
       url_fPath = tabbedFiles.urlPath[tabbedFiles.tabPointer];
       dir_fPath = tabbedFiles.dirPath[tabbedFiles.tabPointer];

    }
    
    fName = tabbedFiles.Name[tabbedFiles.tabPointer];
    event.target.style.backgroundColor = "green";
    event.target.style.color = "white";
    editor.focus();
    editor.renderer.scrollCursorIntoView(tabbedFiles.Pos[tabbedFiles.tabPointer], 0.5);
    editor.moveCursorToPosition(tabbedFiles.Pos[tabbedFiles.tabPointer]);
    editor.clearSelection();
    injectFileInMenu();
    setACEmode();
 }
 
  function helpWork(){  
   //  Handels the work from the two lintenser below opens terms in desired search
   //  search or goes to url is begins with http will use highlighted text empty

    var url = z("#helpURL").value;
    
    if (url === "") {
       url = searchURL + editor.getSelectedText();
    }
     
    if (url.indexOf("http") !== 0) {url = searchURL + url; }
    
    window.open(url);

  }
    
  z("#helpURL").addEventListener("keypress", function(e){  
   // Listens for enterkey in inputbox above calculator  

   var code = e.keyCode || e.which;
   if(code == 13) { //Enter keycode
     e.preventDefault();
     helpWork();
   }
  });
  
  z("#helpUrlBtn").addEventListener("click", function() {  
   // Listens for click on Help button above calculator

      helpWork();
  });
    
    
/********************************************************************************************************************
 ********************************************************************************************************************
 *
 * ACE editor Methods and Event Listeners
 *
 ********************************************************************************************************************
 *******************************************************************************************************************/

  // Needed setup for ACE editor
    
  tabbedFiles = {"BMsIndex" : [-1, -1, -1, -1, -1, -1, -1, -1],    
                      "BMs" : [[], [], [], [], [], [], [], []],     
                      "Pos" : ["", "", "", "", "", "", "", ""],
                       "UR" : ["", "", "", "", "", "", "", ""],    // holds undo redo Manager data
                  "urlPath" : ["", "", "", "", "", "", "", ""],
                  "dirPath" : ["", "", "", "", "", "", "", ""],  
                     "Name" : ["", "", "", "", "", "", "", ""],
            "LastSaveState" : ["", "", "", "", "", "", "", ""],
                     "Text" : ["", "", "", "", "", "", "", ""],
               "tabPointer" : 0};
  
  fileLastSave = "";
  editor = ace.edit("editor");
  editor.blockScrolling = Infinity; //// ?
  editor.setTheme("ace/theme/terminal");
  editor.session.setMode("ace/mode/html");
  editor.getSession().setTabSize(1);
  editor.setValue("New File!");
  editor.clearSelection();
  editor.setShowPrintMargin(false);
  editor.getSession().setUseWrapMode(true);
  editor.session.setUndoManager(new ace.UndoManager());
  tabbedFiles.UR[tabbedFiles.tabPointer] = new ace.UndoManager();

  loadfile(fName);
  
  editor.setFontSize(Number(localStorage.getItem("fontSize")) || 16);

  z("#aceCB").addEventListener("click", function(){  
   // Handler adds Cursor bookmark
   
     tabbedFiles.BMs[tabbedFiles.tabPointer].push(editor.getCursorPosition());
     tabbedFiles.BMsIndex[tabbedFiles.tabPointer] = tabbedFiles.BMs[tabbedFiles.tabPointer].length - 1;

  });
  
  z("#aceCBP").addEventListener("click", function(){
   // Handler goto previous Cursor bookmark
   
     if (tabbedFiles.BMs[tabbedFiles.tabPointer].length === 0) { 
      return false;
     }

     if (tabbedFiles.BMsIndex[tabbedFiles.tabPointer] < 1) {
      tabbedFiles.BMsIndex[tabbedFiles.tabPointer] = tabbedFiles.BMs[tabbedFiles.tabPointer].length - 1;
     } else {
      tabbedFiles.BMsIndex[tabbedFiles.tabPointer]--;
     }
     
     editor.focus();

     editor.renderer.scrollCursorIntoView(tabbedFiles.BMs[tabbedFiles.tabPointer][tabbedFiles.BMsIndex[tabbedFiles.tabPointer]], 0.5);
     editor.moveCursorToPosition(tabbedFiles.BMs[tabbedFiles.tabPointer][tabbedFiles.BMsIndex[tabbedFiles.tabPointer]]);

     editor.clearSelection();
   
  });
  
  z("#aceCBN").addEventListener("click", function(){  
   // Handler goto next Cursor bookmark
   
     if (tabbedFiles.BMs[tabbedFiles.tabPointer].length === 0) { 
       return false;
     }
   
     if (tabbedFiles.BMsIndex[tabbedFiles.tabPointer] == tabbedFiles.BMs[tabbedFiles.tabPointer].length - 1) {
      tabbedFiles.BMsIndex[tabbedFiles.tabPointer] = 0;
     } else {
      tabbedFiles.BMsIndex[tabbedFiles.tabPointer]++;
     }
     
     editor.focus();

     editor.renderer.scrollCursorIntoView(tabbedFiles.BMs[tabbedFiles.tabPointer][tabbedFiles.BMsIndex[tabbedFiles.tabPointer]], 0.5);

     editor.moveCursorToPosition(tabbedFiles.BMs[tabbedFiles.tabPointer][tabbedFiles.BMsIndex[tabbedFiles.tabPointer]]);

     editor.clearSelection();
  });
  
  z("#aceDeleteCB").addEventListener("click", function(){  
   // Handler delete curent Cursor bookmark
   
     if (tabbedFiles.BMsIndex[tabbedFiles.tabPointer] > -1) {
       tabbedFiles.BMs[tabbedFiles.tabPointer].splice(tabbedFiles.BMsIndex[tabbedFiles.tabPointer], 1);
       tabbedFiles.BMsIndex[tabbedFiles.tabPointer]--;
     }
  });
    
    
  z("#saveFS").addEventListener("click", function(){  
   // Handler ACE editor settings, save font size
   /*
   *
   *  shoud change this and save all settings.
   *
   */
    localStorage.setItem("fontSize", editor.getFontSize());
    
  });
    
  z("#spellCheck").addEventListener("click", function(){  
   //Handler for check icon in ACE editor menu-spellchecker uses highlighted text
    hStr = editor.getSelectedText();
    
    if (hStr.indexOf(" ") > -1) { // if multiple words open textarea for browser handeled spelling correction
     z("#spellCheckerDiv").style.display = "initial";
     z("#spellCheckerText").value = hStr.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/ +/g, ' ').trim();
     z("#spellCheckerText").focus();
    }
    else window.open("http://www.dictionary.com/browse/" + hStr);
  });
  
  z("#noSubmitText").addEventListener("click", function(){  
   // button listener for closing spelling textarea
    z("#spellCheckerDiv").style.display = "none";
    z("#spellCheckerText").value = "";
  });
  
   z("#submitText").addEventListener("click", function(){  
    // insert "corected" words in place of checked words
     tempStr = z("#spellCheckerText").value; 
     document.execCommand('delete');
     editor.insert(tempStr);
     z("#spellCheckerText").value = "";
     z("#spellCheckerDiv").style.display = "none";
     editor.focus();
  });
  

  z("#aceFind").addEventListener("click", function(){ 
   // ACE editor menu Edit / Find same as "Ctrl-f"
   
     editor.execCommand("find");
  });
  
  z("#aceReplace").addEventListener("click", function(){  
   // ACE editor menu Edit / Find then Replace same as "Ctrl-h"
   
     editor.execCommand("replace");
  });
  
  z("#aceNext").addEventListener("click", function(){  
   // ACE editor menu Edit / Find next same as "Ctrl-k"
   
     editor.findNext();
  });
  
  z("#aceComment").addEventListener("click", function(){  
   // ACE editor menu Edit / Toggle the coments same as "Ctrl-/""
   
     editor.toggleCommentLines();
  });
  
  z("#aceSettings").addEventListener("click", function(){  
   // ACE editor menu Settings Prefrence opens settings menu on right same as "Ctrl-,"
   
     editor.execCommand("showSettingsMenu");
  });

  function cleanString(data) {
   //
   // Used to clean string add code as nesasary .trim() can be used. 
   //
  
    return data.trim();
  }

    var curLoadingDir = false;
    

    function loadDir(d) { 
     // load a directory worth of information into the server map on ACE menue bar

      if (curLoadingDir) {curLoadingDir = true; return false;}

      z("#srvD table tbody").innerHTML = "";
      if (curDir.length > baseDir.length) {
        z("#srvD table tbody").insertAdjacentHTML("beforeend", '<tr><td class="preT">PARENT</td></tr>');
      }

      var formData = new FormData();
      
      formData.append('dir', d);

      xhr = new XMLHttpRequest();
      xhr.open("post", "php/mapserver.php");
      xhr.send(formData);
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          data = cleanString(xhr.responseText);
          if (data == "NOPASSWORD") {
            z("#srvD").style.display = "none";
            z("#mapS").style.backgroundColor = "#333333";
            z("#mapS").style.color = "white";
            return false;
          }
          items = data.split("@$@");
          x = 0;
          if (items[x] != "NODIRS") {
            while (items[x] != "***") {
              z("#srvD table tbody").insertAdjacentHTML("beforeend", '<tr><td class="dirT" title="' + curDir + items[x] + '/">' + items[x] + '</td></tr>');
              x++;
            }
          } else {x++;}
          x++;
          if (x < items.length && items[x] != "NOFILES") {
            for (x = x; x < items.length; x++) {
              z("#srvD table tbody").insertAdjacentHTML("beforeend", '<tr><td class="fileT" title="' + curDir + items[x] + '">' + items[x] + '</td></tr>');
            }
          }
        } else {}
        curLoadingDir = false;
      }
      xhr.onerror = function() {
        alert("Possible Network Error!");
        alertOutStatus("Possible Network Error!");
      }
      z("#mapS").title = curDir;
      z("#srvD").style.display = "initial";

    }
    

    z("#mapS").addEventListener("mouseover", function(){  
     // If mouse is over server file map then keep open
        
       clearTimeout(mapCloseTimer);
       // console.log("stopping timer");
        
       if (z("#srvD table").textContent == "") {
         loadDir(curDir);
       }
       z("#mapS").style.backgroundColor = "#333333";
       z("#mapS").style.color = "white";
       // z("#srvD").style.display = "initial";
       z(".dropdown-content")[0].style.display = "block";
       
    });
    
  
    z("#mapS").addEventListener("click", function(){
     // When "Server" and the ACE menu is clicked it loads the curent directory
     
       loadDir(curDir);
       z(".dropdown-content")[0].style.display = "block";

    });
  
    z("#HeamapS").addEventListener("mouseleave", function(){  
     // If mouse leaves server file map then close box
     /*
     *
     *
     *  function needs for hate that is closes when reloadeing most times.
     *
     */
       mapCloseTimer = setTimeout(function() {
        // console.log("leaving map");
         // z("#srvD").style.display = "none";
         z("#mapS").style.backgroundColor = "#333333";
         z("#mapS").style.color = "white";
         z(".dropdown-content")[0].style.display = "none";

       }, 250);
       
    });
   
    
    z("#srvD").addEventListener("contextmenu", function(event){
     // lisens for click in server map on the ACE menu and decides what to do
     c = event.target.classList; 
          // console.log(event.target);

     if (c[0] == "fileT"){
      // console.log("File! - " + event.target.textContent);
      fileClicked(event, true);
      
     } 
     
     // else if (c[0] == "dirT") {
     //  // console.log("Sub folder! - " + event.target.textContent);
     //  goIntoSubDir(event);
      
     // } else if (c[0] == "preT") {
     //  // console.log("Parent folder!");
     //  comeOutDir(event);
      
     // }
     event.preventDefault();
    }, false);
    
    z("#srvD").addEventListener("click", function(event){
     // lisens for click in server map on the ACE menu and decides what to do
     c = event.target.classList; 
          // console.log(event.target);

     if (c[0] == "fileT"){
      // console.log("File! - " + event.target.textContent);
      fileClicked(event);
      
     } else if (c[0] == "dirT") {
      // console.log("Sub folder! - " + event.target.textContent);
      goIntoSubDir(event);
      
     } else if (c[0] == "preT") {
      // console.log("Parent folder!");
      comeOutDir(event);
      
     }
     event.preventDefault();
    }, false);
    
  
      
    function comeOutDir(e) {
     // function if parent folder clicked on in the server map on the ACE menu
     
        updatePath(-1);
        loadDir(curDir);
        // injectFileInMenu();
    }
                                               
    function goIntoSubDir(e) {
     // function if file folder clicked on in the server map on the ACE menu
     
       if(e.ctrlKey) {
         //Ctrl+Click
         alert("Ctrl + mouse click - on dir?");
         return true;
       }
       
       dir = e.target.textContent.trim();
       updatePath(dir);
       loadDir(curDir);
       // injectFileInMenu();
    }
    
    function SimpleFileDownload(p, f, sizeb, i) {  
     // Does the downloading for files that are not editable the
     /*
     *
     *  this function could stand a redo
     *
     */
      setTimeout(function(){
        window.location.href="php/download.php?filepath=" + p + "&filename=" + f;
      }, Math.ceil((sizeb/speedfactor) + (1000 * i)));
      // large files may not finish make timeout longer if bigger files
    }
    
    var editableFileTypes = ["dat", "json", "html", "php", "js", "css", "py", "htmlfrag", "sh", "log", "lst", "txt"];
    
    
      var selectedFile = "";
      
      

      function fileClicked(e, rightClick = false) {
       // function run if file clicked on a file in the server map on the ACE menu
                                                  
      file = e.target.textContent.trim();                                            
      if(e.ctrlKey || rightClick) {  // do this if file name clicked while holding ctrl key
       
       selectedFile = file;
       
       z("#fileJobHelp").style.display = "block";  // open help box with file options
       z("#fileJobHelpFileName").innerHTML = file;
       
       document.addEventListener("keypress", function myfun(e){ // listen for key press the do the task
        
          var job = String.fromCharCode(e.which).toUpperCase();
        
          if (job == "P") {  // purge file
               var cnt = 0;
               if (parseInt(z("#helpURL").value) != "NaN") { cnt = parseInt(z("#helpURL").value); }
               else { cnt = versions2Keep; }
               alertOutStatus("Purging files.");
               var xhr = new XMLHttpRequest();
               xhr.onreadystatechange=function() {
                 if (this.readyState == 4 && this.status == 200) {
                   alertOutStatus("Purge successes.");
                   loadDir(curDir);
                 }
               }
               xhr.onerror = function() {
                 alert("Possible Network Error!");
                 alertOutStatus("Possible Network Error!");
               }
               
               xhr.open("GET", "php/purge.php?f=" + curDir + "/" + file + "&n=" + cnt, true);
               xhr.send();
            
          } else if (job == "D") {  // delete file
           
               
               if (confirm("Are you sure you want to delete file, " + curDir + "/" + file + "?")) { 
                
               alertOutStatus("Deleting file.");
               var xhr = new XMLHttpRequest();
               xhr.onreadystatechange=function() {
                 if (this.readyState == 4 && this.status == 200) {
                   alertOutStatus("Delete successes.");
                   loadDir(curDir);
                 }
               }
               xhr.onerror = function() {
                 alertOutStatus("Possible Network Error!");
               }
               
               xhr.open("GET", "php/delFile.php?f=" + curDir + "/" + file, true);
               xhr.send();           
           
               } else alertOutStatus("Cancel, doing nothing to file!");
           
          }  else if (job == "C") {  //  stop listening do nothing
           
             alertOutStatus("Cancel, doing nothing to file!");
           
          } else {  // complain about not getting a input that it reconizes
             
             alertOutStatus("Unknown command!");
             
          }
        
          document.removeEventListener("keypress", myfun, true); // after key pressed quit listening no matter key pressed
          
          z("#fileJobHelp").style.display = "none";  // hide key command help

        
       }, true);
       
       return true;  // do nothing

      }
      
      if (fileLastSave != editor.getValue()) {
       
         gwcDialogue("Save file first!", "OK");

      } else {
         z("#gweStatus").textContent ="STATUS : Loading file..";
         
         file = file.replace(/(\r\n|\n|\r)/gm,""); // forgot what this is for..
         parts = file.split(".");
         ext = parts[1];
         if (editableFileTypes.indexOf(ext) > -1 && !e.shiftKey) { // if file is editable edit it
             loadfile(file);  
             console.log("openging file for loading..", file);
           } else {  // download file if it not editable
         
             SimpleFileDownload(curDir, file, 10, 0);
         
           }
        }
    }
    
 
    
    z("#tabSync").addEventListener("click", function(){ 
     // Load file from ACE into new browser tab
     
        window.open('http://' + window.location.host + curUrl + fName, '_blank');

    });
    
    
    z("#purge").addEventListener("click", function(){ 
     // Empty ACEtabbedFiles.LastSaveState[tabbedFiles.tabPointer]

       function purge(){
 
         fName = "";
         injectFileInMenu();
         editor.setValue("");
         fileLastSave = "";
         setTabTitle2FileName(tabbedFiles.tabPointer, "");
         z(".tab")[tabbedFiles.tabPointer].style.backgroundColor = "transparent";
         tabbedFiles.BMsIndex[tabbedFiles.tabPointer] = "";
         tabbedFiles.BMs[tabbedFiles.tabPointer] = "";
         tabbedFiles.Pos[tabbedFiles.tabPointer] = "";
         tabbedFiles.UR[tabbedFiles.tabPointer] = "";
         tabbedFiles.urlPath[tabbedFiles.tabPointer] = "";
         tabbedFiles.dirPath[tabbedFiles.tabPointer] = "";
         tabbedFiles.Name[tabbedFiles.tabPointer] = "";
         tabbedFiles.LastSaveState[tabbedFiles.tabPointer] = "";
         tabbedFiles.Text[tabbedFiles.tabPointer] = "";
         alertOutStatus("File closed.");

       }

      if (fileLastSave == editor.getValue()) {
        purge();
      } else {
       
        gwcDialogue("Save file first!", "YESNO", function(a){
         
            // console.log(a);
            if (a == "YES") {gwcDialogue("Rename curent file.", "RESP", function(m){
             alertOutStatus("Saving/Closing tab.");
             setfilename(url_fPath + m, sendFile2Server);
             setTimeout(function(){
               if (fileLastSave == editor.getValue()) {
                 purge();
                 alertOutStatus("File closed.");
               } else {
                 alertOutStatus("Timeout error.");
               }
             }, 2000);
            });
            } else if (a == "NO") {
              purge();
          
            } else { 

            }
            
        });
      }
    });
    
   
    function injectFileInMenu() { 
     // Puts the name of the current file on the ACE menue bar
     
      z("#Namedfile").innerHTML = "<div class='light'>File name : </div><div class='dark'>&nbsp;/" + 
                                   fName + "</div>";
      z("#Namedfile").title = dir_fPath + fName;
    }
    
    
    function setfilename(m, callback) { 
     // Function to name or rename curent file in ACE
    
      if (m == "" || m == "CANCEL") {return false;}
     
        fName = m;
        injectFileInMenu();
        setACEmode();
        setTabTitle2FileName(tabbedFiles.tabPointer);
        tabbedFiles.urlPath[tabbedFiles.tabPointer] = url_fPath;
        tabbedFiles.dirPath[tabbedFiles.tabPointer] = dir_fPath;
        tabbedFiles.Name[tabbedFiles.tabPointer] = fName;

      if (callback !== undefined) {
        callback();
      }
    }
    
    
    function setACEmode() {
     // Used set ACE mode/syntax hightlighting based on file extention
     
      var modelist = ace.require("ace/ext/modelist");
      var mode = modelist.getModeForPath(fName).mode;
      editor.session.setMode(mode);
    }
    
    function createDir(m) { 
     // Used to creat a directory in the current directory on server

        z("#gweStatus").textContent = "STATUS : Creating directory.";
        var formData = new FormData();
       
        formData.append('path', curDir)
        formData.append('name', m);
      
        xhr = new XMLHttpRequest();
        xhr.open("post", "php/createdir.php");
        xhr.send(formData);
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            data = cleanString(xhr.responseText);
            if (data == "DIRCREATED") {
               alertOutStatus("Directory was created.");
            } else {
               alertOutStatus("Directory creation failed.");
            }
          } else {
            alertOutStatus("Directory creation failed.");
          }
        }
        xhr.onerror = function() {
          alert("Possible Network Error!");
          alertOutStatus("Possible Network Error!");
        }
     
    }
    
    function loadfile(m) { 
     // Load a file into ACE from server
      setfilename(m, function(){
        z("#gweStatus").textContent = "STATUS : Loading file.";
        var formData = new FormData();
       
        url_fPath = curUrl;
        dir_fPath = curDir;
        formData.append('path', curDir)
        formData.append('file', fName);
  
        xhr = new XMLHttpRequest();
        xhr.open("post", "php/loadtxtfile.php");
        xhr.send(formData);
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            data = cleanString(xhr.responseText);
            
            if (data == "Invalid file type!") {
              fName = "";
              alertOutStatus("Invalid file type!");
              alert("File not opend.  You don not have write access to the server for this file type.");
           
            } else {
            
              editor.setValue(data, -1);
              fileLastSave = editor.getValue();
              tabbedFiles.LastSaveState[tabbedFiles.tabPointer] = fileLastSave;
              tabbedFiles.Text[tabbedFiles.tabPointer] = fileLastSave;
              editor.session.setUndoManager(new ace.UndoManager());
              tabbedFiles.UR[tabbedFiles.tabPointer] = new ace.UndoManager(); 
             
              editor.clearSelection();
              setTabTitle2FileName(tabbedFiles.tabPointer);
              
              
              alertOutStatus("File loaded.");
              
            }
            
            injectFileInMenu();
          } else {
            alertOutStatus("File did not load!");
          }
        }
        xhr.onerror = function() {
          alert("Possible Network Error!");
          alertOutStatus("Possible Network Error!");
        }
        
      });
      
    }
    
    
    function sendFile2Server(saveHereFlag = false) { 
     // Used to save the file in ACE to server
     
      z("#gweStatus").textContent = "STATUS : Saving file.";
      var formData = new FormData();
      
      xhr = new XMLHttpRequest();

      if (saveHereFlag) {
          alert("Moved curent file to " + curUrl + ".");
          url_fPath = curUrl;
          dir_fPath = curDir;
          setTabTitle2FileName(tabbedFiles.tabPointer);
          injectFileInMenu();
      }
      
      formData.append('file', fName);
      formData.append('path', dir_fPath)
      formData.append('data', window.btoa(editor.getValue()));
      
      xhr.open('post', 'php/savetxtfile.php', true);

      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          data = xhr.responseText;
          data = cleanString(xhr.responseText);
          if (data == "SAVED") {
            fileLastSave = editor.getValue();
            tabbedFiles.LastSaveState[tabbedFiles.tabPointer] = fileLastSave;
            tabbedFiles.Text[tabbedFiles.tabPointer] = fileLastSave;
            alertOutStatus("File saved.");
          
          } else if (data == "Invalid file type!") {
           
              alertOutStatus("Invalid file type!");
              alert("File not saved.  You don not have write access to the server for this file type.");
           
          } else {
           
              alertOutStatus("File save failed!");
           
          }
        }
      }
      xhr.onerror = function() {
        alert("Possible Network Error!");
        alertOutStatus("Possible Network Error!");
      }

    }
    
    function downloadFileFromServer() {  // Saves file in ACE to server then Downloads a 
                                         // copy to the local filesystem
      z("#gweStatus").textContent = "STATUS : Downloading file.";
      var formData = new FormData();
      xhr = new XMLHttpRequest();
      
      formData.append('file', curDir);
      formData.append('data', editor.getValue());
      
      xhr.open('post', 'php/savetxtfile.php');
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          window.location.href="php/download.php?filepath=" + curDir + "/&filename=" + fName;
          fileLastSave = editor.getValue();
          tabbedFiles.LastSaveState[tabbedFiles.tabPointer] = fileLastSave;
          tabbedFiles.Text[tabbedFiles.tabPointer] = fileLastSave;
          alertOutStatus("File downloaded.");
        } else {
          alertOutStatus("Download failed!");
        }
      }
      xhr.onerror = function() {
        alert("Possible Network Error!");
        alertOutStatus("Possible Network Error!");
      }     

    };
    
    
    z("#new").addEventListener("click", function(){  
     // setsup a new file in ACE
      
      if (fileLastSave == editor.getValue()) {
        
        gDboxInputDTXT = fName;
        gwcDialogue("Name of new file.  If file exists then will load!", "RESP", loadfile);
 
      } else {
        gwcDialogue("Save file first!", "OK");
      }
      
    });
    
    
    z("#name").addEventListener("click", function(){ 
     // Used to start the renameing process uses my Dialog
      
      gDboxInputDTXT = fName;
      gwcDialogue("Rename curent file.", "RESP", setfilename);
      fileLastSave = "";
      
    });
    
    z("#makeDir").addEventListener("click", function(){ 
     // Used to start the diretory creation process uses my Dialog
      
      gDboxInputDTXT = "";
      gwcDialogue("Creat folder named.", "RESP", createDir);

    });    
    
   function aceUpload(files) {
    
      var formData = new FormData(),
          xhr = new XMLHttpRequest(),
          x;

      alertOutStatus("Attempting file upload.");
      formData.append('dest', curDir);

      for(x = 0; x < files.length; x = x +1) {
        formData.append('file[]', files[x]);
      }
      
      
      xhr.onload = function() {
        var data = this.responseText;
      };
      
      
      xhr.open('post', 'php/aceUpload.php');
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          msg = xhr.responseText;
          if (msg == "Invalid file type!") {
             alertOutStatus(msg);
           
          } else {
             alertOutStatus("Maybe file uploaded?");
             
          }
        } else {
           alertOutStatus("File upload Failed!");
         
        }
      };
  }


z("#uploadFile").addEventListener("click", function(){ 
 // Used to open file select Dialog to add file to hidden container
  
  z("#uf").click();
  
}); 

z("#uf").addEventListener("change", function(files){
 // Used to trigger upload it file is added to the hidden container
 
  var fileSelect = document.getElementById('uf');
  aceUpload(fileSelect.files);
  
});

z("#load").addEventListener("click", function(){  
 // Used to start the opening a file from OS uses my Dialog
  
  if (fileLastSave == editor.getValue()) {
     gDboxInputDTXT = fName;//url_fPath+
     gwcDialogue("Name of file to load from server.", "RESP", loadfile);
  } else {
     gwcDialogue("Save file first!", "OK");
  }
  
});

z("#localA").addEventListener("click", function(){  
 // This and the one below initiates Download one on the bar in the the File menue 
  downloadFileFromServer();

});


z("#local").addEventListener("click", function(){

  downloadFileFromServer();
  
});

z("#saveA").addEventListener("click", function(){  
// This and the one below initiates save to server one on the bar and one in the the File menue
  
  sendFile2Server();
  
});

z("#save").addEventListener("click", function(){
  
  sendFile2Server();
  
});

z("#saveHere").addEventListener("click", function(){
 
  sendFile2Server(true);
 
});
    
    
// $("#saveAll").on("click", function(){
 
//    tabbedFiles.urlPath[tabbedFiles.tabPointer] = curDir;
//    tabbedFiles.Name[tabbedFiles.tabPointer] = fName;
//    tabbedFiles.Text[tabbedFiles.tabPointer] = editor.getValue();

//    saveAllFiles(0, 7, 0);
//    //alert("write function to loop through all tabs and save them!");
 
// });
    

       
// function saveAllFiles(i, max, uD) { // Used to save the file in ACE to server
      
//     if (tabbedFiles.Name[i] != "") {
//       alertOutStatus("Saving tab #" + (i + 1));
//       var formData = new FormData();
      
//       xhr = new XMLHttpRequest();
      
//       formData.append('file', tabbedFiles.urlPath[i] + tabbedFiles.Name[i]);
//       formData.append('data', tabbedFiles.Text[i]);
      
//       xhr.open('post', 'php/savetxtfile.php');
//       xhr.send(formData);
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//           data = cleanString(xhr.responseText);
//           if (data == "SAVED") {
            
//             tabbedFiles.LastSaveState[i] = tabbedFiles.Text[i];
//             if (i < max) { i++; saveAllFiles(i, max, uD); }
//             else {return false;  }
          
//           } else {
//             alertOutStatus("Something failed!");
//             return false;
           
//           }
//         }
//       };
//      } else {
      
//        if (tabbedFiles.Text[i] !== "" ) { 
//          uD++;
//        }
//        if (i < max) { i++; saveAllFiles(i, max, uD); }
//        else {
//          if (uD > 0) {
//             gwcDialogue(uD + " tab(s) have unsaved data. Please name and save them to prevent data loss.", "OK", function() {
//                 return false;
//             });
  
//          } else { return false;  }
//        }
//      }
//     }


function allSaved() {  
 // Check all tabs for unsaved data.
     if (fileLastSave != editor.getValue()) { return false; }
     else {
        for (l = 0; l < 8; l++) {
   
          if ((tabbedFiles.Text[l] != tabbedFiles.LastSaveState[l])) {
             return false;
          }
          
        }
     }
     return true;
}

window.addEventListener("beforeunload", function(e)  {
    if(!allSaved()) {
     e.returnValue = "Changes you made may not be saved.";
    }
});
    
/********************************************************************************************************************
 ********************************************************************************************************************
 *
 * END
 *
 ********************************************************************************************************************
 *******************************************************************************************************************/
  }