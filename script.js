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
const container = document.getElementById("container");
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
        if(curVal.textContent.length < 10) {
            curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
            container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
        }
    });
}

for(let i = 0; i < opBtn.length; i++) {
    opBtn[i].addEventListener("click", () => {
        addOperation(opBtn[i].textContent);
        canAddDot = true;
        if(curVal.textContent.length < 10) {
            curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
            container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
        }
    });
}

function addNumber(number) {
    if(curVal.textContent.length < 13) {
        if(text[0] === "0" && text.length == 1) {
            text[0] = number;
        } else {
            text.push(number);
        }
        curVal.textContent = text.join("");
    }
}

function addOperation(operation) {
    if(curVal.textContent.length < 13) {
        if(text.join("").match(/[\d\(\)]$/)) {
            text.push(operation);
        } else {
            text.pop();
            text.push(operation);
        }
        curVal.textContent = text.join("");
    }
}

function clear() {
    curVal.textContent = "0";
    text = curVal.textContent.split("");
    canAddDot = true;
    curVal.style.fontSize = "4rem";
    container.style.marginTop = "0";
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
    if(curVal.textContent.length < 10) {
        curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
        container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
    }
}

function percent() {
    if(curVal.textContent.length < 13) {
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
    if(curVal.textContent.length < 10) {
        curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
        container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
    }
    curVal.textContent = text.join("");
    }
}

function parenthesis() {
    if(curVal.textContent.length < 13) {
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
    if(curVal.textContent.length < 10) {
        curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
        container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
    }
    curVal.textContent = text.join("");
    }
}

function addDot() {
    if(curVal.textContent.length < 13) {
        if(text.join("").match(/\d$/) && canAddDot) {
            text.push(".");
            curVal.textContent = text.join("");
            canAddDot = false;
            if(curVal.textContent.length < 10) {
                curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
                container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
            }
        }
    }
}

function equals() {
    let equation = text.join("").replaceAll("×", "*").replaceAll("÷", "/");
    let result = eval(equation);
    prevVal.textContent = curVal.textContent;
    curVal.textContent = result;
    text = curVal.textContent.split("");
    equation = [];
    if(curVal.textContent.length < 10) {
        curVal.style.fontSize = "calc(4rem - (" + curVal.textContent.length + "px) * 2)";
        container.style.marginTop = "calc((" + curVal.textContent.length + "px) * 2.6)";
    }
}