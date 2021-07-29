document.querySelector("#start").onclick = start;

function start(){
    showQuestion();
}

function showQuestion(){
    let zaribs = createZaribs(4);
    document.querySelector("#question").innerHTML = createQA(zaribs);
}

function createQA(zaribs) {
    let str2="", str1="", str0="" , operand1 = "", operand2 = "";
    str2 = checkPowerTwoZarib(zaribs[0]);
    if(str2===""){
        str1 = checkPowerOneZarib(zaribs[1]);
    } else {
        if(zaribs[1]>0){
            operand1 = " + ";
            str1 = checkPowerOneZarib(zaribs[1]);
        } else if(zaribs[1]<0){
            operand1 = " - ";
            str1 = checkPowerOneZarib(zaribs[1]*(-1));
        }
    }
    if(str1==="" && str2===""){
        return null;
    }
    if(zaribs[2]<0){
        operand2 = " - ";
        str0 = zaribs[2]*(-1);
    } else if(zaribs[2]>0){
        operand2 = " + ";
        str0 = zaribs[2];
    }
    return str2 + operand1 + str1 + operand2 + str0 + " = " + zaribs[3];
}

function createQB(zaribs) {

}

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

function answerQA(array){
    return (array[2]-array[1])/array[0];
}