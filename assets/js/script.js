/* jshint esversion: 11 */
// Global variables
let introSection = document.getElementById("intro");
let calculatorSection = document.getElementById("calculate");
let calculator = document.getElementById("calculator");
let calculateResult = document.getElementById("calculated-result");
let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submit-button");
let resetBtn = document.getElementById("reset");
let form = document.getElementById("calculate-form");
let inputs = form.querySelectorAll("input, radio");
let calculateTaxHeading = document.getElementById("calculate-tax-heading");
let boxResult = document.getElementById("boxes");
const resultText = document.getElementById("result");

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
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

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent the default form submission

                let nextInput = inputs[index + 1]; // Get the next input element
                if (nextInput) {
                    nextInput.focus(); // Move the focus to the next input element
                } else {
                    submitBtn.focus(); // Focus the submit button if it's the last input
                }
            }
        });
    });

});

/**
 * Calculate all entered data
 * Display the result to the user
 */ 

function letsCalculate(desiredSavings, salary, rentMortgage, bills, food, otherExpenses) {
    let typeOfSalary = findCheckedRadioButton();
    if (typeOfSalary === "hourly") {
        resultText.innerText = `Your hourly salary ${salary} euro has been converted to yearly salary.`;
        salary = hourlySalary(salary);
    } else if (typeOfSalary === "monthly") {
        resultText.innerText = `Your monthly salary ${salary} euro has been converted to yearly salary.`;
        salary = monthlySalary(salary);
    } else if (typeOfSalary === null) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
    
        resultText.innerText = "You haven't checked a radio button - please click on RESET and try again";
        resultText.style.color = "red";
        document.getElementById("yearly-salary").classList.add("hide");
        document.getElementById("tax").classList.add("hide");
        return;
    }
    document.getElementById("yearly-salary").innerText = `Your yearly salary: ${salary}`;
    let taxInfo = taxCalculator(salary);
    document.getElementById("tax").innerText = taxInfo.message;
    let taxMonthly = taxInfo.taxMonthly;
    document.getElementById("six-month").innerText = sixMonthSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
    document.getElementById("one-year").innerText = oneYearSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
    document.getElementById("two-years").innerText = twoYearsSave(desiredSavings, salary, rentMortgage, bills, food, otherExpenses, taxMonthly);
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
    calculator.classList.add("hide");
    calculateResult.classList.remove("hide");
    if (desiredSavings < 100) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered desired saving: ${desiredSavings}. The value cannot be lees than 100. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (salary < 10) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered salary: ${salary}. The value cannot be lees than 10. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (rentMortgage < 0) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered rent/mortgage expenses: ${rentMortgage}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (bills < 0) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered bills expenses: ${bills}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (food < 0) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered food expenses: ${food}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (otherExpenses < 0) {
        resultText.classList.remove("hide");
        calculateTaxHeading.classList.add("hide");
        resultText.innerText = `You entered other expenses: ${otherExpenses}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else {
        document.getElementById("yearly-salary").classList.remove("hide");
        document.getElementById("tax").classList.remove("hide");
        boxResult.classList.remove("hide");
        let columns = document.getElementsByClassName("columns");
        for (let column of columns) {
            column.classList.remove("hide");
        }
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
        document.getElementById("six-month-header").style.backgroundColor = "#185318";
        return `\nYou can afford to save ${desiredSavings} euro within 6 month.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        document.getElementById("six-month-header").style.backgroundColor = "#B00000";
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
        document.getElementById("one-year-header").style.backgroundColor = "#185318";
        return `\nYou can afford to save ${desiredSavings} euro within 1 year.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        document.getElementById("one-year-header").style.backgroundColor = "#B00000";
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
        document.getElementById("two-years-header").style.backgroundColor = "#185318";
        return `\nYou can afford to save ${desiredSavings} euro within 2 years.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        document.getElementById("two-years-header").style.backgroundColor = "#B00000";
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
        document.getElementById("three-years-header").style.backgroundColor = "#185318";
        return `\nYou can afford to save ${desiredSavings} euro within 3 years.\nYou need to save monthly: ${eachMonthSavings} euro \n Money left: ${moneyLeft} euro`;
    } else {
        document.getElementById("three-years-header").style.backgroundColor = "#B00000";
        return `\nUnfortunately, it's impossible to save ${desiredSavings} euro within 3 years.\nThere is how much money needs every month: ${eachMonthSavings} euro\n There is how much money left you have every month after taxes and all your expenses ${howMuchMoneyLeftMonthly} euro`;
    }
}