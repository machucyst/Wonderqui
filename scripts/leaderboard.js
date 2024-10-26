import func from './funcs.js' 
import Database from './dbfuncs.js'

let docFunc = new func();                                                    
var queryString = window.location.search;
var params = new URLSearchParams(queryString)
let subjectPicked = params.get('SubjectPicked')
let currentUsername = params.get('usernameText')
let currentUserPlacement = 0;
let currentUserPoints = 0;
let leaderboardsContainer = document.getElementById("leaderboardItems");
let subjectDisplay = document.getElementById("subjectDisplay");


Database.initDatabase();

subjectDisplay.innerHTML = "Subject: " + subjectPicked;         //trac

document.addEventListener("DOMContentLoaded", function(){       
                                            //
    docFunc.LoadPage()                      // transition to the page
                                            //
});

for (let i = 0; i< Database.users.length;i++){       // loop through all the users
    Database.sortUsers(subjectPicked)

    let userRank = document.createElement("div");
    let placementDiv = document.createElement("div");           //
    let usernameDiv = document.createElement("div");            // create containers that will hold information like username, placement and score
    let scoreDiv = document.createElement("div");               //

    userRank.classList.add("backgroundDiv")
    usernameDiv.classList.add("backgroundDiv")                  //
    placementDiv.classList.add("backgroundDiv")                 //add design to the containers
    scoreDiv.classList.add("backgroundDiv")                     //

    leaderboardsContainer.appendChild(placementDiv);            //
    leaderboardsContainer.appendChild(usernameDiv);             // add them to the page
    leaderboardsContainer.appendChild(scoreDiv);                //

    usernameDiv.innerHTML = Database.users[i].username;                                         //
    placementDiv.innerHTML = "#" + (i + 1);                                                     // add the information to the containers
    scoreDiv.innerHTML = Database.getScore(Database.users[i].username, subjectPicked);          //

    if (Database.users[i].username == currentUsername) {                                        //
        currentUserPlacement = "#" + (i + 1);                                                   // get current user's score and placement
        currentUserPoints = Database.getScore(Database.users[i].username, subjectPicked);       //
    }
}
document.getElementById("backButton").addEventListener("click", function() {    // back button funtionality
    docFunc.ToNewPage("main", "main.html", currentUsername);
})          
document.getElementById("currentUserRank").innerText = currentUserPlacement;                            //
document.getElementById("currentUsername").innerText = currentUsername;                                 //show the current user's score and placement on the top   
document.getElementById("currentUserPoints").innerText = currentUserPoints;                             //
console.log("Aaa")