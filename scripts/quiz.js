//
// Import Classes
// 

import func from './funcs.js' 
import Questions from './questions.js';
import Database from './dbfuncs.js';
const docFunc = new func();
let questions = new Questions();


//
// Set Variables
//

Database.initDatabase();

let questionNumber  = 1;
let addPoints       = 200;
let timer           = 15;
let questionEnd     = 21;

let score = 0, points = 0;

let a=500,b=1000,c=3000;                // used for speedrunning
a=1,b=1,c=1;          //uncomment to speed up quiz

let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let currentUser = params.get('usernameText')
let subjectPicked = params.get('SubjectPicked')
if (subjectPicked == "All"){
    questionEnd = 51;
}



let choiceTexts = ["A","B","C","D"]
let finalChoiceTexts = ["Try Again","Try Again with New Questions","Save Score","Exit"]

let BlinkInterval, character, timedPointInterval,randomizedQuestions,subjectIndex; 
let buttonSpamPrevent = true;
let subjectPicked2 = subjectPicked;

 for(let i = 0; i<choiceTexts.length;i++){
    document.getElementById("Choice"+choiceTexts[i]).addEventListener("click", ()=> {choiceSelect(choiceTexts[i])});
 }

let x = 0;
backButton.addEventListener("click", function(){

    x++
    if (x==1){
        alert("Your Progress will not be saved if you return to menu");
        backButton.innerText = "Click Again"
    }else if(x==2){
        docFunc.ToNewPage("main", "main.html", currentUser);
    }
    
    setTimeout(function(){
        x--;
        backButton.innerText = "Back to Menu"
    },5000)
    
    

})
document.addEventListener("DOMContentLoaded",function(){
        docFunc.LoadPage()                                      // transition when jumping page
        randomizedQuestions = []; 
        randomizeQuestions();
        showQuestion(randomizedQuestions[questionNumber]);      // start quiz
        setTimeout(function(){
            timedPointInterval = setInterval(timedPoints,a)
        },700)
})

//
// Function
//

function choiceSelect(choice) {

    //
    // Input Selector
    //

    if (questionNumber == questionEnd) {
        switch(choice){
            case "A":               // try again button
                ResetScore();
                break;
            case "B":               // try again with new questions button
                randomizedQuestions = []
                randomizeQuestions();
                ResetScore();  
                break;
            case "C":               // save score button
                Database.updateUserScore(currentUser, subjectPicked2, points);          
                docFunc.Text("ChoiceC","Saved!")
                console.log(Database.getScore(currentUser, subjectPicked2));
                break;
            case "D":               // exit button
                var newUrl = 'http://localhost:5500/main.html?&usernameText=' + currentUser    
                window.location.href = newUrl;
                break;
        }
        return;
    }
    function ResetScore(){
        questionNumber = 1;                                     //
        score = 0;                                              //
        points = 0;                                             // reset values 
        timer = 15;                                             //
        addPoints = 200;                                        //
        docFunc.Text("scoreText","Score: 0")                    //
        docFunc.Text("pointsText","Points: 0")                  //


        showQuestion(randomizedQuestions[questionNumber])       // show new questions again
        timedPointInterval = setInterval(timedPoints,a)           
    }
    
    if (buttonSpamPrevent){
        clearInterval(timedPointInterval)
        buttonSpamPrevent = !buttonSpamPrevent;
        character = choice;
        if (choice == Questions.getCorrectAnswer(randomizedQuestions[questionNumber],subjectPicked).toUpperCase()){
            score++;
            points += Math.floor(addPoints)
            BlinkInterval = setInterval(blinkBorderCorrect,b);     
        }else if (choice == "E"){
            BlinkInterval = setInterval(blinkBorderWrongAll,b);    
        }else{
            BlinkInterval = setInterval(blinkBorderWrong,b);       
        }
        docFunc.BorderColor("Choice"+choice.toUpperCase(),"blueviolet")
        timer = 15;
        addPoints = 200;
        
        setTimeout(nextQuestion,c)
    }
}
function showQuestion(index) {
    subjectPicked = params.get('SubjectPicked')
    if (subjectPicked == "All"){
        subjectIndex = Math.floor(Math.random()*4);
        switch (subjectIndex){
            case 0:
                subjectPicked = "PhysicalScience";
                break;
            case 1:
                subjectPicked = "JavaScript";
                break;
            case 2:
                subjectPicked = "PerDev";
                break;
            case 3:
                subjectPicked = "EAPP";
                break;
            case 4:
                subjectPicked = "CSharp";
                break;
            case 5:
                subjectPicked = "Tagalog";
                break;
        }
    }
    console.log(index)
    console.log(Questions.getCorrectAnswer(index, subjectPicked))

    docFunc.Text("questionText",Questions.getQuestion(index, subjectPicked))
    for(let i = 0; i<choiceTexts.length;i++){                                                                           // 
        docFunc.Text("Choice"+choiceTexts[i],  Questions["getChoice"+choiceTexts[i]](index,subjectPicked))                 // Gets Choices and assigns them to their respective ids
    }                                                                                                                   // 
}
function nextQuestion(){
    clearInterval(BlinkInterval)
    timedPointInterval = setInterval(timedPoints,a)
    setTimeout(function() {
        for (let i = 0; i<choiceTexts.length;i++){
            docFunc.BorderColor("Choice"+choiceTexts[i],"white");
        }
        docFunc.BorderColor("scoreInfo","white")
        docFunc.Color("scoreText","white")

        questionNumber++;
        
        if (questionNumber==questionEnd){
            clearInterval(timedPointInterval);
            if (score>=(questionEnd-1)*0.75){
                docFunc.Text("questionText", "Congratulations!, you completed the quiz with "+points+" points!, "+"With "+score+" items correct! Would you like to try again?")
            } else{
                docFunc.Text("questionText", "Darn!, you failed the quiz with "+points+" points!, "+"With "+score+" items correct Would you like to try again?")
            } 
            for (let i = 0; i<choiceTexts.length;i++){
                 docFunc.Text("Choice"+choiceTexts[i], finalChoiceTexts[i])
            }
        }else{
            docFunc.Text("questionIndexText","Question Number: "+questionNumber)
            showQuestion(randomizedQuestions[questionNumber]);
        }
        docFunc.Text("pointsText","Points: "+points)
    }
    
    ,b)
    buttonSpamPrevent = !buttonSpamPrevent;
}
function blinkBorderCorrect(){                              // green blinking when correct
    docFunc.Text("scoreText","Score: "+score)
    // document.getElementById("Choice"+character.toUpperCase()).style.setProperty("border-color", "#32CD32", "important")
    docFunc.PropertyColor("Choice"+character.toUpperCase(),"border-color","#32CD32")
    docFunc.Color("scoreText","#32CD32")
    docFunc.BorderColor("scoreInfo","#32CD32")
    docFunc.FontSize("scoreText","1.25vw")
    setTimeout(function () {
        docFunc.PropertyColor("Choice"+character.toUpperCase(),"border-color","#00FF00")
        docFunc.Color("scoreText","#00FF00")
        docFunc.BorderColor("scoreInfo","#00FF00")
        docFunc.FontSize("scoreText","1vw")
    }, a);
}
function blinkBorderWrong(){                                            // add blinking design when you got a wrong answer
    docFunc.PropertyColor("Choice"+character.toUpperCase(),"border-color","#FF474C")
    setTimeout(function () {
        docFunc.PropertyColor("Choice"+character.toUpperCase(),"border-color","yellow")
    }, a);
}
function blinkBorderWrongAll(){                                         // add a blinking design when you run out of time
    for (let choiceLoop = 0; choiceLoop<choiceTexts.length;choiceLoop++){
        docFunc.PropertyColor("Choice"+choiceTexts[choiceLoop],"border-color","#FF474C")
    }
    setTimeout(function () {
        for (let choiceLoop = 0; choiceLoop<choiceTexts.length;choiceLoop++){
        docFunc.PropertyColor("Choice"+choiceTexts[choiceLoop],"border-color","yellow")
    }
    }, a);
}
function timedPoints(){                     // decrease time and points every half second that the user doesnt answer
    if (timer == 0) {
        docFunc.Text("timer", "Time Left: "+ "0")
        addPoints = 200;                                // when time runs out, reset timer and point
        timer = 15;
        choiceSelect("E");
        clearInterval(timedPointInterval)
        return;
    }
    if (!(timer%1==0.5)){
        docFunc.Text("timer", "Time Left: "+ timer)         // only display time in second increments
    }

    addPoints-= 6.67;
    timer -= 0.5;
}

console.log(randomizedQuestions)

function randomizeQuestions() {                 // create an array of random numbers that doesnt repeat
    if (true){
        for (let i = 0; i < questionEnd; i++) {
            while (true) {
                let randomNumber = Math.round(Math.random() * Questions.getQuestionLength(subjectPicked))-1;
                if (randomizedQuestions.includes(randomNumber)) {
                    randomNumber = Math.round(Math.random() * Questions.getQuestionLength(subjectPicked)-1); 
                }
                if (randomNumber>=49||randomNumber<0){
                    randomNumber = Math.round(Math.random() * Questions.getQuestionLength(subjectPicked)-1); 
                } else {
                    randomizedQuestions.push(randomNumber);
                    break;   
                }  
            }
        }
    }
}