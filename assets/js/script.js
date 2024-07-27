// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(event) {
        event.preventDefault();
        checkData();
    });
});

const resultText = document.getElementById("result");


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
        salary = monthlySalary(salary);
    } else if (typeOfSalary === null) {
        alert(`You haven't clicked on the radio button! Please choose your type of salary`);
        throw `Radio button hasn't been clicked`;
    }
    document.getElementById("yearly-salary").innerText = `Your yearly salary: ${salary}`;

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
    if (desiredSavings < 1) {
        resultText.innerText = `You entered desired saving: ${desiredSavings}. The value cannot be lees than 1. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (salary < 1) {
        resultText.innerText = `You entered salary: ${salary}. The value cannot be lees than 1. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (rentMortgage < 0) {
        resultText.innerText = `You entered rent/mortgage expenses: ${rentMortgage}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (bills < 0) {
        resultText.innerText = `You entered bills expenses: ${bills}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (food < 0) {
        resultText.innerText = `You entered food expenses: ${food}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else if (otherExpenses < 0) {
        resultText.innerText = `You entered salary: ${otherExpenses}. The value cannot be lees than 0. Please eneter another value and try again!`;
        resultText.style.color = "red";
    } else {
        letsCalculate(desiredSavings, salary, rentMortgage, bills, food, otherExpenses);
    }
}


