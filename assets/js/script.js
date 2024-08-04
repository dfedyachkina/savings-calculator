// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
let introSection = document.getElementById("intro");
let calculatorSection = document.getElementById("calculate");
let calculator = document.getElementById("calculator");
let calculateResult = document.getElementById("calculated-result");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let form = document.getElementById("calculate-form");
const resultText = document.getElementById("result");


document.addEventListener("DOMContentLoaded", function () {
    startBtn.addEventListener("click", function() {
        introSection.classList.add("hide");
        calculatorSection.classList.remove("hide");
    });

    resetBtn.addEventListener("click", function() {
        window.location.reload();
    });


    form.addEventListener("submit", function(event) {
        event.preventDefault();
    
        if (this.checkValidity()) {
            // form is valid
            checkData();
        } else {
            // form is not valid
            this.reportValidity();
        }
    });
});



/**
 * Calculate all entered data
 * Display the result to the user
 */ 

function letsCalculate(desiredSavings, salary, rentMortgage, bills, food, otherExpenses) {
    let typeOfSalary = findCheckedRadioButton();
    if (typeOfSalary === "hourly") {
        resultText.innerText = `Your hourly salary ${salary} euro has been converted to yearly salary.`
        salary = hourlySalary(salary);
    } else if (typeOfSalary === "monthly") {
        resultText.innerText = `Your monthly salary ${salary} euro has been converted to yearly salary.`
        salary = monthlySalary(salary);
    } else if (typeOfSalary === null) {
        alert(`You haven't clicked on the radio button! Please choose your type of salary`);
        throw `Radio button hasn't been clicked`;
    }
    document.getElementById("yearly-salary").innerText = `Your yearly salary: ${salary}`;
    const taxInfo = taxCalculator(salary);
    document.getElementById("tax").innerText = taxInfo.message;
    const taxMonthly = taxInfo.taxMonthly;
    document.getElementById("six-month-heading").innerText = `What if you try to save ${desiredSavings} euro within 6 month:`;
    document.getElementById("six-month").innerText = sixMonthSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
    document.getElementById("one-year-heading").innerText = `What if you try to save ${desiredSavings} euro within 1 year:`;
    document.getElementById("one-year").innerText = oneYearSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
    document.getElementById("two-years-heading").innerText = `\nWhat if you try to save ${desiredSavings} euro within 2 years:`; 
    document.getElementById("two-years").innerText = twoYearsSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
    document.getElementById("three-years-heading").innerText = `What if you try to save ${desiredSavings} euro within 3 years:`;
    document.getElementById("three-years").innerText = threeYearsSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
}

/**
 * Check entered data by a user
 * If data are correct - the code is going through calculation
 */

function checkData() {
    let desiredSavings = parseInt(document.getElementById("desired-saving").value);
    let salary = parseInt(document.getElementById("salary").value);
    let rentMortgage = parseInt(document.getElementById("rent-mortgage").value);
    let bills = parseInt(document.getElementById("bills").value);
    let food = parseInt(document.getElementById("food").value);
    let otherExpenses = parseInt(document.getElementById("other-expenses").value);
    if (desiredSavings <= 100) {
        resultText.innerText = `You entered desired saving: ${desiredSavings}. The value cannot be lees than 1. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (salary <= 100) {
        resultText.innerText = `You entered salary: ${salary}. The value cannot be lees than 1. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (rentMortgage <= 0) {
        resultText.innerText = `You entered rent/mortgage expenses: ${rentMortgage}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (bills <= 0) {
        resultText.innerText = `You entered bills expenses: ${bills}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (food <= 0) {
        resultText.innerText = `You entered food expenses: ${food}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (otherExpenses <= 0) {
        resultText.innerText = `You entered other expenses: ${otherExpenses}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else {
        calculator.classList.add("hide");
        calculateResult.classList.remove("hide");
        letsCalculate(desiredSavings, salary, rentMortgage, bills, food, otherExpenses);
    }
}

/**
 * Find the checked radio button
 * Assign it to typeOfSalary
 */


function findCheckedRadioButton() {
    let selectedRadioButton = document.querySelector('input[type="radio"]:checked');
    if (selectedRadioButton) {
        return selectedRadioButton.getAttribute("data-type");
    } else {
        return null;
    }
}


/**
 * Conversion salary from hourly to yearly
 */
function hourlySalary(salary) {
    return salary * 8 * 5 * 4 * 12;
}

/**
 * Conversion salary from monthly to yearly 
 */
function monthlySalary(salary) {
    return salary * 12;
}

/**
 * Calculate tax based on yearly salary
 */

function taxCalculator(salary) {
    let taxYearly, taxMonthly;
    if (salary < 40000) {
        taxYearly = Math.round(salary * 0.2);
        taxMonthly = Math.round(taxYearly / 12);
        return {
            message: `Your rate of taxes is 20%, because your annual salary is less than 40,000 euro.\n The total tax: ${taxYearly}\n Your tax monthly: ${taxMonthly}`,
            taxMonthly: taxMonthly
        };
    } else {
        taxYearly = Math.round(salary * 0.4);
        taxMonthly = Math.round(taxYearly / 12);
        return {
            message: `Your rate of taxes is 40%, because your annual salary is equal or more than 40,000 euro.\n The total tax: ${taxYearly}\n Your tax monthly: ${taxMonthly}`,
            taxMonthly: taxMonthly
        };
    }
}

/**
 * Calculate how much person should save every month during 6 month
 */

function sixMonthSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly) {
    let eachMonthSavings = Math.round(desiredSavings / 6);
    let howMuchMoneyLeftMonthly = Math.round((salary / 12) - taxMonthly - rentMortgage - (bills / 2) - food - otherExpenses);
    if (eachMonthSavings <= howMuchMoneyLeftMonthly) {
        let moneyLeft = howMuchMoneyLeftMonthly - eachMonthSavings;
        return `\nYou can afford to save ${desiredSavings} euro within 6 month.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        return `\nUnfortunately, it's impossible to save ${desiredSavings} euro within 6 month.\nThere is how much money needs every month: ${eachMonthSavings} euro\n There is how much money left you have every month: ${howMuchMoneyLeftMonthly} euro`;
    }
}

/**
 * Calculate how much person should save every month during 1 year
 */

function oneYearSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly) {
    let eachMonthSavings = Math.round(desiredSavings / 12);
    let howMuchMoneyLeftMonthly = Math.round((salary / 12) - taxMonthly - rentMortgage - (bills / 2) - food - otherExpenses);
    if (eachMonthSavings <= howMuchMoneyLeftMonthly) {
        let moneyLeft = howMuchMoneyLeftMonthly - eachMonthSavings;
        return `\nYou can afford to save ${desiredSavings} euro within 1 year.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        return `\nUnfortunately, it's impossible to save ${desiredSavings} euro within 1 year.\nThere is how much money needs every month: ${eachMonthSavings} euro\n There is how much money left you have every month after taxes and all your expenses: ${howMuchMoneyLeftMonthly} euro`;
    }
}

/**
 * Calculate how much person should save every month during 2 years
 */

function twoYearsSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly) {
    let eachMonthSavings = Math.round(desiredSavings / 24);
    let howMuchMoneyLeftMonthly = Math.round((salary / 12) - taxMonthly - rentMortgage - (bills / 2) - food - otherExpenses);
    if (eachMonthSavings <= howMuchMoneyLeftMonthly) {
        let moneyLeft = howMuchMoneyLeftMonthly - eachMonthSavings;
        return `\nYou can afford to save ${desiredSavings} euro within 2 years.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        return `\nUnfortunately, it's impossible to save ${desiredSavings} euro within 2 years.\nThere is how much money needs every month: ${eachMonthSavings} euro\n There is how much money left you have every month after taxes and all your expenses: ${howMuchMoneyLeftMonthly} euro`;
    }
}

/**
 * Calculate how much person should save every month during 3 years
 */

function threeYearsSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly) {
    let eachMonthSavings = Math.round(desiredSavings / 36);
    let howMuchMoneyLeftMonthly = Math.round((salary / 12) - taxMonthly - rentMortgage - (bills / 2) - food - otherExpenses);
    if (eachMonthSavings <= howMuchMoneyLeftMonthly) {
        let moneyLeft = howMuchMoneyLeftMonthly - eachMonthSavings;
        return `\nYou can afford to save ${desiredSavings} euro within 3 years.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        return `\nUnfortunately, it's impossible to save ${desiredSavings} euro within 3 years.\nThere is how much money needs every month: ${eachMonthSavings} euro\n There is how much money left you have every month after taxes and all your expenses ${howMuchMoneyLeftMonthly} euro`;
    }
}
