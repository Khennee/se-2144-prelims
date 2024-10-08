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
const helloButton = document.getElementById('HelloButton')

let isCalculatorOn = false;
let displayValue = '';
let lastOperation = '';
let isShuttingDown = false;


const helloMessages = {
  'English': 'Hello!',
  'Spanish': 'Hola!',
  'French': 'Bonjour!',
  'German': 'Hallo!',
  'Italian': 'Ciao!',
  'Portuguese': 'Olá!',
  'Chinese': '你好!',
  'Japanese': 'こんにちは!',
  'Korean': '안녕하세요!',
  'Russian': 'Привет!',
  'Arabic': 'مرحبا!',
  'Hebrew': 'שלום!'
};

function adjustFontSize(length) {
  if (length >= 15) {
    display.style.fontSize = '20px';
  } else if (length >= 10) {
    display.style.fontSize = '30px';
  } else if (length >= 5) {
    display.style.fontSize = '40px';
  } else {
    display.style.fontSize = '50px'; 
  }
}


function clearDisplay() {
  displayValue = '';
  display.value = displayValue;
}

function helloFeature(){ 
  const languageKeys = Object.keys(helloMessages);
  const randomLanguageKey = languageKeys[Math.floor(Math.random() * languageKeys.length)];
  display.value = helloMessages[randomLanguageKey];
  display.style.fontSize = '30px';

  
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = true);
  helloButton.disabled = false;
}

helloButton.addEventListener('click', function () {
  if (isCalculatorOn && !isShuttingDown) {
    helloFeature();
  } 
  else{ 
    
  }
});

function startCalculator() {
  isCalculatorOn = true;
  displayValue = '';

  ACButton.style.backgroundColor = '#8BC34A'
  display.style.backgroundColor = '#FFC5C5'
  offButton.style.backgroundColor = '#C65765'
  decimal.style.backgroundColor = '#FFC5C5'
  backspaceButton.style.backgroundColor = '#A879C4'
  addButton.style.backgroundColor = '#A879C4'
  subtractButton.style.backgroundColor = '#A879C4'
  multiplyButton.style.backgroundColor = '#A879C4'
  divideButton.style.backgroundColor = '#A879C4'
  equalButton.style.backgroundColor = '#8BC34A'
  helloButton.style.backgroundColor = '#F7DC6F'
  for (let i = 0; i <= 9; i++) {
    const button = document.getElementById(i.toString());
    button.style.backgroundColor = '#FFC5C5';
  }

  ACButton.disabled = false;
  ACButton.value = 'AC';
}

function shutdownCalculator() {
  if (isCalculatorOn) {
    display.value = 'Goodbye!';
    isShuttingDown = true;

    setTimeout(function() {
      isCalculatorOn = false;
      displayValue = '';
      display.value = displayValue;

      ACButton.style.backgroundColor = '#C65765'
      display.style.backgroundColor = 'rgb(130, 130, 130)'
      offButton.style.backgroundColor = 'rgb(130, 130, 130)'
      decimal.style.backgroundColor = 'rgb(130, 130, 130)'
      backspaceButton.style.backgroundColor = 'rgb(130, 130, 130)'
      addButton.style.backgroundColor = 'rgb(130, 130, 130)'
      subtractButton.style.backgroundColor = 'rgb(130, 130, 130)'
      multiplyButton.style.backgroundColor = 'rgb(130, 130, 130)'
      divideButton.style.backgroundColor = 'rgb(130, 130, 130)'
      equalButton.style.backgroundColor = 'rgb(130, 130, 130)'
      helloButton.style.backgroundColor = 'rgb(130, 130, 130)'
      for (let i = 0; i <= 9; i++) {
        const button = document.getElementById(i.toString());
        button.style.backgroundColor = 'rgb(130, 130, 130)';
      }

      ACButton.disabled = false;
      ACButton.value = 'ON';
      lastOperation = '';
      isShuttingDown = false;
    }, 1000);
  }
}
ACButton.addEventListener('click', function() {
  if (isCalculatorOn) {
    clearDisplay();
  } else {
    startCalculator();
  }
});

offButton.addEventListener('click', function() {
  shutdownCalculator();
});

for (let i = 0; i <= 9; i++) {
  const button = document.getElementById(i.toString());
  button.addEventListener('click', function() {
    if (isCalculatorOn && !isShuttingDown) {
      if (lastOperation === '=') {
        if (!isOperator(displayValue[displayValue.length - 1])) {
          clearDisplay();
        }
      }
      displayNumber(i);
      lastOperation = ''; 
    }
  });
}

function backSpace() {
  if (displayValue.length > 0) {
    displayValue = displayValue.slice(0, -1);
    display.value = displayValue;
    adjustFontSize(displayValue.length); 
  }
}

backspaceButton.addEventListener('click', backSpace)

function decimalSign(){
  if (displayValue.length > 0){
    let lastNumber = displayValue.split(/[\+\-\×÷]/).pop();
    if (!lastNumber.includes('.')) {
      displayValue += '.';
      display.value = displayValue;
    }
  }
}

decimal.addEventListener('click', decimalSign)

let add = '+';
let subtract = '-';
let multiply = '×';
let divide = '÷';
function displayNumber(number) {
  if (displayValue.length < 20) {
    if (displayValue === '' && number === '-') {
      displayValue = '-';
    } else if (displayValue === '0' || displayValue === '-0') {
      displayValue = number === '0' ? '0' : number;
    } else {
      displayValue += number;
    }
    display.value = displayValue;
    adjustFontSize(displayValue.length);
  }
}


function addOperator() {
  if (displayValue.length > 0 && !isOperator(displayValue[displayValue.length - 1])) {
    displayValue += '+';
    display.value = displayValue;
  } else if (lastOperation === '=') {
    displayValue = '';
    display.value = displayValue;
    lastOperation = ''; 
  }
}

function subtractOperator() {
  if (displayValue === '') {
    displayValue = '-';
  } else if (!isOperator(displayValue[displayValue.length - 1])) {
    displayValue += '-';
  }
  display.value = displayValue;
}


function multiplyOperator() {
  if (displayValue.length > 0 && !isOperator(displayValue[displayValue.length - 1])) {
    displayValue += '×';
    display.value = displayValue;
  } else if (lastOperation === '=') {
    displayValue = '';
    display.value = displayValue;
    lastOperation = ''; 
  }
}

function divideOperator() {
  if (displayValue.length > 0 && !isOperator(displayValue[displayValue.length - 1])) {
    displayValue += '÷';
    display.value = displayValue;
  } else if (lastOperation === '=') {
    displayValue = '';
    display.value = displayValue;
    lastOperation = ''; 
  }
}

function isOperator(char) {
  return char === '+' || char === '-' || char === '×' || char === '÷';
}

function calculate() {
  try {
    let expression = displayValue;

    if (expression.startsWith('-')) {
      expression = '0' + expression;
    }

    let result = eval(expression.replace('×', '*').replace('÷', '/'));
    
    let resultStr = result.toString();
    if (resultStr.length > 15) {
      resultStr = resultStr.substring(0, 15) + '...';
    }

    displayValue = resultStr;
    display.value = displayValue;
    lastOperation = '=';

  } catch (error) {
    console.error("Error: ", error);
    displayValue = "Error";
    display.value = displayValue;
    lastOperation = '=';
  }
}


equalButton.addEventListener('click', calculate);
addButton.addEventListener('click', addOperator);
subtractButton.addEventListener('click', subtractOperator);
multiplyButton.addEventListener('click', multiplyOperator);
divideButton.addEventListener('click',divideOperator);
