document.querySelector("#start").onclick = start;
let correctAnswers = 0, wrongAnswers = 0, emptyAnswers = 0;


function start(){
    countdownTimer();
    timeBarProgress();
    showQuestion();
    const startButton = document.querySelector("#start");
    startButton.disabled = true;
    const optionButtons = document.querySelectorAll(".option");
    for (let x of optionButtons) {
        x.disabled = false;
    }
    const jumpButton = document.querySelector("#jump");
    jumpButton.disabled = false;
    jumpButton.addEventListener('click' , showQuestionWithJump);
    document.querySelector("#score").innerHTML='0';
}

function showQuestionWithJump(){
    emptyAnswers++;
    showQuestion();
}

function checkValue(correct , inputAnswer) {
    if(correct===inputAnswer){
        correctAnswers++;
    } else{
        wrongAnswers++;
    }
}

function showResult(){
    document.querySelector("#corrects").innerHTML= correctAnswers.toString();
    document.querySelector("#wrongs").innerHTML= wrongAnswers.toString();
    document.querySelector("#empties").innerHTML= emptyAnswers.toString();
}

function getInputAnswer(value){
    checkValue(localStorage.getItem("correct"),value);
    showQuestion();
}

function showQA(){
    let zaribs = createZaribs(3);
    let q = createQA(zaribs);
    if(q!=null){
        document.querySelector("#question1").innerHTML = q;
    } else {
        showQuestion();
        return;
    }
    let correct = showOptions(optionsForQAAndQB(answerQA(zaribs))); // showOptions function also return the correct option
    localStorage.setItem("correct" , correct.toString());
}

function showQB(){
    let zaribs = createZaribs(6);
    document.querySelector("#question1").innerHTML =
        "<div class=\"flex-container\">\n" +
        "        <div class=\"flex-item\" id=\"variables\">\n" +
        "            <div id=\"numerator1\"></div>\n" +
        "            <hr style='border-top: 2px solid black;'>\n" +
        "            <div id=\"denominator1\"></div>\n" +
        "        </div>\n" +
        "        <div class=\"flex-item\" id=\"equal\">=</div>\n" +
        "        <div class=\"flex-item\" id=\"numbers\">\n" +
        "            <div id=\"numerator2\"></div>\n" +
        "            <hr id=\"khat2\" style='border-top: 2px solid black;'>\n" +
        "            <div id=\"denominator2\"></div>\n" +
        "        </div>\n" +
        "    </div>"
    if(zaribs[0]===0 && zaribs[2]===0){
        showQuestion();
        return ;
    }
    let sorat = createQB(zaribs.slice(0,2));
    let makhraj = createQB(zaribs.slice(2,4));
    let javab = createQBJ(zaribs.slice(4,6));
    document.querySelector("#numerator1").innerHTML = sorat;
    document.querySelector("#denominator1").innerHTML = makhraj;
    if(typeof javab==="number"){
        document.querySelector("#numerator2").innerHTML = javab;
        document.getElementById("khat2").style.display = "none";
    } else if(javab === null){
        showQuestion();
        return;
    } else {
        document.getElementById("khat2").style.display = "block";
        document.querySelector("#numerator2").innerHTML = javab[0];
        document.querySelector("#denominator2").innerHTML = javab[1];
    }
    let correct = showOptions(optionsForQAAndQB(answerQB(zaribs))); // showOptions function also return the correct option
    localStorage.setItem("correct" , correct.toString());
}

function showQC(){
    let zaribs = createZaribsForC();
    let q = createQC(zaribs);
    if(q!=null) {
        document.querySelector("#question1").innerHTML = "&radic;<span id=\"sqrtQ\"></span>"
        document.querySelector("#sqrtQ").innerHTML = q;
    } else {
        showQuestion();
        return;
    }
    let correct = showOptions(optionsForQC(answerQC(zaribs))); // showOptions function also return the correct option
    localStorage.setItem("correct" , correct.toString());
}

function showQE(){
    let zaribs = createZaribs(2);
    let q = createQE(zaribs);
    if(q!=null) {
        document.querySelector("#question1").innerHTML = q;
    } else {
        showQuestion();
        return;
    }
    let correct = showOptions(optionsForQE(answerQE(zaribs))); // showOptions function also return the correct option
    localStorage.setItem("correct" , correct.toString());
}

function showQuestion(){
    showResult();
    let x = Math.random(); //todo array for functions
    if (x<0.25){
        showQA();
    } else if(x<0.5){
        showQE();
    } else if(x<0.75){
        showQC();
    } else{
        showQB();
    }
}

function createQA(zaribs) {
    let str1 , str0="" , operand="";
    if(zaribs[0]===0){
        return null;
    }
    str1 = checkPowerOneZarib(zaribs[0]);
    if(zaribs[1]<0){
        operand = " - ";
        str0 = zaribs[1]*(-1);
    } else if(zaribs[1]>0){
        operand = " + ";
        str0 = zaribs[1];
    }
    return str1 + operand + str0 + " = " + zaribs[2];

}   // ax+b=c
//QB : ax+b/cx+d = e/f
function createQB(zaribs) {
    let str1 , str0 = "" , operand = "";
    if (zaribs[0]===0 && zaribs[1]===0){
        return null;
    }
    str1 = checkPowerOneZarib(zaribs[0]);
    if(zaribs[1]<0){
        operand = " - ";
        str0 = zaribs[1]*(-1);
    } else if(zaribs[1]>0){
        if(zaribs[0]!== 0){
            operand = " + ";
        }
        str0 = zaribs[1];
    }
    return str1 + operand + str0;
}   // ax+b , cx+d

function createQBJ(zaribs){
    if(zaribs[1]===0){
        return null;
    } else if(zaribs[0]===0){
        return 0;
    } else {
        return checkFraction(zaribs[0],zaribs[1]);
    }
}    // e/f

function createQC(zaribs){
    let str1 ,str2,str3;
    str3 = zaribs[2];
    if(zaribs[0]===1){
        if(zaribs[1]===1){
            return null;
        } else {
            str2 = (zaribs[1]**2);
            return str2*str3;
        }
    } else {
        str1=(zaribs[0]**2);
        if(zaribs[1]===1){
            return str1 * str3;
        } else {
            str2 = (zaribs[1]**2);
            return str1*str2*str3;
        }
    }
}    // sqrt(a^2b^2c)

function createQD(zaribs){
    let str2="", str1="", str0="" , operand1 = "", operand2 = "";
    if (zaribs[0]===0){
        return null;
    }
    str2 = checkPowerTwoZarib(zaribs[0]);
    if(zaribs[1]>0){
        operand1 = " + ";
        str1 = checkPowerOneZarib(zaribs[1]);
    } else if(zaribs[1]<0){
        operand1 = " - ";
        str1 = checkPowerOneZarib(zaribs[1]*(-1));
    }
    if(zaribs[2]<0){
        operand2 = " - ";
        str0 = zaribs[2]*(-1);
    } else if(zaribs[2]>0){
        operand2 = " + ";
        str0 = zaribs[2];
    }
    return str2 + operand1 + str1 + operand2 + str0 + " = " + zaribs[3];
}   // ax^2+bx+c=d

function createQE(zaribs){
    let str2 = "x<sup>2</sup>" , str1 = "" , str0 = "" , operand1 = "" , operand2 = "";
    let zaribX = (zaribs[0]+zaribs[1])*(-1);
    let zarib0 = zaribs[0]*zaribs[1];
    if(zaribX ===0 && zarib0 ===0){
        return null;
    }
    if(zaribX>0){
        operand1 = " + ";
        str1 = checkPowerOneZarib(zaribX);
    } else if(zaribX<0){
        operand1 = " - ";
        str1 = checkPowerOneZarib(zaribX*(-1));
    }
    if(zarib0<0){
        operand2 = " - ";
        str0 = zarib0*(-1);
    } else if(zarib0>0){
        operand2 = " + ";
        str0 = zarib0;
    }
    return str2 + operand1 + str1 + operand2 + str0 + " = 0";
}    // x^2-(a+b)x+ab=0

function checkPowerTwoZarib(zarib){
    if(zarib===0){
        return "";
    } else if(zarib===1){
        return "x^2"
    } else if(zarib===-1){
        return "-x^2"
    } else{
        return zarib+"x^2"
    }
}

function checkPowerOneZarib(zarib){
    if(zarib===0){
        return "";
    } else if(zarib===1){
        return "x"
    } else if(zarib===-1){
        return "-x"
    } else {
        return zarib+"x"
    }
}

function createRandomNumber(){
    return Math.round((Math.random()*2-1)*10);
}

function createZaribs(n){
    let array = [];
    for (let i = 0; i < n; i++) {
        array.push(createRandomNumber())
    }
    return array;
}

function createZaribsForC(){
    let a = Math.round(Math.random()*2+1);
    let b = Math.round(Math.random()*2+1);
    let temp = Math.round(Math.random()*3);
    let arrayC = [2,3,5,7];
    let c = arrayC[temp];
    return [a,b,c];
}

function answerQA(array){
    let s = array[2]-array[1];
    let m = array[0];
    return checkFraction(s,m);
}

function optionsForQAAndQB(answer){
    let opt1 , opt2 , opt3 , opt4;
    if(typeof answer === 'number'){
        opt1 = answer;
        if(answer === 0){
            opt2 = 2;
        } else {
            opt2 = answer*-1;
        }
        opt3 = answer+1;
        opt4 = answer-1;
        return [opt1 , opt2 , opt3 , opt4];
    } else {
        opt1 = checkFraction(answer[0] , answer[1]);
        opt2 = checkFraction((answer[0]*-1) , answer[1]);
        if (answer[0]<0){
            opt3 = checkFraction(answer[1] , (answer[0]*-1));
            opt4 = checkFraction((answer[1]*-1) , (answer[0]*-1));
        } else {
            opt3 = checkFraction(answer[1] , answer[0]);
            opt4 = checkFraction((answer[1]*-1) , answer[0]);
        }
    }
    return [fractionOption(opt1) , fractionOption(opt2) ,fractionOption(opt3) ,fractionOption(opt4) ,]
}

function fractionOption(opt){
    if(typeof opt === "number"){
        return opt;
    } else {
        return opt[0]+"/"+opt[1];
    }
}

function answerQB(array){
    let s = array[3]*array[4]-array[1]*array[5];
    let m = array[0]*array[5]-array[2]*array[4];
    return checkFraction(s,m);
}

function answerQC(array){
    let a = array[0]*array[1];
    return [a,array[2]];
}

function optionsForQC(answer){
    let opt1 , opt2 , opt3 , opt4;
    opt1 = answer[0]+ "&radic;<span id=\"sqrtA\">"+answer[1]+"</span>";
    if(answer[0] === answer[1]){
        opt2 = (answer[1]+2)+ "&radic;<span id=\"sqrtA\">"+answer[0]+"</span>";
    } else {
        opt2 = answer[1]+ "&radic;<span id=\"sqrtA\">"+answer[0]+"</span>";
    }
    opt3 = (answer[0]+1) + "&radic;<span id=\"sqrtA\">"+answer[1]+"</span>";
    opt4 = answer[0]+ "&radic;<span id=\"sqrtA\">"+(answer[1]+1)+"</span>";
    return [opt1 , opt2 , opt3 , opt4];
}

function answerQD(array){}

function answerQE(array){
    return array;
}

function optionsForQE(answer){
    let opt1 , opt2 , opt3 , opt4;
    opt1 = "x<sub>1</sub> = "+answer[0]+"<br>"+"x<sub>2</sub> = "+answer[1];
    if(answer[0] === 0) {
        opt2 = "x<sub>1</sub> = " + (answer[0] - 1) + "<br>" + "x<sub>2</sub> = " + answer[1];
        opt3 = "x<sub>1</sub> = "+answer[0]+"<br>"+"x<sub>2</sub> = "+(answer[1]*-1);
        opt4 = "x<sub>1</sub> = " + (answer[0] + 1) + "<br>" + "x<sub>2</sub> = " + (answer[1] * -1);
    }else if(answer[1] === 0){
        opt2 = "x<sub>1</sub> = "+(answer[0]*-1)+"<br>"+"x<sub>2</sub> = "+answer[1];
        opt3 = "x<sub>1</sub> = " + answer[0]+"<br>"+"x<sub>2</sub> = "+(answer[1]+1);
        opt4 = "x<sub>1</sub> = " + (answer[0]*-1)+"<br>"+"x<sub>2</sub> = "+(answer[1]-1);
    } else if(answer[0] === (answer[1]*-1)) {
        opt2 = "x<sub>1</sub> = " + (answer[0] - 1) + "<br>" + "x<sub>2</sub> = " + (answer[1] + 1);
        opt3 = "x<sub>1</sub> = " + (answer[0] + 1) + "<br>" + "x<sub>2</sub> = " + (answer[1] - 1);
        opt4 = "x<sub>1</sub> = " + answer[0] + "<br>" + "x<sub>2</sub> = " + (answer[1] * 2);
    } else if(answer[0] === answer[1]){
        opt2 = "x<sub>1</sub> = "+(answer[0]*-1)+"<br>"+"x<sub>2</sub> = "+(answer[1]*-1);
        opt3 = "x<sub>1</sub> = "+answer[0]+"<br>"+"x<sub>2</sub> = "+(answer[1]*-1);
        opt4 = "x<sub>1</sub> = " + (answer[0]*2) + "<br>" + "x<sub>2</sub> = " + (answer[1] * 2);
    } else {
        opt2 = "x<sub>1</sub> = "+(answer[0]*-1)+"<br>"+"x<sub>2</sub> = "+answer[1];
        opt3 = "x<sub>1</sub> = "+answer[0]+"<br>"+"x<sub>2</sub> = "+(answer[1]*-1);
        opt4 = "x<sub>1</sub> = "+(answer[0]*-1)+"<br>"+"x<sub>2</sub> = "+(answer[1]*-1);
    }
    return [opt1 , opt2 , opt3 , opt4];
}

function gcd(x,y){
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function showOptions(array){
    let x = Math.round(Math.random()*3);
    let correct = x+1;
    let options = document.querySelectorAll(".option");
    if(x===0){
        options[0].innerHTML=array[0];
        options[1].innerHTML=array[1];
        options[2].innerHTML=array[2];
        options[3].innerHTML=array[3];
    } else if(x===1){
        options[1].innerHTML=array[0];
        options[0].innerHTML=array[1];
        options[2].innerHTML=array[2];
        options[3].innerHTML=array[3];
    } else if(x===2){
        options[2].innerHTML=array[0];
        options[0].innerHTML=array[1];
        options[1].innerHTML=array[2];
        options[3].innerHTML=array[3];
    } else {
        options[3].innerHTML=array[0];
        options[0].innerHTML=array[1];
        options[1].innerHTML=array[2];
        options[2].innerHTML=array[3];
    }
    return correct;
}

function countdownTimer(){
    let countDownDate = new Date().getTime() + 101000;
    let flag = false;
    let now , end , addTime , distance , seconds , temp;
    let x = setInterval(function() {
        now = new Date().getTime();
        if(flag){
            countDownDate -= (temp-1000);
            flag=false;
        }
        end = countDownDate;
        addTime = TimeModifier(correctAnswers) - TimeModifier(wrongAnswers);
        distance = end - now;
        distance += addTime;
        if(distance > 100000){
            temp = distance-100000;
            distance-=temp;
            flag = true;
        }
        seconds = Math.floor((distance % (1000 * 60 * 60)) / 1000);
        localStorage.setItem("currentTime", distance);
        document.getElementById("demo").innerHTML =seconds+" ?????????? ";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "???????? ?????? ???? ?????????? ????????";
            finish();
        }
    }, 1000);
}

function finish(){
    document.getElementById("myProgress").style.display = "none";
    let score = (correctAnswers*3)-(wrongAnswers);
    document.querySelector("#start").disabled = false;
    document.querySelector("#jump").disabled = true;
    document.querySelector("#question1").innerHTML = "????????"
    let options = document.querySelectorAll(".option");
    options[0].innerHTML = "?????????? 1";
    options[1].innerHTML = "?????????? 2";
    options[2].innerHTML = "?????????? 3";
    options[3].innerHTML = "?????????? 4";
    for (let x of options) {
        x.disabled = true;
    }
    correctAnswers = 0;
    wrongAnswers = 0;
    emptyAnswers = 0;
    document.querySelector("#score").innerHTML = score.toString();
}

function TimeModifier(count) {
    return (count * 10000);
}

function timeBarProgress() {
        let x = setInterval(function (){
            let elem = document.getElementById("myBar");
            let currentTime = Math.floor(localStorage.getItem("currentTime") / 1000);
            let width = currentTime;
            if(width>0){
                document.getElementById('levelSound').play();
                if (width > 100) {
                    width = 100;
                    document.getElementById('levelSound').playbackRate = 1;
                }else if(width > 50){
                    elem.style.backgroundColor = "green";
                    //document.getElementById('levelSound').play();
                    document.getElementById('levelSound').playbackRate = 1;
                } else if (width >=25){
                    elem.style.backgroundColor = "yellow";
                    //document.getElementById('levelSound').play();
                    document.getElementById('levelSound').playbackRate = 1.3;
                } else if (width >=10){
                    elem.style.backgroundColor = "orange";
                    //document.getElementById('levelSound').play();
                    document.getElementById('levelSound').playbackRate = 1.7;
                } else if (width < 10){
                    elem.style.backgroundColor = "red";
                    //document.getElementById('levelSound').play();
                    document.getElementById('levelSound').playbackRate = 2;
                }
                document.getElementById("myProgress").style.display = "block";
                elem.style.width = width + "%";
                elem.innerHTML = currentTime + "%";
            }else {
                document.getElementById("losingSound").play();
                document.getElementById("levelSound").pause();
                clearInterval(x);
            }
        } , 1000);
}

function checkFraction(s , m){
    let g = gcd(s,m);
    if(m<0){
        s *= -1;
        m *= -1;
    }
    if(s % m === 0){
        return s/m;
    } else if(g !== 1){
        s /= g;
        m /= g;
    }
    return [s,m];
}