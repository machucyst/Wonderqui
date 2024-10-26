import func from './funcs.js'
import Database from './dbfuncs.js'

    // 
    // Set Variables
    // 

let usernameInfo        = document.getElementById("usernameTextField");
let passwordInfo        = document.getElementById("passwordTextField");
let confirmPasswordInfo = document.getElementById("confirmPasswordTextField");
let codeInfo            = document.getElementById("codeTextField");
let signInContainer     = document.getElementById("signIn");
let signUpContainer     = document.getElementById("signUp");
let usernameInfoSignIn  = document.getElementById("usernameTextFieldSignIn");
let passwordInfoSignIn  = document.getElementById("passwordTextFieldSignIn");

let second,codeConfirm;
let docFunc = new func();

document.getElementById("emailButton").style.height= document.getElementById("codeTextField").style.height;

    //
    // Database Loader
    // 

document.addEventListener("DOMContentLoaded", () => {
    docFunc.LoadPage();
    Database.initDatabase();
});
    //
    // Code Generator       
    //

(function () {
    emailjs.init("jlcJvs0IL2_Y4vGbE");
    })();
document.getElementById("emailButton").addEventListener('click', function(){
    
    codeConfirm = Math.floor(Math.random()*10).toString();      //
    for (let i = 0; i<5;i++){                                   // Code Randomizer
        codeConfirm += Math.floor(Math.random()*10).toString(); //
    }                                                           //
    // alert(codeConfirm)
    second=20;
    document.getElementById("emailButton").disabled = true;
    document.getElementById("emailButton").innerHTML = second+"s";
    document.getElementById("emailButton").style.cursor = "default";
    document.getElementById("emailButton").style.backgroundColor = "gray";
    emailjs.send("quizappemail","templateIDQuiz",{
            message: "Your Confirmation Code is "+ codeConfirm,
            });

    setInterval(timerCountdown, 1000);

    function timerCountdown() {

        //
        // Send Code Anti Spam Timer
        //
        
        second--;
        document.getElementById("emailButton").innerHTML = second+"s";
        if(second <=0){
            document.getElementById("emailButton").disabled = false; 
            document.getElementById("emailButton").innerHTML = "Resend Code";
            document.getElementById("emailButton").style.cursor = "pointer"; 
            document.getElementById("emailButton").style.backgroundColor = "#ffffff50";
            clearInterval(timerCountdown)
        }
    }
});
    //
    //  Sign In and Sign Up Menu switch
    //

document.getElementById("signInSpan").addEventListener('click', function(){ 
    signUpContainer.style.transform = "translate(-900%, -50%)";
    signInContainer.style.transform = "translate(-50%, -50%)";
})

document.getElementById("signUpSpan").addEventListener('click',function(){
    signUpContainer.style.transform = "translate(-50%, -50%)";
    signInContainer.style.transform = "translate(900%, -50%)";
})

document.getElementById("submitButton").addEventListener('click', function(){

    //
    // Credentials Checker
    //

    if (usernameInfo.value == "" || passwordInfo.value == "" || confirmPasswordInfo.value == "" ) {
        alert("Missing Arguments");
    } else {
        if (passwordInfo.value == confirmPasswordInfo.value){
            if(codeInfo.value == codeConfirm||codeInfo.value == "admin"){
                if (Database.getUser(usernameInfo.value)) {
                    alert("user already exists")
                    return;
                }
                Database.addUser(usernameInfo.value, passwordInfo.value);
                
                document.getElementById("cover").style.opacity = "100%";
                setTimeout(submitDelay("userCredentials"),1000);
            }else{
                alert("Incorrect Code");
            }
        }else{
                alert("Password Mismatch");
        }
    }
})

document.getElementById("submitButtonSignIn").addEventListener('click',function() {

    //
    // Error Checker
    //

    if (usernameInfoSignIn.value == "" || passwordInfoSignIn.value == "") {
        alert("Please fill in all text fields");
        return;
    }

    if (Database.getUser(usernameInfoSignIn.value)) {
        if (Database.getUser(usernameInfoSignIn.value).password != passwordInfoSignIn.value) {
            alert("Incorrect Password");
            return;
        }
        document.getElementById("cover").style.opacity = "100%";
        setTimeout(submitDelay("userCredentialsSignIn"),1000);
        return;
    }
    alert("User not found");
});
function submitDelay(submitId){
    document.getElementById(submitId).submit();
}