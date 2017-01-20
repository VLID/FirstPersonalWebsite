function clearAll(){
    clearEnter("Fname");
    clearEnter("msg");
}

function clearEnter(element){
    document.forms["messageTable"][element].value = "";
    document.getElementById(element).style.backgroundColor = "white";
}

var Fname = /^[A-Z]+[a-z|A-Z| ]*$/;

function validateForm() {
    var validateResults = "";
    var result = true;
    var input_Fname = document.forms["messageTable"]["Fname"].value;

    if(!Fname.test(input_Fname)){
        validateResults += "\n- First letter of your name should be capitialized."
        document.getElementById("Fname").style.backgroundColor = "red";
        result = false;
    }else{
        document.getElementById("Fname").style.backgroundColor = "lightgreen";
    }

    if(!result){
        alert("Warning:\n" + validateResults);
        return result;
    }
}

function getResult(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function writeFb() {
    var content = document.getElementById("fb");
    content.innerHTML = "<h2>Feedback</h2><h4>Thank you for leaving a message to Vince Luo.</h4><h4>Here are the infomation you leaved:</h4><br><u>Your name is</u> <b>" + getResult("Fname") + "</b><br><u>The message is</u> <i>" + getResult("msg") + "</i><br><br><h5>You can go back to the previous page by clicking above button.</h5>";
}