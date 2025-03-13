const curVal = document.getElementById("current-val");
const prevVal = document.getElementById("previous-val");
const clearBtn = document.getElementById("clear");
const parenBtn = document.getElementById("parenthesis");
const percentBtn = document.getElementById("percent");
const equalsBtn = document.getElementById("equals");
const delBtn = document.getElementById("delete");
const dotBtn = document.getElementById("dot");
const numBtn = document.querySelectorAll(".number");
const opBtn = document.querySelectorAll(".operation");
let text = curVal.textContent.split("");
let canAddDot = true;

clearBtn.addEventListener("click", clear);

delBtn.addEventListener("click", del);

percentBtn.addEventListener("click", percent); 

parenBtn.addEventListener("click", parenthesis);

dotBtn.addEventListener("click", addDot);

equalsBtn.addEventListener("click", equals);

for(let i = 0; i < numBtn.length; i++) {
    numBtn[i].addEventListener("click", () => {
        addNumber(numBtn[i].textContent);
    });
}

for(let i = 0; i < opBtn.length; i++) {
    opBtn[i].addEventListener("click", () => {
        addOperation(opBtn[i].textContent);
        canAddDot = true;
    });
}

function addNumber(number) {
    if(text[0] === "0" && text.length == 1) {
        text[0] = number;
    } else {
        text.push(number);
    }
    curVal.textContent = text.join("");
}

function addOperation(operation) {
    if(text.join("").match(/[\d\(\)]$/)) {
        text.push(operation);
    } else {
        text.pop();
        text.push(operation);
    }
    curVal.textContent = text.join("");
}

function clear() {
    curVal.textContent = "0";
    text = curVal.textContent.split("");
    canAddDot = true;
}

function del() {
    if(text.length > 1){
        const popped = text.pop();
        if(popped == ".") {
            canAddDot = true;
        }
        curVal.textContent = text.join("");
    } else {
        text[0] = "0";
        curVal.textContent = text.join("");
    }
}

function percent() {
    let number = 0;
    if(text.join("").match(/\d+\.\d*$/)) {
        number = parseFloat(text.join("").match(/\d+\.\d*$/));
        number = number / 100;
        text = (text.join("").replace(/\d+\.\d*$/,"") + number).split("");
    } else {
        number = parseInt(text.join("").match(/\d+$/));
        number = number / 100;
        text = (text.join("").replace(/\d+$/,"") + number).split("");
    }
    curVal.textContent = text.join("");
}

function parenthesis() {
    opNum = 0;
    clNum = 0;
    if(text.join("") === "0") {
        text.pop();
        text.push("(");
    } else {
        text.forEach((e) => {
            if(e === "(") {
                opNum++;
            } else if (e === ")") {
                clNum++;
            }
        })
        if(opNum > clNum) {
            text.push(")");
        } else {
            text.push("(");
        }
    }
    curVal.textContent = text.join("");
}

function addDot() {
    if(text.join("").match(/\d$/) && canAddDot) {
        text.push(".");
        curVal.textContent = text.join("");
        canAddDot = false;
    }
}

function equals() {
    let equation = text.join("").replaceAll("×", "*").replaceAll("÷", "/");
    let result = eval(equation);
    prevVal.textContent = curVal.textContent;
    curVal.textContent = result;
    text = curVal.textContent.split("");
    equation = [];
}