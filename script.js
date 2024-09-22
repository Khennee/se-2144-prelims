let isCalculatorOn = false;
let displayValue = '';

const display = document.getElementById('display');
const ACButton = document.getElementById('AC');
const offButton = document.getElementById('OffButton');
const backspaceButton = document.getElementById('Backspace')
const addButton = document.getElementById('Add')
const subtractButton = document.getElementById('Subtract')
const multiplyButton = document.getElementById('Multiply')
const divideButton = document.getElementById('Divide')
const equalButton = document.getElementById('Equal')
const decimal = document.getElementById('Decimal')

function displayNumber(number) {
  if (displayValue.length < 10) {
    displayValue += number;
    display.value = displayValue;
  }
}

function clearDisplay() {
  displayValue = '';
  display.value = displayValue;
}

function startCalculator() {
    isCalculatorOn = true;
    displayValue = '';
    display.value = 'Hi!';
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
    
    setTimeout(function() {
      display.value = '';
      buttons.forEach(button => button.disabled = false);
    }, 2000);
    
    ACButton.disabled = false;
    ACButton.value = 'AC';
  }

function shutdownCalculator() {
  isCalculatorOn = false;
  displayValue = '';
  display.value = 'Goodbye!';
  setTimeout(function() {
    display.value = '';
  }, 2000);

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = true);
  ACButton.disabled = false;
  ACButton.value = 'ON';
}

ACButton.addEventListener('click', function() {
  if (isCalculatorOn) {
    clearDisplay();
  } else {
    startCalculator();
  }
});

offButton.addEventListener('click', shutdownCalculator);

for (let i = 0; i <= 9; i++) {
  const button = document.getElementById(i.toString());
  button.addEventListener('click', function() {
    if (isCalculatorOn) {
      displayNumber(i);
    }
  });
}

function backSpace() {
    if (displayValue.length > 0) {
      displayValue = displayValue.slice(0, -1);
      display.value = displayValue;
    }
  }

backspaceButton.addEventListener('click', backSpace)

function decimalSign(){ 
  if (displayValue.length < 10){
    displayValue += '.';
    display.value = displayValue
  }
}

decimal.addEventListener('click', decimalSign)

let add = '+';
let subtract = '-';
let multiply = '×';
let divide = '÷';

function addOperator() {
    if (displayValue.length > 0 && !displayValue.includes('+')) {
        displayValue += add;
        display.value = displayValue;
    }
}
function subtractOperator(){
    if (displayValue.length > 0 && !displayValue.includes('-')) {
        displayValue += subtract;
        display.value = displayValue
    }
}

function multiplyOperator(){ 
    if (displayValue.length > 0 && !displayValue.includes('×')) {
        displayValue += multiply;
        display.value = displayValue
    }
}
function divideOperator(){ 
    if (displayValue.length > 0 && !displayValue.includes('÷')) {
        displayValue += divide; 
        display.value = displayValue
    }
}

function calculate() {
  if (displayValue.includes('+')) {
    let numbers = displayValue.split('+');
    let result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
    displayValue = result.toString();
    display.value = displayValue;
  }
  else if (displayValue.includes('-')) {
    let numbers = displayValue.split('-');
    let result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
    displayValue = result.toString();
    display.value = displayValue;
  }
  else if (displayValue.includes('×')) { 
    let numbers = displayValue.split('×');
    let result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
    displayValue = result.toString();
    display.value = displayValue;
  }
  else if (displayValue.includes('÷')){ 
    let numbers = displayValue.split('÷');
    let result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    displayValue = result.toString();
    display.value = displayValue;
  }
}

equalButton.addEventListener('click', calculate);
addButton.addEventListener('click', addOperator);
subtractButton.addEventListener('click', subtractOperator);
multiplyButton.addEventListener('click', multiplyOperator);
divideButton.addEventListener('click',divideOperator);
