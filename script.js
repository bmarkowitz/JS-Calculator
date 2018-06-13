let controls = document.querySelector('.controls');
let output = document.querySelector('.output-text');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');

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
    },
    clickedNumber(event) {
        if (String(model.currentInput).length < 15) {
            if (model.operator) {
                model.currentInput = '';
            }
            model.currentInput += event.target.value;
            view.updateDisplay();
        }
    },
    clickedOperator(event) {
        model.operator = event.target.value;
        model.firstOperand = model.currentInput;
    },
    clickedEquals() {
        switch (model.operator) {
            case '+':
                model.secondOperand = model.currentInput;
                model.add();
                view.showResult();
                model.currentInput = model.tempResult;
                break;
            case '-':
                model.secondOperand = model.currentInput;
                model.subtract();
                view.showResult();
                model.currentInput = model.tempResult;
                break;
            case 'X':
                model.secondOperand = model.currentInput;
                model.multiply();
                view.showResult();
                model.currentInput = model.tempResult;
                break;
        }
    },
    allClear() {
        model.tempResult, model.firstOperand, model.secondOperand = 0;
        model.currentInput, model.operator = '';
        view.updateDisplay();
    }
}

controller.setUpHandlers();

