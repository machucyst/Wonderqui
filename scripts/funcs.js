class func{
    Opacity(id, value){
        document.getElementById(id).style.opacity = value;
    }
    Index(id,value){
        document.getElementById(id).style.zIndex = value;
    }
    Display(id,value){
        document.getElementById(id).style.display = value; 
    }
    Height(id,value){
        document.getElementById(id).style.height = value; 
    }
    Transform(id,value){
        id.style.transform = value;
    }
    Text(id,value){
        document.getElementById(id).innerText = value;
    }
    FontSize(id,value){
        document.getElementById(id).style.fontSize = value;
    }
    Color(id,value){
        document.getElementById(id).style.color = value;
    }
    BorderColor(id,value){
       try{
       document.getElementById(id).style.borderColor = value;
       } catch{
        console.log("lmao")
       }
    }
    Transition(id,value){
        document.getElementById(id).style.transition = value;
    }
    TabIndex(id,value){
        document.getElementById(id).tabIndex = value;
    }
    PropertyColor(id,value,value2){
        document.getElementById(id).style.setProperty(value,value2,"important")
    }
    PropertyHeight(id,value,value2){
        document.getElementById(id).style.setProperty(value,value2);
    }
    ToNewPage(subject, page, currentUser) {
        this.Index("cover","3");
        this.Opacity("cover",100+"%");
        setTimeout(function(){
            var newUrl = 'http://localhost:5500/'+page+'?&usernameText=' + currentUser + "&SubjectPicked=" + subject;
            window.location.href = newUrl;
        },1000);
    }
    LoadPage(){
    setTimeout(() => {
        this.Transition("cover",.6+"s")
        this.Opacity("cover",0+"%");
        this.Index("cover","2");   
    }, 600);
    }
}

export default func;