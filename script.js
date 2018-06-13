let controls = document.querySelector('.controls');
let output = document.querySelector('.output-text');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const options = document.querySelectorAll('.option');

//Model
const model = {
    tempResult: 0,
    firstOperand: 0,
    secondOperand: 0,
    currentInput: '',
    operator: '',
    add() {
        model.tempResult = Number(model.firstOperand) + Number(model.secondOperand);
    },
    subtract() {
        model.tempResult = Number(model.firstOperand) - Number(model.secondOperand);
    },
    multiply() {
        model.tempResult = Number(model.firstOperand) * Number(model.secondOperand);
    }
}

//View
const view = {
    updateDisplay() {
        output.innerHTML = model.currentInput;
    },
    showResult() {
        output.innerHTML = model.tempResult;
    },
}

//Controller
const controller = {
    setUpHandlers() {
        numbers.forEach(function (element) {
            element.addEventListener('click', controller.clickedNumber);
        });
        operators.forEach(function (element) {
            element.addEventListener('click', controller.clickedOperator);
        });
        equals.addEventListener('click', this.clickedEquals);
        options.forEach(function (element) {
            element.addEventListener('click', controller.clickedOption);
        });
    },
    clickedNumber(event) {
        if (String(model.currentInput).length < 15) {
            model.currentInput += event.target.value;
            view.updateDisplay();
        }
    },
    clickedOperator(event) {
        model.operator = event.target.value;
        model.currentInput = output.innerHTML;
        model.firstOperand = model.currentInput;
        model.currentInput = '';
    },
    clickedEquals() {
        switch (model.operator) {
            case '+':
                model.secondOperand = model.currentInput;
                model.add();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
            case '-':
                model.secondOperand = model.currentInput;
                model.subtract();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
            case 'X':
                model.secondOperand = model.currentInput;
                model.multiply();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
        }
    },
    clickedOption(event) {
        let optionClicked = event.target.value;
        switch (optionClicked) {
            case 'AC':
                controller.allClear();
                break;
        }
    },
    allClear() {
        model.tempResult = 0;
        model.firstOperand = 0;
        model.secondOperand = 0;
        model.currentInput = '';
        output.innerHTML = '0';
        model.operator = '';
    }
}

controller.setUpHandlers();

