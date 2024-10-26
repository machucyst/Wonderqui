import func from './funcs.js';

let docFunc = new func();
let pageIndex = 0;
let imageArray = ['styles/images/Page1.gif','styles/images/Page2.gif','styles/images/Page3.gif','styles/images/Page4.gif','styles/images/Page5.png']

let headerCollectionArray = ["Starting a Quiz","Choosing an Answer","Getting a correct Answer","Running out of Time","Finishing a quiz"];
let textCollectionArray= [
                        "To start a quiz first click the Play tab and this will open more tabs, these tabs can be clicked to take you to a quiz with questions containing that subject",
                        "To choose an answer you must click one of the four buttons at the bottom of the screen. the buttons will glow in purple to indicate which one your cursor is currently hovered on, After clicking the button you chose will glow up. if the answer is correct it will glow in green, otherwise it will glow in red and yellow",
                        "If the answer you chose is correct, your score and points will increase, score defines how many questions you have answered correctly, points defeines how fast you correctly answered the questions. The faster you answer correctly the more points you will get.",
                        "Each question can be answered for 15 seconds, if 15 seconds has passed and you have not picked an answer, all buttons will light up in red and yellow to indicate you are wrong",
                        "after reaching the end of the quiz your points and score will be shown in the question box, then you will be given 4 options, if you click try again the questions will be played back from the start, if you click try again with new questions the quiz will pick new questions for you to take, if you click save score your score and points will be sent to the leaderboards where you can see how well you did against other players make sure to press this after a quiz if you want your data to change. if you click exit you will be sent back to the main menu.\n\n\n this marks the end of the tutorial section, press next if you are ready to play!",
                        ];

let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let currentUser = params.get('usernameText')

document.addEventListener("DOMContentLoaded",function(){
        docFunc.LoadPage();
})

document.getElementById("nextPage").addEventListener('click',function(){
    changeElems(5,-1,"nextPage");
    
    
})
document.getElementById("previousPage").addEventListener('click',function(){
    changeElems(0,1,"previousPage");
    
})
function changeElems(x,y,z){
// if (pageIndex<=x){
        if (pageIndex == x){
            document.getElementById(z).disabled = true;
        }else{
            document.getElementById("previousPage").disabled = false;
            document.getElementById("nextPage").disabled = false;
            pageIndex-=y;
            if (pageIndex == 5){
            docFunc.ToNewPage("null","main.html",currentUser)
            }else{
            docFunc.Text("textTitle",headerCollectionArray[pageIndex])
            docFunc.Text("textInstructions",textCollectionArray[pageIndex])
            document.getElementById("abc").src= imageArray[pageIndex]
            }
        }
        
    }
    
// }
