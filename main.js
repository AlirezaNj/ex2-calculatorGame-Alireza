document.querySelector("#start").onclick = start;

function start(){
    showQuestion();
    const startButton = document.querySelector("#start");
    startButton.disabled = true;
    const jumpButton = document.querySelector("#jump");
    jumpButton.disabled = false;
    jumpButton.addEventListener('click' , showQuestion);
}

function checkValue(x , y) {
    if(x===y){
        alert(true);
    }
    alert(false);
}

function showQuestion(){
    let x = Math.random();
    let zaribs , q , answer;
    if (x<0.25){
        zaribs = createZaribs(3);
        q = createQA(zaribs);
        if(q!=null){
            document.querySelector("#question1").innerHTML = q;
        } else {
            showQuestion();
        }
        let correct = showOptions(optionsForQA(answerQA(zaribs)));
        
    } else if(x<0.5){
        zaribs = createZaribs(2);
        q = createQE(zaribs);
        if(q!=null) {
            document.querySelector("#question1").innerHTML = q;
        } else {
            showQuestion();
        }
    } else if(x<0.75){
        zaribs = createZaribsForC();
        q = createQC(zaribs);
        if(q!=null) {
        document.querySelector("#question1").innerHTML = "sqrt("+q+")";
        } else {
            showQuestion();
        }
    } else{
        zaribs = createZaribs(6);
        document.querySelector("#question1").innerHTML =
        "<div id=\"sorat\" class=\"item1\">\n" +
        "        <span id=\"sorat1\">\n" +
        "        </span>\n" +
        "            <span id=\"equal\">=</span>\n" +
        "            <span id=\"sorat2\">\n" +
        "        </span>\n" +
        "        </div>\n" +
        "        <div id=\"makhraj\">\n" +
        "        <span id=\"makhraj1\">\n" +
        "        </span>\n" +
        "            <span id=\"makhraj2\">\n" +
        "        </span>\n" +
        "        </div>"
        let sorat = createQB(zaribs.slice(0,2));
        let makhraj = createQB(zaribs.slice(2,4));
        let javab = createQBJ(zaribs.slice(4,6));
        if(javab ===null){
            showQuestion();
        } else{
            document.querySelector("#sorat1").innerHTML = sorat;
            document.querySelector("#makhraj1").innerHTML = makhraj;
            if(javab===0){
                document.querySelector("#sorat2").innerHTML = 0;
            } else {
                document.querySelector("#sorat2").innerHTML = javab[0];
                document.querySelector("#makhraj2").innerHTML = javab[1];
            }
        }
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
        operand = " + ";
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
        return zaribs;
    }

}    // e/f

function createQC(zaribs){
    let str1 = "",str2="",str3="";
    str3 = zaribs[2].toString();
    if(zaribs[0]===1){
        if(zaribs[1]===1){
            return null;
        } else {
            str2 = (zaribs[1]**2).toString();
            return str2+" * "+str3;
        }
    } else {
        str1=(zaribs[0]**2).toString();
        if(zaribs[1]===1){
            return str1+" * "+str3;
        } else {
            str2 = (zaribs[1]**2).toString();
            return str1+" * "+str2+" * "+str3;
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
    let str2 = "x^2" , str1 = "" , str0 = "" , operand1 = "" , operand2 = "";
    let zaribX = (zaribs[0]+zaribs[1])*(-1);
    let zarib0 = zaribs[0]*zaribs[1];
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
    let array;
    let a = Math.round(Math.random()*9+1);
    let b = Math.round(Math.random()*9+1);
    let temp = Math.random();
    let c;
    if(temp<0.25){
        c=2;
    } else if(temp<0.5){
        c=3;
    } else if(temp<0.75){
        c=5;
    } else {
        c=7;
    }
    array = [a,b,c];
    return array;
}

function answerQA(array){
    let s = array[2]-array[1];
    let m = array[0];
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

function optionsForQA(answer){
    let opt1 , opt2 , opt3 , opt4;
    if(typeof answer === 'number'){
        opt1 = answer;
        opt2 = answer*-1;
        opt3 = answer+1;
        opt4 = answer-1;

    } else {
        opt1 = answer[0]+"/"+answer[1];
        opt2 = (answer[0]*-1)+"/"+answer[1];
        if (answer[0]<0){
            opt3 = answer[1]+"/"+(answer[0]*-1);
            opt4 = (answer[1]*-1)+"/"+(answer[0]*-1);
        } else {
            opt3 = answer[1]+"/"+answer[0];
            opt4 = (answer[1]*-1)+"/"+answer[0];
        }
    }
    return [opt1 , opt2 , opt3 , opt4];
}

function answerQB(array){
    return (array[3]*array[4]-array[1]*array[5])/(array[0]*array[5]-array[2]*array[4]);
}

function answerQC(array){
    let a = array[0]*array[1];
    return a+"sqrt("+array[2]+")";
}

function answerQD(array){}

function answerQE(array){
    return array;
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
    let options = document.querySelectorAll(".opt");
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