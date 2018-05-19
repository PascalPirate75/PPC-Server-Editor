function z(s) { 
   
   t = document.querySelectorAll(s);
   if (t.length == 1) {
     return t[0];
   } else {
     return t;
   }
 
}


function gwcDialogue(txt, sty, thefun) {
 
 
     function _OK(){
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxOK").removeEventListener("click", _OK, true);
        if (typeof thefun === "function") {
          thefun("OK");
        }
      }
      
      
      function _YES(){
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxYes").removeEventListener("click", _YES, true);
        z("#gDboxNo").removeEventListener("click", _NO, true);
        z("#gDboxCancel").removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("YES");
        }
      }
      
      
      function _CANCEL(){
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxYes").removeEventListener("click", _YES, true);
        z("#gDboxNo").removeEventListener("click", _NO, true);
        z("#gDboxCancel").removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("CANCEL");
        }

      }
      
      function _NO() {
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxYes").removeEventListener("click", _YES, true);
        z("#gDboxNo").removeEventListener("click", _NO, true);
        z("#gDboxCancel").removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("NO");
        }
      }
      
      function _SUB(){
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxInput").style.display = "none";
        z("#gDboxSubmit").removeEventListener("click", _SUB, true);
        z("#gDboxCancel").removeEventListener("click", _CANCEL, true);
        z("#gDboxInput").removeEventListener("keypress", _KEY, true);
        if (typeof thefun === "function") {
          thefun(z("#gDboxInput").value);
        }
      }
      
      function _CANCELSUB(){
        z("#gDbox").style.display = "none";
        z("#gDshield").style.display = "none";
        z("#gDboxText").textContent = "";
        z("#gDboxInput").style.display = "none";
        z("#gDboxSubmit").removeEventListener("click", _SUB, true);
        z("#gDboxCancel").removeEventListener("click", _CANCELSUB, true);
        z("#gDboxInput").removeEventListener("keypress", _KEY, true);
        if (typeof thefun === "function") {
          thefun("CANCEL");
        }
      }
      
      function _KEY(e) {
         var key = e.which;
         if(key == 13)  // the enter key code
          {
            z("#gDbox").style.display = "none";
            z("#gDshield").style.display = "none";
            z("#gDboxText").textContent = "";
            z("#gDboxInput").style.display = "none";
            z("#gDboxSubmit").removeEventListener("click", _SUB, true);
            z("#gDboxCancel").removeEventListener("click", _CANCEL, true);
            z("#gDboxInput").removeEventListener("keypress", _KEY, true);
            {
              thefun(z("#gDboxInput").value);
            }
          }
      }
 
    
    if (sty == "RESPO") {
      
      // z("#gDboxInput").prop("type", "password");
      z("#gDboxInput").type = 'password';
      
      sty = "RESP";
    } else {
      
      z("#gDboxInput").type = "text";

    }

    z("#gDboxText").textContent = txt;
    z("#gDbox").style.display = "initial";
    z("#gDshield").style.display = "initial";
    

    if (sty == "OK") {
      z("#gDboxCont").innerHTML = "<button id='gDboxOK'>OK</button>";
      z("#gDboxOK").focus();
      z("#gDboxOK").addEventListener("click", _OK, true);

        
      
      
    } else if (sty == "YESNO") {
      z("#gDboxCont").innerHTML = "<button id='gDboxYes'>Yes</button><button id='gDboxNo'>No</button><button id='gDboxCancel'>Cancel</button>";
      z("#gDboxYes").addEventListener("click", _YES, true);
      
      
      z("#gDboxCancel").addEventListener("click", _CANCEL, true);
      
      z("#gDboxNo").addEventListener("click", _NO, true);
      
      
    } else if (sty == "RESP") {
     z("#gDboxCont").innerHTML ="<button id='gDboxSubmit'>Submit</button><button id='gDboxCancel'>Cancel</button>";
      z("#gDboxInput").style.display = "initial";
      z("#gDboxInput").value = gDboxInputDTXT;
      z("#gDboxInput").focus();
      z("#gDboxInput").select();
      
      z("#gDboxSubmit").addEventListener("click", _SUB, true);
     
      z("#gDboxCancel").addEventListener("click", _CANCELSUB, true);
      
      z("#gDboxInput").addEventListener("keypress", _KEY, true);
     
    }
    
  }

// window.onload = 

function setUpGWC() {


 
  
  gDboxInputDTXT = "Sometesttext";
  
/*  var cssId = 'gwvDialogueCSS';  // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId))
  {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = 'gwcDialogue.css';
      link.media = 'all';
      head.appendChild(link);
  }
 */
  
  // jQuery.fn.center = function () {
  //   this.css("position","absolute");
  //   this.css("top", Math.max(0, ((z(window).height() - z(this).outerHeight()) / 2) +
  //                                               z(window).scrollTop()) + "px");
  //   this.css("left", Math.max(0, ((z(window).width() - z(this).outerWidth()) / 2) +
  //                                               z(window).scrollLeft()) + "px");
  
  // };
  
  var div = document.createElement('div');
  div.id = "gwcDialogueDIV";
  document.body.appendChild(div);
  z("#gwcDialogueDIV").innerHTML = '<div id="gDbox"><div id="gDboxText"></div><div id="gDboxResp"><input id="gDboxInput" type="text"></div><div id="gDboxCont"></div></div><div id="gDshield"></div>';
  
  // z("#gDbox").center();
  
  z("#gDbox").style.display = "none";
  
  z("#gDshield").style.display = "none";
  z("#gDboxInput").style.display = "none";
  
  
}


