const buttons = document.querySelectorAll('li');
const inputvalue = document.querySelector(".calculator__value");
const resultEvaluate = document.getElementById('result');
const clearInput = document.getElementById('clear');
const remove = document.getElementById('oneItemDelete');
let FinalResult;


const contentValue = (e) => {
    if (e.target === resultEvaluate) {
        FinalResult = eval(inputvalue.value);
        inputvalue.value = FinalResult;
        return;
    }


    if (e.target === clearInput) {
        inputvalue.value = "";
        return;
    }


    if (e.target === remove) {

        let arr = Object.assign([], inputvalue.value);
        arr.pop();
        let str = arr.join("");
        inputvalue.value = str;
        return;
    }

    inputvalue.value += e.target.innerText;
}

buttons.forEach((item) => {


    item.addEventListener('click', contentValue);
})