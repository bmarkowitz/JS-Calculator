const controls = document.querySelector('.controls');
const output = document.querySelector('.output-text');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const options = document.querySelectorAll('.option');

//Model
const model = {
    tempResult: 0,
    firstOperand: 0,
    secondOperand: 0,
    currentInput: '',
    operator: '',
    executed: false,
    add() {
        model.tempResult = parseFloat(model.firstOperand) + parseFloat(model.secondOperand);
    },
    subtract() {
        model.tempResult = parseFloat(model.firstOperand) - parseFloat(model.secondOperand);
    },
    multiply() {
        model.tempResult = parseFloat(model.firstOperand) * parseFloat(model.secondOperand);
    },
    divide() {
        model.tempResult = parseFloat(model.firstOperand) / parseFloat(model.secondOperand);
    },
}

//View
const view = {
    updateDisplay() {
        output.textContent = model.currentInput;
    },
    showResult() {
        if (String(model.tempResult).length > 15 && String(model.tempResult).includes('.')) {
            output.textContent = parseFloat(model.tempResult.toFixed(8));
        }
        else {
            output.textContent = model.tempResult;
        }
    },
    enableDecimal(event) {
        decimal.disabled = false;
    },
    disableDecimal(event) {
        decimal.disabled = true;
    },
    negate() {
        output.textContent = output.textContent * -1;
    }
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
        equals.addEventListener('click', this.execute);
        options.forEach(function (element) {
            element.addEventListener('click', controller.clickedOption);
        });
    },
    clickedNumber(event) {
        if (model.currentInput) {
            if (String(model.currentInput).length < 15 && model.executed == false) {
                model.currentInput += event.target.value;
                view.updateDisplay();
            }
        }
        else {
            if (event.target.value !== '0') {
                model.currentInput += event.target.value;
                view.updateDisplay();
            }
        }
    },
    clickedOperator(event) {
        if (!model.executed) {
            controller.execute();
        }
        view.enableDecimal();
        model.executed = false;
        model.operator = event.target.value;
        model.currentInput = output.textContent;
        model.firstOperand = model.currentInput;
        model.currentInput = '';
    },
    execute() {
        model.executed = true;
        view.disableDecimal();
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
            case '/':
                model.secondOperand = model.currentInput;
                model.divide();
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
            case '.':
                view.disableDecimal(event);
                model.currentInput += '.';
                view.updateDisplay();
                break;
            case '+/-':
                view.negate();
        }
    },
    allClear() {
        model.executed = false;
        model.tempResult = 0;
        model.firstOperand = 0;
        model.secondOperand = 0;
        model.currentInput = '';
        output.textContent = '0';
        model.operator = '';
        view.enableDecimal();
    }
}

controller.setUpHandlers();

