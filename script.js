


//import { calculate } from './calculator.js';

// TODO: Faire la manipulation du DOM dans ce fichier

// Déclaration des variables globales
let input = ""; 
let calculation = "";
let result = ""; 
let operator = ""; 
let hasDecimal = false; 
let maxLength = 10; 

// Initialisation des éléments du DOM
const inputElement = document.getElementById("input"); 
const calculationElement = document.getElementById("calcul"); 
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll("#plus, #minus, #times, #divideby, #equals"); 
const clearButton = document.getElementById("clear");
const resetButton = document.getElementById("reset");
const plusMinusButton = document.getElementById("plusoumoins");
const percentageButton = document.getElementById("percentage");
const dotButton = document.querySelector(".dot"); 


// Initialisation calculatrice et écouteurs d'événements aux boutons
function init() {
  digitButtons.forEach((button) => {
    button.addEventListener("click", handleDigit);
  });
  operatorButtons.forEach((button) => {
    button.addEventListener("click", handleOperator);
  });
  clearButton.addEventListener("click", handleClear);
  resetButton.addEventListener("click", handleReset);
  plusMinusButton.addEventListener("click", handlePlusMinus);
  percentageButton.addEventListener("click", handlePercentage);
  dotButton.addEventListener("click", handleDigit);

  updateDisplay();
}

//conversion des boutons submit
let newOperators = [];
for (let i = 0; i < operatorButtons.length; i++) {
    const element = operatorButtons[i];
    element.type = "button";
    newOperators.push(element);
}

function updateDisplay() {
  inputElement.value = input;
  calculationElement.textContent = calculation;
}

function handleDigit(event) {
  const digit = event.target.textContent;
  if (input === "" || input === result.toString()) {
    input = "";
    result = 0;
    hasDecimal = false;
  }

  // Vérification si l'entrée est inférieure à la longueur maximale
  if (input.length < maxLength) {
    if (digit === ".") {
     if (!hasDecimal) {
        input += digit;
        hasDecimal = true;
      }
    } else {
      input += digit;
    }
    updateDisplay();
  }
}

// Gestion de l'entrée des opérateurs par l'utilisateur
function handleOperator(event) {
  const newOperator = event.target.textContent;

  if (input !== "") {
    if (calculation === "") {
      result = parseFloat(input);
      calculation = input;
    } else {
      if (operator !== "") {
        result = calculate(result, parseFloat(input), operator);
        calculation += " " + input;
      }
    }
    // Affectation du nouvel opérateur à l'opérateur et au calcul
    operator = newOperator;
    calculation += " " + operator;

    if (operator === "=") {
     input = result.toString();
      operator = "";
      calculation = "";
    } else {
      input = "";
      hasDecimal = false;
    }
    updateDisplay();
  }
}

// Gestion de l'effacement de l'entrée ou du calcul de l'utilisateur
function handleClear() {
  if (input !== "") {
    input = "";
    hasDecimal = false;
  } else {
    calculation = "";
    operator = "";
  }
  updateDisplay();
}

// Réinitialisation de la calculatrice à son état initial
function handleReset() {
  input = "";
  calculation = "";
  result = 0;
  operator = "";
  hasDecimal = false;
  updateDisplay();
}

// Inversion du signe de l'entrée de l'utilisateur
function handlePlusMinus() {
  if (input !== "" && input !== "0") {
    if (input.startsWith("-")) {
      input = input.slice(1);
    } else {
      input = "-" + input;
    }
    updateDisplay();
  }
}

// Conversion de l'entrée de l'utilisateur en pourcentage
function handlePercentage() {
  if (input !== "") {
    input = (parseFloat(input) / 100).toString();
   hasDecimal = input.includes(".");
  updateDisplay();
  }
}

// Calcul entre deux nombres et un opérateur donnés
function calculate(num1, num2, op) {
  let res;
switch (op) {
    case "+":
      res = num1 + num2;
      break;
    case "-":
      res = num1 - num2;
      break;
    case "×":
      res = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        alert('Impossible de diviser par zéro');
        return; 
      }
      res = num1 / num2;
      break;
    default:
      res = num1;
  }

  return res;
}
document.addEventListener("DOMContentLoaded", init);
// TODO: Faire la manipulation du DOM dans ce fichier
