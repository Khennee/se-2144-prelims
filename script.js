let isCalculatorOn = false;
let displayValue = '';
let lastOperation = '';

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

function displayNumber(number) {
  if (displayValue.length < 20) {
    displayValue += number;
    display.value = displayValue;
    if (displayValue.length >= 15) {
      display.style.fontSize = '20px';
    } 
    else if (displayValue.length >= 10) {
      display.style.fontSize = '30px';
    }
    else if (displayValue.length >= 5) {
      display.style.fontSize = '40px';
    } else {
      display.style.fontSize = '50px';
    }
  }
}

function clearDisplay() {
  displayValue = '';
  display.value = displayValue;
}

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

function helloFeature(){ 
  const languageKeys = Object.keys(helloMessages);
  const randomLanguageKey = languageKeys[Math.floor(Math.random() * languageKeys.length)];
  display.value = helloMessages[randomLanguageKey];
  
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.disabled = true);
  
  setTimeout(function() {
    display.value = '';
    buttons.forEach(button => button.disabled = false);
  }, 1000);
}

const onningMessages = {
  'English': 'Onning',
  'Spanish': 'Encendiendo',
  'French': 'Démarrage',
  'German': 'Einsteigen',
  'Italian': 'Accensione',
  'Portuguese': 'Ligando',
  'Chinese': '打开',
  'Japanese': '点ける',
  'Korean': '켜다',
  'Russian': 'Включение',
  'Arabic': 'تشغيل',
  'Hebrew': 'הדלקה',
  'Hindi': 'चालू हो रहा है',
};

function startCalculator() {
  isCalculatorOn = true;
  displayValue = '';
  
  let dotInterval = null;
  let dots = '';

  const languageKeys = Object.keys(onningMessages); 
  const randomLanguageKey = languageKeys[Math.floor(Math.random() * languageKeys.length)];
  dotInterval = setInterval(() => {
    display.value = onningMessages[randomLanguageKey]+ dots;
    dots = dots === '...' ? '' : dots + '.';
    display.style.fontSize = '30px'
  }, 500);

  setTimeout(function() {
    display.value = '';
    clearInterval(dotInterval);
  }, 5000);
  
  
  ACButton.disabled = false;
  ACButton.value = 'AC';
}


const goodbyeMessages = {

  'English': 'Goodbye!',
  'Spanish': 'Adiós!',
  'French': 'Au revoir!',
  'German': 'Auf Wiedersehen!',
  'Italian': 'Arrivederci!',
  'Portuguese': 'Tchau!',
  'Chinese': '再见',
  'Japanese': 'さようなら!',
  'Korean': '안녕히 가세요!',
  'Russian': 'До свидания!',
  'Arabic': 'مع السلامة!',
  'Hebrew': 'להתראות!',
  'Hindi': 'अलविदा!',
};

function shutdownCalculator() {
  isCalculatorOn = false;
  displayValue = '';

  let dotInterval = null;
  let dots = '';

  const languageKeys = Object.keys(goodbyeMessages); 
  const randomLanguageKey = languageKeys[Math.floor(Math.random() * languageKeys.length)];
  dotInterval = setInterval(() => {
    display.value = goodbyeMessages[randomLanguageKey]+ dots;
    dots = dots === '...' ? '' : dots + '.';
    display.style.fontSize = '30px'
  }, 500);

  setTimeout(function() {
    display.value = '';
    clearInterval(dotInterval);
  }, 5000);

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

offButton.addEventListener('click', function() {
  shutdownCalculator();
});

for (let i = 0; i <= 9; i++) {
  const button = document.getElementById(i.toString());
  button.addEventListener('click', function() {
    if (isCalculatorOn) {
      if (lastOperation === '=') { 
        clearDisplay(); 
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
  if (displayValue.length > 0 && lastOperation !== '=') {
    displayValue += add;
    display.value = displayValue;
  } else if (lastOperation === '=') {
    displayValue = displayValue + add;
    display.value = displayValue;
    lastOperation = ''; 
  }
}

function subtractOperator(){
  if (displayValue.length > 0 && lastOperation !== '=') {
    displayValue += subtract;
    display.value = displayValue
  } else if (lastOperation === '=') {
    displayValue = displayValue + subtract;
    display.value = displayValue
    lastOperation = ''; 
  }
}

function multiplyOperator(){ 
  if (displayValue.length > 0 && lastOperation !== '=') {
    displayValue += multiply;
    display.value = displayValue
  } else if (lastOperation === '=') {
    displayValue = displayValue + multiply;
    display.value = displayValue
    lastOperation = ''; 
  }
}

function divideOperator(){ 
  if (displayValue.length > 0 && lastOperation !== '=') {
    displayValue += divide; 
    display.value = displayValue
  } else if (lastOperation === '=') {
    displayValue = displayValue + divide; 
    display.value = displayValue
    lastOperation = ''; 
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
  lastOperation = '='
}

equalButton.addEventListener('click', calculate);
addButton.addEventListener('click', addOperator);
subtractButton.addEventListener('click', subtractOperator);
multiplyButton.addEventListener('click', multiplyOperator);
divideButton.addEventListener('click',divideOperator);
helloButton.addEventListener('click', helloFeature)

