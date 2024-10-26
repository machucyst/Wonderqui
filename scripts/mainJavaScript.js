import func from './funcs.js'
import Database from './dbfuncs.js'

const docFunc = new func();
Database.initDatabase();

let selectionsContainer,height,newHeight;
let shii              = document.getElementById("shii-chan");                // set variable from elements
let ichika            = document.getElementById("ichika");
let startButton       = document.getElementById("startButton");
let openMenu          = document.getElementById("startButton");
let playSelect        = document.getElementById("playSelect");
let deleteSelect      = document.getElementById("deleteSelect");
let logOutSelect      = document.getElementById("logOutSelect");
let leaderboardSelect = document.getElementById("leaderboardSelect");

let queryString = window.location.search;                   //
let params      = new URLSearchParams(queryString);         // Variables to get Link Data
let currentUser = params.get('usernameText');               //

let menuToggle        = false;   //
let logOutToggle      = false;   //
let deleteToggle      = false;   // initialize selection margin
let playToggle        = false;   //
let leaderboardToggle = false;   //

function menuItemsBegone(){
    docFunc.Transition("startButton",.3+"s");
    docFunc.Index("startButton",-1);
    docFunc.Index("selectionsContainer",-1);
}
function toggleSelections(toggle, element, container) {         // function for everytime a menu button is clicked, it is toggled similar to how the big start button would
    toggle = !toggle;
    if (toggle){
        element.style.marginLeft = "0px";
        element.style.boxShadow = "30px 30px 30px #00000080";
    }else{
        element.style.marginLeft = "200px";
        element.style.boxShadow = "0px 0px 0px #00000055";
    }
    subselectOpen(container, toggle);
}
function subselectOpen(selection, Toggle) {                 // when the menu button is clicked, the different sub options of that button appears
    height = document.getElementById(selection).scrollHeight;
    newHeight = (height / window.innerHeight) * 100;
    if (Toggle){
        docFunc.PropertyHeight(selection,'height','calc('+newHeight + "2"+'vh');           // change the height from 0 to the height of the container and vise versa
    } else {
        docFunc.Height(selection, 0+"px");
    }
}
function subselectClose(id, element,toggle) {
    element.style.marginLeft = "200px";
    element.style.boxShadow = "30px 30px 30px #00000055";
    docFunc.Height(id, 0+"px"); 
    toggleSelections(toggle, element, id);
}
document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {        
        docFunc.Opacity("startButton",100+"%");
        docFunc.Transition("startButton",.8+"s")
        docFunc.Transition("cover",.6+"s")
        docFunc.Opacity("cover",0+"%");   
        docFunc.Transition("selectionsContainer",1+"s")
        docFunc.Transition("deleteSelect",1+"s")
        docFunc.Transition("leaderboardSelect",1+"s")
        docFunc.Transition("logOutSelect",1+"s")
        docFunc.Transition("helpSelect",1+"s")
        docFunc.Transition("playSelect",1+"s")               // when the document loads, it starts with a black ti smoothly transition
        docFunc.Index("cover","2");   
    }, 1000);
    
    if (currentUser != null) {
        docFunc.Text("startButtonTextSpan", currentUser+"!");
    } else {
        docFunc.Text("startButtonTextSpan", "Guest!");
    }
    selectionsContainer = document.getElementById("selectionsContainer");  
});   
playSelect.addEventListener("click",()=>{                             // toggle the play button
    toggleSelections(playToggle, playSelect, "subSelectionsContainer");
    playToggle = !playToggle;
});
deleteSelect.addEventListener("click",()=>{
    if (!deleteToggle){
        docFunc.Text("deleteText","Are you sure?");
    }else{
        docFunc.Text("deleteText","Delete Account");
    }
    toggleSelections(deleteToggle, deleteSelect, "subSelectionsDeleteAccountContainer");        // toggle delete account button
    deleteToggle = !deleteToggle;
});
logOutSelect.addEventListener("click", ()=>{
    if (!logOutToggle){
        docFunc.Text("logOutText","Are you sure?");
    }else{
        docFunc.Text("logOutText","Log Out");
    }
    toggleSelections(logOutToggle, logOutSelect, "subSelectionsLogOutContainer");       // toggle log out button
    logOutToggle = !logOutToggle;
});
document.getElementById("LogOutYes").addEventListener("click",()=>{
    window.location.href = "http://localhost:5500/signUp.html";          // log out button, jump to sign in page
});
document.getElementById("deleteConfirm").addEventListener("click",()=>{             // delete account confirmation   
    Database.deleteAccount(currentUser);
    menuItemsBegone();
    docFunc.ToNewPage("signUp",'signUp.html','Deleted');
});
document.getElementById("deleteFalse").addEventListener("click",()=>{             // delete account confirmation   
    docFunc.Text("deleteText","Delete Account");
    subselectClose("subSelectionsDeleteAccountContainer",deleteSelect,deleteToggle);
    deleteToggle = !deleteToggle;
});
document.getElementById("LogOutNo").addEventListener("click",()=>{               // nevermind log out, toggles the log out button again to close it
    docFunc.Text("logOutText","Log Out");
    subselectClose("subSelectionsLogOutContainer",logOutSelect,logOutToggle);
    logOutToggle = !logOutToggle;
});
leaderboardSelect.addEventListener("click",()=>{
    toggleSelections(leaderboardToggle, leaderboardSelect, "subSelectionsLeaderboardContainer");            // toggle leaderboards button
    leaderboardToggle = !leaderboardToggle;
});
openMenu.addEventListener("click",()=>{           
        // 
        // when the big open menu thing is clicked
        // 
    menuToggle = !menuToggle;       // when its clicked, the toggle changes

    var formEl = document.forms.BookPackageForm;
    var formdata = new FormData(formEl);
    
    
    if (menuToggle) {                           // open or close the menu based on the toggle
                                                // change oroperties of the menu button, images behind, and the menu buttons
        docFunc.Transform(shii,"translate(-10%, -17%)")
        docFunc.Transform(ichika,"translate(-110%, -17%)")
        docFunc.Transform(startButton,"translate(-120%, -50%)");
        docFunc.Transform(selectionsContainer,"translate(0%, -50%)");
    } else {
       
        docFunc.Transform(shii,"translate(-20%, -20%)")
        docFunc.Transform(ichika,"translate(-100%, -20%)")
        playSelect.style.marginLeft = "200px";                       // change oroperties of the menu button, images behind, and the menu buttons but reversed
        playSelect.style.boxShadow = "0px 0px 0px #00000055";
        deleteSelect.style.marginLeft = "200px";
        deleteSelect.style.boxShadow = "0px 0px 0px #00000055";
        logOutSelect.style.marginLeft = "200px";
        logOutSelect.style.boxShadow = "0px 0px 0px #00000055";
        leaderboardSelect.style.boxShadow = "0px 0px 0px #00000055";
        docFunc.Transform(startButton,"translate(-50%, -50%)");
        docFunc.Transform(selectionsContainer,"translate(0%, -300%)");
    }
}); 
document.getElementById("helpSelect").addEventListener("click",()=>{                           menuItemsBegone(); docFunc.ToNewPage("null", "help.html",currentUser)                   });
document.getElementById("playSubSelectScience").addEventListener("click", ()=>{                menuItemsBegone(); docFunc.ToNewPage("PhysicalScience", "quiz.html",currentUser)        });
document.getElementById("playSubSelectJavaScript").addEventListener("click", ()=>{             menuItemsBegone(); docFunc.ToNewPage("JavaScript", "quiz.html",currentUser)             });
document.getElementById("playSubSelectCSharp").addEventListener("click", ()=>{                 menuItemsBegone(); docFunc.ToNewPage("CSharp", "quiz.html",currentUser)                 });
document.getElementById("playSubSelectTagalog").addEventListener("click", ()=>{                menuItemsBegone(); docFunc.ToNewPage("Tagalog", "quiz.html",currentUser)                });
document.getElementById("playSubSelectEAPP").addEventListener("click", ()=>{                   menuItemsBegone(); docFunc.ToNewPage("EAPP", "quiz.html",currentUser)                   });
document.getElementById("playSubSelectPerDev").addEventListener("click", ()=>{                 menuItemsBegone(); docFunc.ToNewPage("PerDev", "quiz.html",currentUser)                 });
document.getElementById("playSubSelectAll").addEventListener("click", ()=>{                    menuItemsBegone(); docFunc.ToNewPage("All", "quiz.html",currentUser)                    });
document.getElementById("scienceLead").addEventListener("click", ()=> {                        menuItemsBegone(); docFunc.ToNewPage("PhysicalScience", "leaderboard.html",currentUser) });
document.getElementById("javascriptLead").addEventListener("click", ()=>{                      menuItemsBegone(); docFunc.ToNewPage("JavaScript", "leaderboard.html",currentUser)      });
document.getElementById("eappLead").addEventListener("click", ()=> {                           menuItemsBegone(); docFunc.ToNewPage("EAPP", "leaderboard.html",currentUser)            });
document.getElementById("tagalogLead").addEventListener("click", ()=> {                        menuItemsBegone(); docFunc.ToNewPage("Tagalog", "leaderboard.html",currentUser)         });
document.getElementById("csharpLead").addEventListener("click", ()=> {                         menuItemsBegone(); docFunc.ToNewPage("CSharp", "leaderboard.html",currentUser)          });
document.getElementById("perdevLead").addEventListener("click", ()=>{                          menuItemsBegone(); docFunc.ToNewPage("PerDev", "leaderboard.html",currentUser)          });
document.getElementById("allLead").addEventListener("click", ()=>{                             menuItemsBegone(); docFunc.ToNewPage("All", "leaderboard.html",currentUser)             });

export default func;