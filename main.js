document.querySelector("#start").onclick = start();

function start(){
    showQuestion();
}

function showQuestion(){
    let zaribs = createZaribs(3);
    document.querySelector("#question").innerHTML = createQA(zaribs);
}

function createQA(zaribs) {
    let str1="" , str2="", operand = "";
    if(zaribs[0]===1){
        str1="x";
    } else if(zaribs[0]===0){
        return null;
    } else {
        str1 = zaribs[0] + "x";
    }
    if(zaribs[1]<0){
        operand = " - ";
        zaribs[1]*=-1;
        str2 = zaribs[1];
    } else if(zaribs[1]>0){
        operand = " + ";
        str2 = zaribs[1];
    }
    let result = str1+operand+str2+" = "+zaribs[2];
    return result;
}

function createQB() {
    let zaribs = createZaribs(6);
    return zaribs[0] + "x + " + zaribs[2];
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