// script.js
window.onload = function () {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let displayValue = ''; // Start with an empty string
    let operator = '';
    let firstOperand = null;
    let waitingForSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.id === 'clear') {
                clearDisplay();
            } else {
                handleNumber(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(num) {
        if (waitingForSecondOperand) {
            displayValue = num;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? num : displayValue + num;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator && !waitingForSecondOperand) {
            const result = performCalculation(firstOperand, inputValue, operator);
            displayValue = String(result);
            firstOperand = result;
        }

        operator = nextOperator;
        waitingForSecondOperand = true;
        displayValue += ` ${operator} `; // Display operator with spaces for clarity
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function clearDisplay() {
        displayValue = '0';
        
        operator = '';
        waitingForSecondOperand = false;
    }

    function updateDisplay() {
        display.innerText = displayValue.trim(); // Trim any extra spaces
    }

    clearDisplay(); // Initialize display with '0'
};
